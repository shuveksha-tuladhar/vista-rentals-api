/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import { format, differenceInCalendarDays, addDays } from "date-fns";
import { findNextAvailableDate } from "../../utils/dates";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useBookingStore } from "../../store/bookingStore";

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  disabledDates?: Date[];
  wrapperClassName?: string;
  popupPositionClassName?: string;
}

const DatePickerModal = ({
  isOpen,
  onClose,
  disabledDates = [],
  wrapperClassName = "fixed inset-0 z-[1000] flex items-center justify-center bg-black/25",
  popupPositionClassName = "w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6",
}: DatePickerModalProps) => {
  const { checkIn, checkOut, setCheckIn, setCheckOut } = useBookingStore();

  // Keep refs so effects always read the latest values without making them
  // reactive dependencies (which cause infinite loops).
  const disabledDatesRef = useRef(disabledDates);
  disabledDatesRef.current = disabledDates;
  const checkInRef = useRef(checkIn);
  checkInRef.current = checkIn;
  const checkOutRef = useRef(checkOut);
  checkOutRef.current = checkOut;

  const [selection, setSelection] = useState(() => ({
    startDate: checkIn || addDays(new Date(), 7),
    endDate: checkOut || addDays(new Date(), 9),
    key: "selection",
  }));

  useEffect(() => {
    if (!isOpen) return;

    const disabled = disabledDatesRef.current;
    const ci = checkInRef.current;
    const co = checkOutRef.current;
    const disabledSet = new Set(disabled.map((d) => d.toDateString()));

    const startIsDisabled = ci != null && disabledSet.has(ci.toDateString());
    const defaultStart =
      !ci || startIsDisabled
        ? findNextAvailableDate(addDays(new Date(), 7), disabled)
        : ci;
    const endIsDisabled =
      !co ||
      disabledSet.has(co.toDateString()) ||
      co <= defaultStart;
    const defaultEnd = endIsDisabled
      ? findNextAvailableDate(addDays(defaultStart, 1), disabled)
      : co;

    setSelection({ startDate: defaultStart, endDate: defaultEnd, key: "selection" });

    // Write to store so the search bar input shows the default dates.
    // Only do this when dates were absent or fell on a disabled day.
    if (!ci || startIsDisabled) {
      setCheckIn(defaultStart);
      setCheckOut(defaultEnd);
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClear = () => {
    const disabled = disabledDatesRef.current;
    const defaultStart = findNextAvailableDate(addDays(new Date(), 7), disabled);
    const defaultEnd = findNextAvailableDate(addDays(defaultStart, 1), disabled);
    setSelection({ startDate: defaultStart, endDate: defaultEnd, key: "selection" });
  };

  const handleClose = () => {
    setCheckIn(selection.startDate);
    setCheckOut(selection.endDate);
    onClose();
  };

  const handleChange = (item: any) => {
    const start = item.selection.startDate ?? new Date();
    let end = item.selection.endDate;

    if (!end || differenceInCalendarDays(end, start) === 0) {
      end = addDays(start, 1);
    }

    setSelection({ ...item.selection, startDate: start, endDate: end });
  };

  const nights = differenceInCalendarDays(
    selection.endDate,
    selection.startDate
  );

  if (!isOpen) return null;

  return (
    <div className={wrapperClassName}>
      <div className={popupPositionClassName}>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">
              {nights} night{nights !== 1 ? "s" : ""}
            </h2>
            <p className="text-sm text-gray-500">
              {format(selection.startDate, "MMMM d, yyyy")} –{" "}
              {format(selection.endDate, "MMMM d, yyyy")}
            </p>
          </div>
          <div className="flex gap-4">
            <div>
              <label className="text-xs text-gray-500">CHECK-IN</label>
              <input
                readOnly
                className="block border border-black rounded-md px-3 py-2 w-32"
                value={format(selection.startDate, "MM/dd/yyyy")}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">CHECK-OUT</label>
              <input
                readOnly
                className="block border border-black rounded-md px-3 py-2 w-32"
                value={format(selection.endDate, "MM/dd/yyyy")}
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <DateRange
            ranges={[selection]}
            onChange={handleChange}
            months={2}
            direction="horizontal"
            minDate={new Date()}
            showDateDisplay={false}
            rangeColors={["#ef4444"]}
            disabledDates={disabledDates}
          />
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={handleClear} className="text-sm underline">
            Clear dates
          </button>
          <button
            onClick={handleClose}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;
