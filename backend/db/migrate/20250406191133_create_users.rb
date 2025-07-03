class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :first_name
      t.string :middle_name
      t.string :last_name
      t.string :email
      t.string :password_hash
      t.string :phone_number
      t.string :avatar_url

      t.timestamps
    end
  end
end
