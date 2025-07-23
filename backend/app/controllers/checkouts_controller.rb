class CheckoutsController < ApplicationController
  def create_payment_intent
    amount = params[:amount].to_i

    intent = Stripe::PaymentIntent.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    })

    render json: { clientSecret: intent.client_secret }
  end

  def payment_intent_status
    payment_intent = Stripe::PaymentIntent.retrieve(params[:id])

    render json: {
      id: payment_intent.id,
      status: payment_intent.status,
      amount_received: payment_intent.amount_received,
      currency: payment_intent.currency,
      payment_method_types: payment_intent.payment_method_types,
    }
  rescue Stripe::StripeError => e
    render json: { error: e.message }, status: :bad_request
  end
end
