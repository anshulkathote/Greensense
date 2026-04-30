// GreenSense — Nursery Data
// 6 Pune-based nurseries with per-plant pricing.

export const NURSERIES = [
  {
    id: "green_thumb",
    name: "Green Thumb Nursery",
    area: "Koregaon Park",
    address: "12, North Main Rd, Koregaon Park, Pune – 411001",
    phone: "+91 98220 34512",
    hours: "Mon–Sat  8 AM – 7 PM",
    rating: 4.8,
    reviews: 312,
    speciality: "Exotic & Tropical Plants",
    icon: "🌿",
    mapLink: "https://maps.google.com/?q=Koregaon+Park+Pune+Nursery",
    badge: "Top Rated",
    badgeColor: "#16a34a",
  },
  {
    id: "flora_world",
    name: "Flora World",
    area: "Aundh",
    address: "Shop 4, ITI Rd, Aundh, Pune – 411007",
    phone: "+91 91302 77821",
    hours: "Mon–Sun  9 AM – 8 PM",
    rating: 4.6,
    reviews: 218,
    speciality: "Indoor & Air-Purifying Plants",
    icon: "🌸",
    mapLink: "https://maps.google.com/?q=Aundh+Pune+Nursery",
    badge: "Open Sundays",
    badgeColor: "#0284c7",
  },
  {
    id: "pune_garden_centre",
    name: "Pune Garden Centre",
    area: "Hadapsar",
    address: "Near Magarpatta City, Hadapsar, Pune – 411028",
    phone: "+91 70301 55290",
    hours: "Tue–Sun  8 AM – 6 PM",
    rating: 4.4,
    reviews: 175,
    speciality: "Budget Plants & Succulents",
    icon: "🌱",
    mapLink: "https://maps.google.com/?q=Hadapsar+Pune+Nursery",
    badge: "Best Value",
    badgeColor: "#d97706",
  },
  {
    id: "urban_leaves",
    name: "Urban Leaves",
    area: "Baner",
    address: "Baner–Pashan Link Rd, Near Orchid Hotel, Pune – 411045",
    phone: "+91 96657 11043",
    hours: "Mon–Sun  10 AM – 9 PM",
    rating: 4.7,
    reviews: 289,
    speciality: "Modern Planters & Rare Varieties",
    icon: "🏙️",
    mapLink: "https://maps.google.com/?q=Baner+Pune+Nursery",
    badge: "Rare Finds",
    badgeColor: "#7c3aed",
  },
  {
    id: "nature_basket",
    name: "Nature's Basket Nursery",
    area: "Viman Nagar",
    address: "Opp. Phoenix Marketcity, Viman Nagar, Pune – 411014",
    phone: "+91 83800 62177",
    hours: "Mon–Sat  9 AM – 7 PM",
    rating: 4.5,
    reviews: 203,
    speciality: "Pet-Safe & Child-Friendly Plants",
    icon: "🧺",
    mapLink: "https://maps.google.com/?q=Viman+Nagar+Pune+Nursery",
    badge: "Pet Safe",
    badgeColor: "#0891b2",
  },
  {
    id: "the_plant_stop",
    name: "The Plant Stop",
    area: "Kothrud",
    address: "Survey No. 56, Karve Rd, Kothrud, Pune – 411038",
    phone: "+91 77090 33841",
    hours: "Wed–Mon  8 AM – 6 PM",
    rating: 4.3,
    reviews: 142,
    speciality: "Medicinal & Aromatic Plants",
    icon: "🪴",
    mapLink: "https://maps.google.com/?q=Kothrud+Pune+Nursery",
    badge: "Medicinal",
    badgeColor: "#b45309",
  },
];

// Base price ranges per plant (INR)
const PLANT_PRICES = {
  snake_plant:  { low: 120, high: 180 },
  pothos:       { low: 80,  high: 140 },
  spider_plant: { low: 90,  high: 150 },
  peace_lily:   { low: 200, high: 300 },
  lavender:     { low: 150, high: 250 },
  aloe_vera:    { low: 100, high: 160 },
  fiddle_leaf:  { low: 450, high: 700 },
  boston_fern:  { low: 130, high: 200 },
  monstera:     { low: 350, high: 550 },
  rubber_plant: { low: 220, high: 350 },
  zz_plant:     { low: 180, high: 280 },
  bamboo_palm:  { low: 300, high: 480 },
  calathea:     { low: 250, high: 400 },
  rosemary:     { low: 100, high: 170 },
  english_ivy:  { low: 110, high: 180 },
  anthurium:    { low: 280, high: 420 },
};

const MULTIPLIERS = {
  green_thumb:        1.10,
  flora_world:        1.05,
  pune_garden_centre: 0.88,
  urban_leaves:       1.15,
  nature_basket:      1.08,
  the_plant_stop:     0.93,
};

export function getNurseriesForPlant(plantId) {
  const range = PLANT_PRICES[plantId] || { low: 150, high: 250 };
  const mid   = Math.round((range.low + range.high) / 2);
  return NURSERIES.map((n) => {
    const raw = Math.round(mid * (MULTIPLIERS[n.id] || 1));
    return {
      ...n,
      avgPrice:   Math.round(raw / 5) * 5,
      priceRange: `₹${range.low} – ₹${range.high}`,
    };
  });
}