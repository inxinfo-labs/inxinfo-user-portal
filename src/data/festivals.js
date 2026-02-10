/**
 * Upcoming Hindu festivals and puja dates (approximate).
 * Dates are ISO date strings; can vary by region/panchang.
 */
export const FESTIVALS = [
  { name: "Makar Sankranti / Pongal", date: "2026-01-14", type: "Festival" },
  { name: "Vasant Panchami", date: "2026-01-23", type: "Festival" },
  { name: "Maha Shivaratri", date: "2026-02-15", type: "Puja" },
  { name: "Holi", date: "2026-03-03", type: "Festival" },
  { name: "Chaitra Navratri Begins", date: "2026-03-19", type: "Festival" },
  { name: "Rama Navami", date: "2026-03-27", type: "Puja" },
  { name: "Hanuman Jayanti", date: "2026-04-02", type: "Puja" },
  { name: "Akshaya Tritiya", date: "2026-04-20", type: "Festival" },
  { name: "Buddha Purnima", date: "2026-05-01", type: "Festival" },
  { name: "Jagannath Rathyatra", date: "2026-07-16", type: "Festival" },
  { name: "Guru Purnima", date: "2026-07-29", type: "Festival" },
  { name: "Onam", date: "2026-08-26", type: "Festival" },
  { name: "Raksha Bandhan", date: "2026-08-28", type: "Festival" },
  { name: "Krishna Janmashtami", date: "2026-09-04", type: "Puja" },
  { name: "Ganesh Chaturthi", date: "2026-09-14", type: "Puja" },
  { name: "Navratri Begins", date: "2026-10-11", type: "Festival" },
  { name: "Dussehra (Vijayadashami)", date: "2026-10-20", type: "Festival" },
  { name: "Dhanteras", date: "2026-11-06", type: "Festival" },
  { name: "Diwali", date: "2026-11-08", type: "Festival" },
  { name: "Govardhan Puja", date: "2026-11-10", type: "Puja" },
  { name: "Bhaiya Dooj", date: "2026-11-11", type: "Festival" },
  { name: "Chhath Puja", date: "2026-11-15", type: "Puja" },
  { name: "Pausha Purnima", date: "2026-01-03", type: "Festival" },
  // 2025 past/upcoming for current year view
  { name: "Diwali", date: "2025-10-20", type: "Festival" },
  { name: "Dhanteras", date: "2025-10-18", type: "Festival" },
  { name: "Navratri Begins", date: "2025-09-22", type: "Festival" },
  { name: "Ganesh Chaturthi", date: "2025-08-27", type: "Puja" },
  { name: "Krishna Janmashtami", date: "2025-08-16", type: "Puja" },
  { name: "Raksha Bandhan", date: "2025-08-09", type: "Festival" },
  { name: "Guru Purnima", date: "2025-07-10", type: "Festival" },
  { name: "Maha Shivaratri", date: "2025-02-26", type: "Puja" },
  { name: "Holi", date: "2025-03-14", type: "Festival" },
  { name: "Rama Navami", date: "2025-04-06", type: "Puja" },
  { name: "Hanuman Jayanti", date: "2025-04-12", type: "Puja" },
  { name: "Akshaya Tritiya", date: "2025-04-30", type: "Festival" },
];

/** Sort by date ascending; filter to upcoming (>= today) or all based on option */
export function getUpcomingFestivals(includePast = false) {
  const today = new Date().toISOString().slice(0, 10);
  return [...FESTIVALS]
    .filter((f) => includePast || f.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}
