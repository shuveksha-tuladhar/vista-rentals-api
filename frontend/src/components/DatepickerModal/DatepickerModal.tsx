/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { format, differenceInCalendarDays, addDays, isSameDay } from "date-fns";
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
  wrapperClassName = "fixed inset-0 z-50 flex items-center justify-center bg-black/25",
  popupPositionClassName = "w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6",
}: DatePickerModalProps) => {
  const { checkIn, checkOut, setCheckIn, setCheckOut } = useBookingStore();

  const [selection, setSelection] = useState({
    startDate: checkIn || addDays(new Date(), 7),
    endDate: checkOut || addDays(new Date(), 9),
    key: "selection",
  });

  useEffect(() => {
    if (isOpen) {
      setSelection({
        startDate: checkIn || addDays(new Date(), 7),
        endDate: checkOut || addDays(new Date(), 9),
        key: "selection",
      });
    }
  }, [isOpen, checkIn, checkOut]);

  useEffect(() => {
    if (
      selection.startDate &&
      selection.endDate &&
      (!isSameDay(checkIn ?? new Date(0), selection.startDate) ||
        !isSameDay(checkOut ?? new Date(0), selection.endDate))
    ) {
      setCheckIn(selection.startDate);
      setCheckOut(selection.endDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection, setCheckIn, setCheckOut]);

  const handleClear = () => {
    setSelection({
      startDate: addDays(new Date(), 7),
      endDate: addDays(new Date(), 9),
      key: "selection",
    });
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
