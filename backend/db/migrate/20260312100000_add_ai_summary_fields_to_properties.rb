# frozen_string_literal: true

class AddAiSummaryFieldsToProperties < ActiveRecord::Migration[8.0]
  def up
    add_column :properties, :ai_summary, :text
    add_column :properties, :ai_summary_generated_at, :datetime
    add_column :properties, :ai_summary_attempted_at, :datetime
    add_column :properties, :reviews_changed_at, :datetime
    add_column :properties, :ai_summary_error, :text

    add_index :properties, :ai_summary_attempted_at
    add_index :properties, :reviews_changed_at

    execute <<~SQL.squish
      UPDATE properties
      SET reviews_changed_at = CURRENT_TIMESTAMP
      WHERE id IN (SELECT DISTINCT property_id FROM reviews)
    SQL
  end

  def down
    remove_index :properties, :reviews_changed_at
    remove_index :properties, :ai_summary_attempted_at

    remove_column :properties, :ai_summary_error
    remove_column :properties, :reviews_changed_at
    remove_column :properties, :ai_summary_attempted_at
    remove_column :properties, :ai_summary_generated_at
    remove_column :properties, :ai_summary
  end
end