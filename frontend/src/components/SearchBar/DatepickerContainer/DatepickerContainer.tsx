import React, { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { useBookingStore } from "../../../store/bookingStore";
import DatePickerModal from "../../DatepickerModal/DatepickerModal";

interface DatepickerContainerProps {
  datepickerWrapperClassName?: string;
  datepickerPopupClassName?: string;
}

const DatepickerContainer: React.FC<DatepickerContainerProps> = ({
  datepickerWrapperClassName,
  datepickerPopupClassName,
}) => {
  const [isOpenDatepicker, setIsOpenDatepicker] = useState(false);
  const { checkIn, checkOut } = useBookingStore();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpenDatepicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative flex flex-col px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors duration-200 w-full md:w-auto"
    >
      <span className="text-xs font-bold text-gray-900">When</span>

      <input
        type="text"
        placeholder="Any week"
        className="text-sm text-gray-900 font-normal bg-transparent outline-none w-full"
        {...(checkIn && checkOut
          ? {
              value: `${format(checkIn, "MMM d, yyyy")} - ${format(
                checkOut,
                "MMM d, yyyy"
              )}`,
            }
          : {})}
        onClick={() => setIsOpenDatepicker(true)}
        readOnly
      />

      {isOpenDatepicker && (
        <DatePickerModal
          isOpen={isOpenDatepicker}
          onClose={() => setIsOpenDatepicker(false)}
          wrapperClassName={datepickerWrapperClassName}
          popupPositionClassName={datepickerPopupClassName}
        />
      )}
    </div>
  );
};

export default DatepickerContainer;
