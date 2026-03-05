import { eachDayOfInterval } from "date-fns";

export function expandBookedRangesToDates(
  ranges: { start_date: string; end_date: string }[]
): Date[] {
  return ranges.flatMap(({ start_date, end_date }) =>
    eachDayOfInterval({ start: new Date(start_date), end: new Date(end_date) })
  );
}
