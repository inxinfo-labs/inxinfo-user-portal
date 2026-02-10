/**
 * Product (Item) categories. Physical products only — distinct from Puja Types (ritual services).
 * Values match backend ProductCategory enum (e.g. PUJA_SAMAGRI). Use GET /api/items/categories for live list.
 */
export const PRODUCT_CATEGORIES = [
  { value: "PUJA_SAMAGRI", displayName: "Puja Samagri" },
  { value: "IDOLS_MURTIS", displayName: "Idols & Murtis" },
  { value: "INCENSE_DHOOP", displayName: "Incense & Dhoop" },
  { value: "OILS_GHEE", displayName: "Oils & Ghee" },
  { value: "FLOWERS_GARLANDS", displayName: "Flowers & Garlands" },
  { value: "PRASADAM", displayName: "Prasadam" },
  { value: "BOOKS_MANTRAS", displayName: "Books & Mantras" },
  { value: "VESSELS_CONTAINERS", displayName: "Vessels & Containers" },
  { value: "DECORATIVE_ITEMS", displayName: "Decorative Items" },
  { value: "FESTIVAL_SPECIALS", displayName: "Festival Specials" },
  { value: "YANTRA_RUDRAKSHA", displayName: "Yantra & Rudraksha" },
  { value: "GIFT_HAMPERS", displayName: "Gift Hampers" },
  { value: "CLOTHING", displayName: "Clothing" },
  { value: "OTHER", displayName: "Other" },
];

/** Optional subcategories by category value (e.g. under VESSELS_CONTAINERS). */
export const PRODUCT_SUBCATEGORIES = {
  VESSELS_CONTAINERS: ["Brass", "Copper", "Silver", "Clay", "Other"],
  IDOLS_MURTIS: ["Ganesh", "Lakshmi", "Shiva", "Durga", "Other"],
  INCENSE_DHOOP: ["Sticks", "Cones", "Dhoop", "Other"],
  BOOKS_MANTRAS: ["Mantras", "Stotras", "Scriptures", "Other"],
};

export default PRODUCT_CATEGORIES;
