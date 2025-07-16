class CreateHosts < ActiveRecord::Migration[8.0]
  def change
    create_table :hosts do |t|
      t.references :user, null: false, foreign_key: true
      t.text :bio
      t.boolean :is_active, default: true

      t.timestamps
    end
  end
end
