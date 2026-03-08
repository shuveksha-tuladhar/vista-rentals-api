import { addDays, eachDayOfInterval, isBefore, startOfDay } from "date-fns";

export function findNextAvailableDate(from: Date, disabledDates: Date[]): Date {
  const disabledSet = new Set(disabledDates.map((d) => d.toDateString()));
  let candidate = startOfDay(from);
  while (disabledSet.has(candidate.toDateString())) {
    candidate = addDays(candidate, 1);
  }
  return candidate;
}

export function isDateRangeAvailable(
  startDate: Date,
  endDate: Date,
  disabledDates: Date[]
): boolean {
  const normalizedStart = startOfDay(startDate);
  const normalizedEnd = startOfDay(endDate);

  if (!isBefore(normalizedStart, normalizedEnd)) {
    return false;
  }

  const disabledSet = new Set(disabledDates.map((d) => d.toDateString()));
  let current = normalizedStart;

  while (!isBefore(normalizedEnd, current)) {
    if (disabledSet.has(current.toDateString())) {
      return false;
    }

    current = addDays(current, 1);
  }

  return true;
}

export function findNextAvailableDateRange(
  from: Date,
  disabledDates: Date[],
  minimumNights = 1,
  maxSearchDays = 365
): { startDate: Date; endDate: Date } {
  const normalizedStart = startOfDay(from);

  for (let dayOffset = 0; dayOffset <= maxSearchDays; dayOffset += 1) {
    const startDate = addDays(normalizedStart, dayOffset);
    const endDate = addDays(startDate, minimumNights);

    if (isDateRangeAvailable(startDate, endDate, disabledDates)) {
      return { startDate, endDate };
    }
  }

  const fallbackStart = findNextAvailableDate(normalizedStart, disabledDates);
  return { startDate: fallbackStart, endDate: addDays(fallbackStart, minimumNights) };
}

export function expandBookedRangesToDates(
  ranges: { start_date: string; end_date: string }[]
): Date[] {
  return ranges.flatMap(({ start_date, end_date }) =>
    eachDayOfInterval({ start: new Date(start_date), end: new Date(end_date) })
  );
}
