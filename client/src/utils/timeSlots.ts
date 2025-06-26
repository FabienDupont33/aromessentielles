// utils/timeSlots.ts
export function generateTimeSlots(
  start: string,
  end: string,
  duration: number,
  takenSlots: string[]
): string[] {
  const slots: string[] = [];

  let [h, m] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);

  const toMinutes = (hh: number, mm: number) => hh * 60 + mm;
  const pad = (n: number) => n.toString().padStart(2, "0");

  while (toMinutes(h, m) + duration <= toMinutes(endH, endM)) {
    const time = `${pad(h)}:${pad(m)}`;
    if (!takenSlots.includes(time)) {
      slots.push(time);
    }

    m += duration;
    if (m >= 60) {
      h += Math.floor(m / 60);
      m %= 60;
    }
  }

  return slots;
}
