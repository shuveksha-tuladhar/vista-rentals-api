class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_hash
      t.string :phone_number
      t.string :avatar_url

      t.timestamps
    end
  end
end
