# frozen_string_literal: true

# rubocop:disable Metrics/ClassLength, Style/Documentation
class HostDashboardController < ApplicationController
  # rubocop:disable Metrics/MethodLength, Metrics/AbcSize, Metrics/CyclomaticComplexity, Metrics/PerceivedComplexity
  def show
    all_properties = current_user.properties.includes(:bookings)

    filter_cities  = all_properties.pluck(:city).uniq.compact.sort
    filter_states  = all_properties.pluck(:state).uniq.compact.sort
    filter_props   = all_properties.map { |p| { id: p.id, name: p.name } }

    filtered_properties = if params[:property_id].present?
      all_properties.where(id: params[:property_id])
    elsif params[:city].present?
      all_properties.where(city: params[:city])
    elsif params[:state].present?
      all_properties.where(state: params[:state])
    else
      all_properties
    end

    property_ids = filtered_properties.pluck(:id)

    complete_bookings = Booking.where(property_id: property_ids, payment_status: 'complete').includes(:property)
    bookings_pending = Booking.where(property_id: property_ids, payment_status: 'pending').count

    revenue_total = complete_bookings.sum do |b|
      (b.end_date.to_date - b.start_date.to_date).to_i * b.property.price.to_f
    end

    month_start_current = Date.current.beginning_of_month
    revenue_this_month = complete_bookings.select { |b| b.start_date.to_date >= month_start_current }.sum do |b|
      (b.end_date.to_date - b.start_date.to_date).to_i * b.property.price.to_f
    end

    bookings_total = complete_bookings.size

    bookings_upcoming = complete_bookings.count do |b|
      b.start_date.to_date > Date.current && b.start_date.to_date <= Date.current + 7
    end

    active_stays = complete_bookings.count do |b|
      b.start_date.to_date <= Date.current && b.end_date.to_date >= Date.current
    end

    avg_rating = Review.where(property_id: property_ids).average(:rating)&.round(1)
    listings_count = property_ids.size

    durations = complete_bookings.map { |b| (b.end_date.to_date - b.start_date.to_date).to_i }
    avg_stay_duration = durations.any? ? (durations.sum.to_f / durations.size).round(1) : nil

    lead_times = complete_bookings.map { |b| (b.start_date.to_date - b.created_at.to_date).to_i }
    booking_lead_time = lead_times.any? ? (lead_times.sum.to_f / lead_times.size).round.to_i : nil

    total_nights_booked = durations.sum

    revenue_by_6_months = revenue_by_months(6, complete_bookings)
    revenue_by_12_months = revenue_by_months(12, complete_bookings)
    occupancy_this_month = compute_occupancy(complete_bookings, property_ids)

    rating_counts = Review.where(property_id: property_ids).group(:rating).count
    rating_breakdown = (1..5).each_with_object({}) { |r, h| h[r.to_s] = rating_counts[r] || 0 }

    perf_unsorted = filtered_properties.map do |p|
      p_bookings = complete_bookings.select { |b| b.property_id == p.id }
      rev = p_bookings.sum { |b| (b.end_date.to_date - b.start_date.to_date).to_i * p.price.to_f }
      { property_id: p.id, property_name: p.name, revenue: format('%.2f', rev), bookings_count: p_bookings.size }
    end
    property_performance = perf_unsorted.sort_by { |perf| -perf[:revenue].to_f }

    recent_reviews = Review.where(property_id: property_ids)
                           .includes(:user, :property)
                           .order(created_at: :desc)
                           .limit(5)
                           .map do |r|
                             {
                               rating: r.rating,
                               review: r.review&.truncate(200),
                               property_name: r.property.name,
                               guest_first_name: r.user.first_name,
                               created_at: r.created_at
                             }
    end

    upcoming_checkins = Booking.where(property_id: property_ids, payment_status: 'complete')
                               .where('DATE(start_date) > ? AND DATE(start_date) <= ?', Date.current, Date.current + 7)
                               .includes(:user, :property)
                               .order(start_date: :asc)
                               .limit(10)
                               .map do |b|
                                 {
                                   booking_id: b.id,
                                   guest_first_name: b.user.first_name,
                                   guest_last_name: b.user.last_name,
                                   property_name: b.property.name,
                                   check_in: b.start_date.to_date.iso8601,
                                   check_out: b.end_date.to_date.iso8601,
                                   nights: (b.end_date.to_date - b.start_date.to_date).to_i
                                 }
    end

    render json: {
      stats: {
        revenue_total: format('%.2f', revenue_total),
        revenue_this_month: format('%.2f', revenue_this_month),
        bookings_total: bookings_total,
        bookings_pending: bookings_pending,
        bookings_upcoming: bookings_upcoming,
        active_stays: active_stays,
        avg_rating: avg_rating,
        listings_count: listings_count,
        avg_stay_duration: avg_stay_duration,
        booking_lead_time: booking_lead_time,
        total_nights_booked: total_nights_booked
      },
      revenue_by_6_months: revenue_by_6_months,
      revenue_by_12_months: revenue_by_12_months,
      occupancy_this_month: occupancy_this_month,
      rating_breakdown: rating_breakdown,
      property_performance: property_performance,
      recent_reviews: recent_reviews,
      upcoming_checkins: upcoming_checkins,
      filter_options: {
        cities: filter_cities,
        states: filter_states,
        properties: filter_props
      }
    }
  end

  # rubocop:enable Metrics/MethodLength, Metrics/AbcSize, Metrics/CyclomaticComplexity, Metrics/PerceivedComplexity

  private

  # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
  def revenue_by_months(count, bookings)
    months = (0...count).map { |i| Date.current.beginning_of_month - i.months }.reverse
    months.map do |month_start|
      month_end = month_start.end_of_month
      rev = bookings.select { |b| b.start_date.to_date >= month_start && b.start_date.to_date <= month_end }
                    .sum { |b| (b.end_date.to_date - b.start_date.to_date).to_i * b.property.price.to_f }
      { month: month_start.strftime('%b %Y'), revenue: format('%.2f', rev) }
    end
  end

  def compute_occupancy(complete_bookings, property_ids)
    month_start = Date.current.beginning_of_month
    month_end = Date.current.end_of_month
    total_nights = (month_end - month_start + 1).to_i * property_ids.size
    booked_nights = complete_bookings
                    .select { |b| b.start_date.to_date <= month_end && b.end_date.to_date >= month_start }
                    .sum do |b|
                      ([b.end_date.to_date,
                        month_end].min - [b.start_date.to_date, month_start].max).to_i
    end
    rate = total_nights.positive? ? (booked_nights.to_f / total_nights * 100).round(1) : 0.0
    { booked_nights: booked_nights, total_nights: total_nights, rate: rate }
  end
  # rubocop:enable Metrics/AbcSize, Metrics/MethodLength
end
# rubocop:enable Metrics/ClassLength, Style/Documentation
