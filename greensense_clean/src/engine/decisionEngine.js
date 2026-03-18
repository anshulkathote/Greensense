// GreenSense — Decision Engine (Java API Client)
// ────────────────────────────────────────────────
// All intelligence runs in the Java backend (Spring Boot on port 8080).
// This module calls the Java REST API and flattens the response so the
// rest of the React frontend works exactly as before — no other file changes.

const API_BASE = "http://localhost:8080/api";

// ── Cached values fetched once on load ──────────────────────────
let _totalPlants    = 16;
let _compatibleCount = 16;

// Fetch total plant count from Java on startup
fetch(`${API_BASE}/total-plants`)
  .then(r => r.json())
  .then(d => { _totalPlants = d.total; })
  .catch(() => {});

/**
 * Calls Java backend and returns ranked recommendations.
 * Flattens Java's nested { plant: {...}, finalScore, ... } structure
 * into the flat shape the frontend already expects.
 */
export async function recommend(userInput) {
  const response = await fetch(`${API_BASE}/recommend`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(userInput),
  });
  if (!response.ok) throw new Error("Java backend unreachable");
  const results = await response.json();

  // Flatten: merge plant fields up so PlantCard works unchanged
  // Java returns: { plant: { name, petSafe, ... }, finalScore, explanation, ... }
  // Frontend expects: { name, petSafe, ..., finalScore, explanation, ... }
  return results.map(r => ({
    ...r.plant,                        // spread all Plant fields to top level
    finalScore:          r.finalScore,
    scoreBreakdown:      r.scoreBreakdown,
    survivalProbability: r.survivalProbability,
    explanation:         r.explanation,
    riskNote:            r.riskNote,
    primaryStrength:     r.primaryStrength,
    rank:                r.rank,
  }));
}

/**
 * Returns live count of compatible plants.
 * Called on every form change for the live filter bar.
 */
export async function countCompatibleAsync(userInput) {
  try {
    const response = await fetch(`${API_BASE}/compatible-count`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(userInput),
    });
    const data = await response.json();
    _compatibleCount = data.count;
    return data.count;
  } catch {
    return _compatibleCount;
  }
}

// Sync wrappers so App.jsx call signatures stay identical
export function countCompatible()  { return _compatibleCount; }
export function totalPlants()      { return _totalPlants; }
