import { addDays, eachDayOfInterval } from "date-fns";

export function findNextAvailableDate(from: Date, disabledDates: Date[]): Date {
  const disabledSet = new Set(disabledDates.map((d) => d.toDateString()));
  let candidate = from;
  while (disabledSet.has(candidate.toDateString())) {
    candidate = addDays(candidate, 1);
  }
  return candidate;
}

export function expandBookedRangesToDates(
  ranges: { start_date: string; end_date: string }[]
): Date[] {
  return ranges.flatMap(({ start_date, end_date }) =>
    eachDayOfInterval({ start: new Date(start_date), end: new Date(end_date) })
  );
}
