/**
 * Booking status. Matches Booking.status enum.
 */
export const BOOKING_STATUS = [
  "pending",
  "confirmed",
  "paid",
  "in_progress",
  "completed",
  "cancelled",
  "no_show",
  "disputed",
];

export const BOOKING_STATUS_LABELS = {
  pending: "Pending (waiting for pandit acceptance)",
  confirmed: "Confirmed",
  paid: "Paid",
  in_progress: "In progress",
  completed: "Completed",
  cancelled: "Cancelled",
  no_show: "No show",
  disputed: "Disputed",
};

export default BOOKING_STATUS;
