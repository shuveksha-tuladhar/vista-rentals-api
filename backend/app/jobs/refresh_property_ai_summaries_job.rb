# frozen_string_literal: true

class RefreshPropertyAiSummariesJob < ApplicationJob
  queue_as :default

  def perform
    Property.find_each do |property|
      next unless property.eligible_for_ai_summary_generation?

      GeneratePropertyAiSummaryJob.perform_later(property.id)
    end
  end
end