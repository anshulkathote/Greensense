// GreenSense — System Constants & Configuration

export const SCORING_WEIGHTS = {
  lightMatch:       20,
  maintenanceMatch: 18,
  airPurification:  15,
  aestheticValue:   12,
  petSafety:        15,
  climateMatch:     10,
  popularity:       10,
};

export const SURVIVAL_CONFIG = {
  base:               60,
  lightBonus:         15,
  maintenanceBonus:   12,
  maintenancePartial:  6,
  climateBonus:       10,
  petSafeBonus:        3,
  max:                98,
};

export const MAINTENANCE_MAP = { low: 0, medium: 1, high: 2 };

export const MAX_RESULTS = 5;

export const DEFAULT_FORM = {
  roomType:    "living_room",
  light:       "medium",
  climate:     "temperate",
  maintenance: "low",
  hasPets:     false,
};

export const ROOM_OPTIONS = [
  { value: "living_room", label: "Living Room", icon: "🛋️" },
  { value: "bedroom",     label: "Bedroom",     icon: "🛏️" },
  { value: "office",      label: "Office",      icon: "💼" },
  { value: "bathroom",    label: "Bathroom",    icon: "🚿" },
  { value: "kitchen",     label: "Kitchen",     icon: "🍳" },
  { value: "balcony",     label: "Balcony",     icon: "🏗️" },
];

export const LIGHT_OPTIONS = [
  { value: "low",    label: "Low",    icon: "🌑" },
  { value: "medium", label: "Medium", icon: "⛅" },
  { value: "bright", label: "Bright", icon: "☀️" },
];

export const CLIMATE_OPTIONS = [
  { value: "tropical",      label: "Tropical",      icon: "🌴" },
  { value: "temperate",     label: "Temperate",     icon: "🍂" },
  { value: "arid",          label: "Arid / Dry",    icon: "🏜️" },
  { value: "mediterranean", label: "Mediterranean", icon: "🫒" },
];

export const MAINTENANCE_OPTIONS = [
  { value: "low",    label: "Low (set & forget)",     icon: "😌" },
  { value: "medium", label: "Medium (weekly care)",   icon: "🙂" },
  { value: "high",   label: "High (daily attention)", icon: "🌟" },
];

export const PET_OPTIONS = [
  { value: false, label: "No Pets",  icon: "🚫" },
  { value: true,  label: "Has Pets", icon: "🐶" },
];
