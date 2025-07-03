class ChangeUserIdNullableInProperties < ActiveRecord::Migration[6.0]
  def change
    change_column_null :properties, :user_id, true
  end
end
