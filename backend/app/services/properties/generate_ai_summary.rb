# frozen_string_literal: true

module Properties
  class GenerateAiSummary
    PLACEHOLDER_RESPONSES = ['n/a', 'na', 'none', 'null', 'no summary available'].freeze

    def initialize(property, client: Ai::GeminiClient.new)
      @property = property
      @client = client
    end

    def call
      reviews = @property.reviews.order(created_at: :desc).limit(200)
      return { success: false, error: 'Not enough reviews' } if reviews.size < Property::MIN_REVIEWS_FOR_AI_SUMMARY

      result = @client.generate_text(prompt_for(reviews))
      return { success: false, error: result[:error] } unless result[:success]

      summary = result[:text].to_s.strip
      return { success: false, error: 'Unusable AI response' } unless usable_summary?(summary)

      { success: true, summary: summary }
    end

    private

    def prompt_for(reviews)
      review_lines = reviews.map do |review|
        "Rating: #{review.rating}/5; Review: #{review.review}"
      end.join("\n")

      <<~PROMPT
        Create a concise 2-3 sentence AI summary for guest reviews of a rental property.
        Focus on recurring strengths and recurring concerns.
        Keep it factual and neutral.

        Reviews:
        #{review_lines}
      PROMPT
    end

    def usable_summary?(summary)
      return false if summary.blank?
      return false if summary.length < 20

      normalized = summary.downcase.strip
      !PLACEHOLDER_RESPONSES.include?(normalized)
    end
  end
end