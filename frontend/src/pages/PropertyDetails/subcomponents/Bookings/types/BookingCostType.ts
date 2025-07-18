export interface BookingCosts {
  nights: number;
  nightlyPrice: number;
  baseTotal: number;
  discount: number;
  cleaningFee: number;
  serviceFee: number;
  subtotalBeforeTaxes: number;
  subtotalBeforeTaxesWithDiscount: number;
  totalBeforeTaxes: number;
}
