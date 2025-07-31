import { useState } from "react";
import SummaryAmountDetails from "./SummaryAmountDetails";
import SummaryPaymentDetails from "./SummaryPaymentDetails";

interface BookingDetailsProps {
  total: number;
  propertyId: string | null;
  checkInDate: string | null;
  checkOutDate: string | null;
  isRefundable: boolean;
}

const BookingDetails = ({
  total,
  propertyId,
  checkInDate,
  checkOutDate,
  isRefundable,
}: BookingDetailsProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <div className="flex-1 space-y-6">
      <SummaryAmountDetails
        total={total}
        onConfirm={() => setIsConfirmed(true)}
      />
      <SummaryPaymentDetails
        isVisible={isConfirmed}
        total={total}
        propertyId={propertyId}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        isRefundable={isRefundable}
      />
    </div>
  );
};

export default BookingDetails;
