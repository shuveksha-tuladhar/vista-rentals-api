import { useState } from "react";
import SummaryAmountDetails from "./SummaryAmountDetails";
import SummaryPaymentDetails from "./SummaryPaymentDetails";

interface BookingDetailsProps {
  total: number;
}

const BookingDetails = ({ total }: BookingDetailsProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <div className="flex-1 space-y-6">
      <SummaryAmountDetails total={total} onConfirm={() => setIsConfirmed(true)} />
      <SummaryPaymentDetails isVisible={isConfirmed} total={total} />
    </div>
  );
};

export default BookingDetails;
