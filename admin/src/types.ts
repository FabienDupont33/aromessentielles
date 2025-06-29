export type Appointment = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
  status: "pending" | "accepted" | "rejected";
};

export type TimeRange = {
  start: string;
  end: string;
};

export type WorkingHours = {
  _id?: string;
  day: string;
  isWorkingDay: boolean;
  morning?: TimeRange;
  afternoon?: TimeRange;
};

export type Client = {
  _id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  notes?: string;
};
