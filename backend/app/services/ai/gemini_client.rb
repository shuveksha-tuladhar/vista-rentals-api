# frozen_string_literal: true

require 'net/http'
require 'uri'
require 'json'

module Ai
  class GeminiClient
    DEFAULT_MODEL_NAME = 'gemini-2.5-flash'

    def initialize(api_key: ENV['GEMINI_API_KEY'], model_name: ENV['GEMINI_MODEL'].presence || DEFAULT_MODEL_NAME)
      @api_key = api_key
      @model_name = model_name
    end

    def generate_text(prompt)
      return { success: false, error: 'Missing GEMINI_API_KEY' } if @api_key.blank?

      uri = URI("https://generativelanguage.googleapis.com/v1/models/#{@model_name}:generateContent?key=#{@api_key}")
      request = Net::HTTP::Post.new(uri)
      request['Content-Type'] = 'application/json'
      request.body = {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      }.to_json

      response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
        http.request(request)
      end

      unless response.is_a?(Net::HTTPSuccess)
        parsed_error = begin
          JSON.parse(response.body).dig('error', 'message')
        rescue StandardError
          nil
        end
        error_message = parsed_error.presence || response.body.to_s.tr("\n", ' ').slice(0, 200)
        Rails.logger.error("[GeminiClient] API error #{response.code} (model=#{@model_name}): #{error_message}")
        return { success: false, error: "Gemini API error #{response.code}: #{error_message}" }
      end

      parsed = JSON.parse(response.body)
      text = parsed.dig('candidates', 0, 'content', 'parts', 0, 'text')

      Rails.logger.info("[GeminiClient] Success (model=#{@model_name}), response length: #{text.to_s.length} chars")
      { success: true, text: text.to_s }
    rescue StandardError => e
      Rails.logger.error("[GeminiClient] Exception (model=#{@model_name}): #{e.message}")
      { success: false, error: e.message }
    end
  end
end
