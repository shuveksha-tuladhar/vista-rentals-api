/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import { format, differenceInCalendarDays, addDays } from "date-fns";
import {
  findNextAvailableDateRange,
  isDateRangeAvailable,
} from "../../utils/dates";
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
  popupPositionClassName = "w-full max-w-3xl bg-white rounded-2xl p-6",
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
    const currentRangeIsValid =
      ci != null &&
      co != null &&
      isDateRangeAvailable(ci, co, disabled);

    const { startDate: defaultStart, endDate: defaultEnd } = currentRangeIsValid
      ? { startDate: ci, endDate: co }
      : findNextAvailableDateRange(addDays(new Date(), 7), disabled, 1);

    setSelection({ startDate: defaultStart, endDate: defaultEnd, key: "selection" });

    if (!currentRangeIsValid) {
      setCheckIn(defaultStart);
      setCheckOut(defaultEnd);
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClear = () => {
    const disabled = disabledDatesRef.current;
    const { startDate: defaultStart, endDate: defaultEnd } =
      findNextAvailableDateRange(addDays(new Date(), 7), disabled, 1);
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
                className="block border border-gray-300 rounded-md px-3 py-2 w-32"
                value={format(selection.startDate, "MM/dd/yyyy")}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">CHECK-OUT</label>
              <input
                readOnly
                className="block border border-gray-300 rounded-md px-3 py-2 w-32"
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
            Reset
          </button>
          <button
            onClick={handleClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600 transition-colors"
          >
            Confirm Dates
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;
