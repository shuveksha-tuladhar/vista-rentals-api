# frozen_string_literal: true

class GeneratePropertyAiSummaryJob < ApplicationJob
  queue_as :default

  def perform(property_id)
    property = Property.find_by(id: property_id)
    return if property.nil?

    should_generate = false

    property.with_lock do
      next unless property.eligible_for_ai_summary_generation?

      property.update!(ai_summary_attempted_at: Time.current)
      should_generate = true
    end

    return unless should_generate

    result = Properties::GenerateAiSummary.new(property).call

    if result[:success]
      property.update!(
        ai_summary: result[:summary],
        ai_summary_generated_at: Time.current,
        ai_summary_error: nil
      )
      return
    end

    property.update!(ai_summary_error: result[:error])
  end
end