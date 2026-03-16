# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Host AI Suggestions', type: :request do
  let(:user) { create(:user) }
  let(:property) { create(:property, user: user, price: 150, city: 'Seattle', state: 'Washington', property_type: 'cabin', bedrooms: 2, guests: 4) }
  let(:headers) { auth_headers(user) }

  describe 'POST /host/ai/suggest-price' do
    let(:params) do
      {
        property_id: property.id,
        property_type: 'cabin',
        city: 'Seattle',
        state: 'Washington',
        bedrooms: 2,
        max_guests: 4,
        amenities: ['WiFi', 'Hot Tub']
      }
    end

    context 'when user is unauthenticated' do
      it 'returns 401' do
        post '/host/ai/suggest-price', params: params
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when property does not exist' do
      it 'returns 404' do
        post '/host/ai/suggest-price', params: params.merge(property_id: 'nonexistent'), headers: headers
        expect(response).to have_http_status(:not_found)
        expect(json_response[:error]).to include('Property not found')
      end
    end

    context 'when user is not property owner' do
      let(:other_user) { create(:user) }

      it 'returns 403' do
        other_property = create(:property, user: other_user)
        post '/host/ai/suggest-price', params: params.merge(property_id: other_property.id), headers: headers
        expect(response).to have_http_status(:forbidden)
        expect(json_response[:error]).to include('Forbidden')
      end
    end

    context 'when required parameters are missing' do
      it 'returns 422 with missing fields error' do
        post '/host/ai/suggest-price', params: params.except(:city), headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response[:error]).to include('Missing required fields')
      end
    end

    context 'when bedrooms is invalid' do
      it 'returns 422 with validation error' do
        post '/host/ai/suggest-price', params: params.merge(bedrooms: -1), headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response[:error]).to include('Bedrooms must be')
      end
    end

    context 'when no comparable properties exist' do
      it 'returns 422 with no comparables error' do
        # Create property in different city so no comparables exist
        post '/host/ai/suggest-price', params: params.merge(city: 'NowhereCity'), headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response[:error]).to include('No comparable properties found')
      end
    end

    context 'when Gemini API fails' do
      before do
        allow_any_instance_of(Ai::GeminiClient).to receive(:generate_text).and_return({
          success: false,
          error: 'API rate limited'
        })
      end

      it 'returns 502 with generic error message' do
        # Create comparable property
        create(:property, city: 'Seattle', state: 'Washington', property_type: 'cabin', bedrooms: 2, price: 140)

        post '/host/ai/suggest-price', params: params, headers: headers
        expect(response).to have_http_status(:bad_gateway)
        expect(json_response[:error]).to eq('AI suggestion unavailable')
      end
    end

    context 'when Gemini returns invalid JSON' do
      before do
        allow_any_instance_of(Ai::GeminiClient).to receive(:generate_text).and_return({
          success: true,
          text: 'This is not JSON'
        })
      end

      it 'returns 422 with invalid suggestion error' do
        create(:property, city: 'Seattle', state: 'Washington', property_type: 'cabin', bedrooms: 2, price: 140)

        post '/host/ai/suggest-price', params: params, headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response[:error]).to include('Invalid price suggestion')
      end
    end

    context 'when Gemini returns invalid price range' do
      before do
        allow_any_instance_of(Ai::GeminiClient).to receive(:generate_text).and_return({
          success: true,
          text: '{ "min": 200, "max": 100, "reasoning": "Invalid range" }'
        })
      end

      it 'returns 422 with invalid suggestion error' do
        create(:property, city: 'Seattle', state: 'Washington', property_type: 'cabin', bedrooms: 2, price: 140)

        post '/host/ai/suggest-price', params: params, headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_response[:error]).to include('Invalid price suggestion')
      end
    end

    context 'when successful' do
      before do
        allow_any_instance_of(Ai::GeminiClient).to receive(:generate_text).and_return({
          success: true,
          text: '{ "min": 120, "max": 160, "reasoning": "Based on comparable properties in the area." }'
        })
      end

      it 'returns 200 with suggestion data' do
        create(:property, city: 'Seattle', state: 'Washington', property_type: 'cabin', bedrooms: 2, price: 140)

        post '/host/ai/suggest-price', params: params, headers: headers
        expect(response).to have_http_status(:ok)
        expect(json_response[:data]).to include(
          min: 120,
          max: 160,
          reasoning: 'Based on comparable properties in the area.'
        )
        expect(json_response[:error]).to be_nil
      end
    end

    context 'when Gemini returns JSON with markdown formatting' do
      before do
        allow_any_instance_of(Ai::GeminiClient).to receive(:generate_text).and_return({
          success: true,
          text: '```json\n{ "min": 120, "max": 160, "reasoning": "Great location" }\n```'
        })
      end

      it 'extracts and parses JSON successfully' do
        create(:property, city: 'Seattle', state: 'Washington', property_type: 'cabin', bedrooms: 2, price: 140)

        post '/host/ai/suggest-price', params: params, headers: headers
        expect(response).to have_http_status(:ok)
        expect(json_response[:data][:min]).to eq(120)
        expect(json_response[:data][:max]).to eq(160)
      end
    end
  end

  private

  def json_response
    JSON.parse(response.body, symbolize_names: true)
  end
end
