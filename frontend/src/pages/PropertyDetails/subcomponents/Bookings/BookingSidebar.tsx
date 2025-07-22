import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { FaCircleCheck, FaCircle } from "react-icons/fa6";
import {
  calculateBookingCosts,
  getCancellationPolicy,
} from "../../../../utils/bookings";
import type { BookingCosts } from "./types/BookingCostType";

interface BookingSidebarProps {
  price: string;
  startDate?: string;
  endDate?: string;
  maxGuests: number;
  propertyId: number;
}

const FREE_CANCEL_DAYS = 7;
const PARTIAL_REFUND_DAYS = 2;

const BookingSidebar: React.FC<BookingSidebarProps> = ({
  price,
  startDate,
  endDate,
  maxGuests,
  propertyId,
}) => {
  const [checkIn, setCheckIn] = useState(startDate);
  const [checkOut, setCheckOut] = useState(endDate);
  const [guests, setGuests] = useState(1);
  const [showPriceDetails, setShowPriceDetails] = useState(false);
  const [refundable, setRefundable] = useState(false);

  const navigate = useNavigate();

  const {
    nights,
    nightlyPrice,
    baseTotal,
    cleaningFee,
    serviceFee,
    discount,
    subtotalBeforeTaxes,
    subtotalBeforeTaxesWithDiscount,
    totalBeforeTaxes,
  }: BookingCosts = calculateBookingCosts(price, checkIn, checkOut, refundable);

  const handleReserve = () => {
    navigate({
      pathname: "/review",
      search: createSearchParams({
        propertyId: propertyId.toString(),
        checkIn: checkIn?.toString() ?? "",
        checkOut: checkOut?.toString() ?? "",
        numOfGuests: guests.toString() ?? "",
        refundable: refundable ? "true" : "false",
      }).toString(),
    });
  };

  return (
    <aside className="w-[424px] h-auto bg-white border border-gray-300 shadow-lg rounded-lg p-6 flex flex-col gap-3">
      <div className="flex justify-between items-end text-black">
        <span className="text-2xl font-semibold">
          {`$${totalBeforeTaxes.toFixed(2)} `}
          {checkIn && checkOut && nights > 0 && (
            <>
              for {nights} night{nights > 1 ? "s" : ""}
            </>
          )}
        </span>
      </div>

      <div className="w-full mt-4">
        <div className="grid grid-cols-2 border border-gray-400 rounded-t-lg">
          <div className="flex flex-col px-3 py-2 border-r border-gray-400">
            <label
              htmlFor="check-in"
              className="text-xs font-semibold text-gray-800"
            >
              CHECK-IN
            </label>
            <input
              type="date"
              id="check-in"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="text-sm text-gray-700 outline-none"
            />
          </div>
          <div className="flex flex-col px-3 py-2">
            <label
              htmlFor="check-out"
              className="text-xs font-semibold text-gray-800"
            >
              CHECKOUT
            </label>
            <input
              type="date"
              id="check-out"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="text-sm text-gray-700 outline-none"
            />
          </div>
        </div>

        <div className="border-t-0 border border-gray-400 rounded-b-lg px-3 py-2">
          <label
            htmlFor="guests"
            className="text-xs font-semibold text-gray-800"
          >
            GUESTS
          </label>
          <input
            type="number"
            id="guests"
            min={1}
            max={maxGuests}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="text-sm text-gray-700 outline-none w-full"
          />
        </div>
      </div>

      <div className="w-full mt-4">
        <div
          className={`border border-b-0 border-gray-400 rounded-t-lg px-3 py-3 cursor-pointer ${
            !refundable ? "bg-gray-50" : ""
          }`}
          onClick={() => setRefundable(false)}
        >
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              {!refundable ? (
                <FaCircleCheck className="text-black" />
              ) : (
                <FaCircle className="text-gray-400" />
              )}
              <span>Non-refundable</span>
            </div>
            <span>${subtotalBeforeTaxesWithDiscount.toFixed(2)} total</span>
          </div>
        </div>

        <div
          className={`border border-gray-400 rounded-b-lg px-3 py-3 cursor-pointer ${
            refundable ? "bg-gray-50" : ""
          }`}
          onClick={() => setRefundable(true)}
        >
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              {refundable ? (
                <FaCircleCheck className="text-black" />
              ) : (
                <FaCircle className="text-gray-400" />
              )}
              <span>Refundable</span>
            </div>
            <span>${subtotalBeforeTaxes.toFixed(2)} total</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {getCancellationPolicy(
              checkIn,
              FREE_CANCEL_DAYS,
              PARTIAL_REFUND_DAYS
            )}
          </p>
        </div>
      </div>

      <div
        className="flex items-center justify-between mt-2 cursor-pointer"
        onClick={() => setShowPriceDetails(!showPriceDetails)}
      >
        <span className="text-sm underline text-black">Show price details</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${
            showPriceDetails ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {showPriceDetails && (
        <div className="mt-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>
              ${nightlyPrice.toFixed(2)} x {nights} night{nights > 1 ? "s" : ""}
            </span>
            <span>${baseTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Cleaning fee</span>
            <span>${cleaningFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Service fee</span>
            <span>${serviceFee.toFixed(2)}</span>
          </div>
          {!refundable && (
            <div className="flex justify-between mt-1">
              <span>Discount (Pay in Full)</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
        </div>
      )}
      <div className="flex justify-between font-semibold border-t border-gray-300 mt-2 pt-2">
        <span>Total before taxes</span>
        <span>${totalBeforeTaxes.toFixed(2)}</span>
      </div>

      <button
        onClick={handleReserve}
        className="mt-4 w-full bg-gradient-to-r from-[#E61E4F] to-[#D70566] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
      >
        Reserve
      </button>

      <div className="text-sm text-center text-gray-700 mt-2">
        You won’t be charged yet
      </div>
    </aside>
  );
};

export default BookingSidebar;
