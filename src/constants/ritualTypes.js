/**
 * Ritual / Puja types (ritual services, not physical products). Used in Puja catalog and Pandit specializations.
 * Values match backend RitualType enum. Use GET /api/puja/ritual-types for live list.
 */
export const RITUAL_TYPES = [
  { value: "GRIHA_PRAVESH", displayName: "Griha Pravesh" },
  { value: "MARRIAGE_CEREMONY", displayName: "Marriage Ceremony" },
  { value: "HAVAN_HOMA", displayName: "Havan/Homa" },
  { value: "SATYANARAYAN_PUJA", displayName: "Satyanarayan Puja" },
  { value: "GANESH_PUJA", displayName: "Ganesh Puja" },
  { value: "DURGA_PUJA", displayName: "Durga Puja" },
  { value: "LAKSHMI_PUJA", displayName: "Lakshmi Puja" },
  { value: "SHIVA_PUJA", displayName: "Shiva Puja" },
  { value: "HANUMAN_PUJA", displayName: "Hanuman Puja" },
  { value: "NAVRATRI_PUJA", displayName: "Navratri Puja" },
  { value: "DIWALI_PUJA", displayName: "Diwali Puja" },
  { value: "KARVA_CHAUTH", displayName: "Karva Chauth" },
  { value: "THREAD_CEREMONY", displayName: "Thread Ceremony" },
  { value: "NAMING_CEREMONY", displayName: "Naming Ceremony" },
  { value: "MUNDAN_CEREMONY", displayName: "Mundan Ceremony" },
  { value: "FUNERAL_RITES", displayName: "Funeral Rites" },
  { value: "ANNIVERSARY_PUJA", displayName: "Anniversary Puja" },
  { value: "BUSINESS_OPENING", displayName: "Business Opening" },
  { value: "VEHICLE_PUJA", displayName: "Vehicle Puja" },
  { value: "FESTIVAL_CELEBRATIONS", displayName: "Festival Celebrations" },
  { value: "PERSONAL_CONSULTATION", displayName: "Personal Consultation" },
  { value: "KUNDLI_READING", displayName: "Kundli Reading" },
  { value: "OTHER", displayName: "Other" },
];

export default RITUAL_TYPES;
