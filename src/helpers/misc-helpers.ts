import { statics } from "@/static";
import { add, areIntervalsOverlapping, differenceInHours } from "date-fns";
import { calendar_v3 } from "googleapis";

export async function getTimeSlots(
  busySlots: calendar_v3.Schema$TimePeriod[],
  duration: number,
  date: Date,
) {
  const timeSlots: { date: Date; isAvailable: boolean }[] = [];

  const fromDateTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    statics.availability.startHour,
  );

  const toDateTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    statics.availability.finishHour,
  );

  const now = new Date();

  let startDate = fromDateTime;
  while (startDate <= toDateTime) {
    const endDate = add(startDate, { minutes: duration });
    const lessThan24Hours = differenceInHours(startDate, now) < 24;

    // Only add event to list if the end time doesn't exceed
    // the end time specified
    if (endDate <= toDateTime) {
      timeSlots.push({
        date: startDate,
        isAvailable:
          !lessThan24Hours &&
          !busySlots.some((bs) => {
            const bsStart = new Date(bs.start!);
            const bsEnd = new Date(bs.end!);

            return areIntervalsOverlapping(
              {
                start: bsStart,
                end: bsEnd,
              },
              {
                start: startDate,
                end: endDate,
              },
            );
          }),
      });
    }
    startDate = add(startDate, { minutes: 15 });
  }

  return timeSlots;
}
