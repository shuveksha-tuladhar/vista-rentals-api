# frozen_string_literal: true

module Properties
  class SuggestSmartPrice
    TYPE_FAMILIES = {
      'luxury' => %w[resort villa mansion estate chalet lodge penthouse],
      'home' => %w[house townhouse bungalow farmhouse farm ranch adobe casita cottage],
      'urban' => %w[apartment condo loft studio suite],
      'nature' => %w[cabin chalet lodge cottage]
    }.freeze

    def initialize(property, params, client: Ai::GeminiClient.new)
      @property = property
      @params = params
      @client = client
    end

    def call
      validation_error = validate_params
      return { success: false, error: validation_error } if validation_error.present?

      comparables = fetch_comparables
      return { success: false, error: 'No comparable properties found' } if comparables.empty?

      result = @client.generate_text(prompt_for(comparables))
      return { success: false, error: result[:error] } unless result[:success]

      parsed = parse_suggestion(result[:text])
      return { success: false, error: 'Invalid price suggestion' } if parsed.nil?

      { success: true, suggestion: parsed }
    end

    private

    def validate_params
      required_fields = [:property_type, :city, :state, :bedrooms, :max_guests]
      missing = required_fields.reject { |field| @params[field].present? }
      return "Missing required fields: #{missing.join(', ')}" if missing.any?

      bedrooms = @params[:bedrooms].to_i
      max_guests = @params[:max_guests].to_i

      return 'Bedrooms must be a non-negative integer' unless bedrooms >= 0
      return 'Max guests must be at least 1' unless max_guests >= 1

      nil
    end

    def fetch_comparables
      candidate_scopes.each do |scope|
        comparable_prices = sanitize_prices(scope)
        return comparable_prices if comparable_prices.any?
      end

      []
    end

    def sanitize_prices(properties)
      properties.map(&:price)
                .compact
                .reject { |p| p.blank? || p.to_f <= 0 }
                .map { |p| p.to_f }
                .uniq
                .sort
                .take(10)
    end

    def candidate_scopes
      [
        exclude_self(
          Property.where(state: @params[:state].to_s.strip)
                  .where('LOWER(property_type) = ?', normalized_property_type)
                  .where('bedrooms BETWEEN ? AND ?', bedroom_range.begin, bedroom_range.end)
        ).limit(20),
        exclude_self(
          Property.where('LOWER(property_type) IN (?)', comparable_property_types)
                  .where('bedrooms BETWEEN ? AND ?', bedroom_range.begin, bedroom_range.end)
        ).limit(20),
        exclude_self(
          Property.where(bedrooms: @params[:bedrooms].to_i)
        ).limit(20)
      ]
    end

    def exclude_self(scope)
      @property ? scope.where.not(id: @property.id) : scope
    end

    def comparable_property_types
      families = TYPE_FAMILIES.values.select { |types| types.include?(normalized_property_type) }
      return [normalized_property_type] if families.empty?

      families.flatten.uniq
    end

    def normalized_property_type
      @params[:property_type].to_s.strip.downcase
    end

    def bedroom_range
      bedrooms = @params[:bedrooms].to_i
      (bedrooms - 2)..(bedrooms + 2)
    end

    def prompt_for(prices)
      min_price = prices.min.round
      max_price = prices.max.round
      avg_price = (prices.sum / prices.length).round
      comparables_count = prices.length

      <<~PROMPT
        You are a pricing expert for short-term rental properties. Based on comparable properties,
        suggest a nightly rate range for a #{@params[:bedrooms]}-bedroom #{@params[:property_type]} in #{@params[:city]}, #{@params[:state]}.

        Comparable properties in the area are priced between $#{min_price} and $#{max_price} per night (average: $#{avg_price}).
        We analyzed #{comparables_count} similar properties.

        Property details:
        - Type: #{@params[:property_type]}
        - Bedrooms: #{@params[:bedrooms]}
        - Max guests: #{@params[:max_guests]}
        - Amenities: #{amenities_list}
        - Location: #{@params[:city]}, #{@params[:state]}

        Respond ONLY with valid JSON in this exact format, no markdown, no explanation:
        {
          "min": <minimum_price_as_integer>,
          "max": <maximum_price_as_integer>,
          "reasoning": "<2-3 sentence explanation>"
        }
      PROMPT
    end

    def amenities_list
      amenities = @params[:amenities]
      return 'None specified' if amenities.blank?

      amenities.join(', ')
    end

    def parse_suggestion(text)
      # Extract JSON from response (handle potential markdown or extra text)
      json_match = text.match(/\{[\s\S]*\}/)
      return nil if json_match.nil?

      parsed = JSON.parse(json_match[0])
      min = parsed['min'].to_i
      max = parsed['max'].to_i
      reasoning = parsed['reasoning'].to_s.strip

      # Validate parsed values
      return nil if min <= 0 || max <= 0 || min > max
      return nil if reasoning.blank?

      {
        min: min,
        max: max,
        reasoning: reasoning
      }
    rescue JSON::ParserError
      nil
    end
  end
end
