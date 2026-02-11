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

/** Fallback descriptions when no PujaType exists for a ritual (for Rituals & Puja detail modal). */
export const RITUAL_DESCRIPTIONS = {
  GRIHA_PRAVESH: "Housewarming and Griha Pravesh ceremonies for your new home. Traditional rituals to bless the home and bring good fortune.",
  MARRIAGE_CEREMONY: "Wedding ceremonies and marriage rituals performed by experienced Pandit Ji. Customized to your tradition and region.",
  HAVAN_HOMA: "Sacred Havan and Homa ceremonies for purification and blessings. Fire rituals for auspicious beginnings.",
  SATYANARAYAN_PUJA: "Sacred Satyanarayan puja for peace, prosperity, and blessings. Performed at home for family welfare and auspicious beginnings.",
  GANESH_PUJA: "Ganesh puja for removing obstacles and inviting wisdom. Ideal for new ventures and festivals like Ganesh Chaturthi.",
  DURGA_PUJA: "Durga puja for strength and protection. Especially popular during Navratri and festival celebrations.",
  LAKSHMI_PUJA: "Lakshmi puja for wealth and prosperity. Commonly performed on Diwali and Fridays.",
  SHIVA_PUJA: "Shiva puja and Maha Shivaratri ceremonies. Worship of Lord Shiva for devotion and blessings.",
  HANUMAN_PUJA: "Hanuman puja for strength and devotion. Popular on Tuesdays and Hanuman Jayanti.",
  NAVRATRI_PUJA: "Navratri puja and nine-day worship. Durga, Lakshmi, and Saraswati pujas during the festival.",
  DIWALI_PUJA: "Diwali puja and Lakshmi puja for the festival of lights. Bring prosperity to your home.",
  KARVA_CHAUTH: "Karva Chauth fasting and puja for married couples. Moonrise rituals and blessings.",
  THREAD_CEREMONY: "Sacred thread ceremony (Upanayanam). Traditional rites for the occasion.",
  NAMING_CEREMONY: "Namkaran and naming ceremony for newborns. Blessings and traditional naming rituals.",
  MUNDAN_CEREMONY: "Mundan (chudakarana) ceremony. First haircut ritual with Vedic rites.",
  FUNERAL_RITES: "Antim Sanskar and funeral rites. Respectful last rites and Shradh guidance.",
  ANNIVERSARY_PUJA: "Wedding anniversary and other anniversary pujas. Blessings for the couple.",
  BUSINESS_OPENING: "Business opening and inauguration pujas. Blessings for success and prosperity.",
  VEHICLE_PUJA: "Vehicle puja for new cars and vehicles. For safe travels and blessings.",
  FESTIVAL_CELEBRATIONS: "Festival pujas for Diwali, Navratri, Holi, and other Hindu festivals.",
  PERSONAL_CONSULTATION: "Personal consultation with experienced Pandit Ji for rituals and guidance.",
  KUNDLI_READING: "Kundli and horoscope reading. Vedic astrology consultation.",
  OTHER: "Custom rituals and puja services. Contact us for your specific occasion.",
};

export default RITUAL_TYPES;
