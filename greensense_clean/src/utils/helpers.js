// GreenSense — Utility Helpers

export function formatRoomLabel(roomType) {
  return roomType.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function survivalColor(pct) {
  if (pct >= 80) return "#52b788";
  if (pct >= 60) return "#f4a261";
  return "#e63946";
}

export function circleCircumference(radius) {
  return 2 * Math.PI * radius;
}

export function toPercent(value, max) {
  return `${Math.round(clamp((value / max) * 100, 0, 100))}%`;
}

export function staggerDelay(index, baseDelay = 0.3, step = 0.4) {
  return `${baseDelay + index * step}s`;
}

export function rankColor(rank) {
  return ["#FFD700", "#C0C0C0", "#CD7F32", "#52b788", "#52b788"][rank] ?? "#52b788";
}
