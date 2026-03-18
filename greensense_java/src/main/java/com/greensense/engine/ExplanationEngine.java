package com.greensense.engine;

import com.greensense.model.Plant;
import com.greensense.model.RecommendationResult;
import com.greensense.model.UserInput;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * GreenSense — Explanation Engine
 * ──────────────────────────────────
 * Stage 4 of the Decision Pipeline.
 * Converts numeric scoring logic into human-readable reasoning,
 * implementing Explainable AI (XAI) principles.
 *
 * OOP Concepts Demonstrated:
 *   - Implements EngineStage interface (Interface implementation)
 *   - Polymorphism: used as an EngineStage in the pipeline
 *   - Encapsulation: explanation/risk/strength logic in private methods
 *   - Single Responsibility: only generates explanations
 */
public class ExplanationEngine implements EngineStage<List<ScoredPlant>, List<RecommendationResult>> {

    private static final Map<String, String> LIGHT_LABELS = Map.of(
        "low",    "low-light conditions",
        "medium", "medium-light environments",
        "bright", "bright, well-lit spaces"
    );

    private static final Map<String, String> MAINTENANCE_LABELS = Map.of(
        "low",    "minimal, low-effort care",
        "medium", "moderate weekly attention",
        "high",   "regular, hands-on care"
    );

    private static final Map<String, String> STRENGTH_LABELS = Map.of(
        "lightMatch",       "🌞 Light Perfect",
        "maintenanceMatch", "🔧 Easy Care Fit",
        "airPurification",  "💨 Top Air Purifier",
        "aestheticValue",   "✨ High Aesthetics",
        "petSafety",        "🐾 Pet Safe",
        "climateMatch",     "🌡️ Climate Match",
        "popularity",       "⭐ Community Pick"
    );

    @Override
    public String getStageName() {
        return "Explainable AI — Explanation Generation";
    }

    @Override
    public List<RecommendationResult> process(List<ScoredPlant> scoredPlants, UserInput userInput) {
        List<RecommendationResult> results = new ArrayList<>();
        for (int i = 0; i < scoredPlants.size(); i++) {
            ScoredPlant sp = scoredPlants.get(i);
            results.add(new RecommendationResult(
                sp.getPlant(),
                sp.getFinalScore(),
                sp.getScoreBreakdown(),
                sp.getSurvivalProbability(),
                generateExplanation(sp.getPlant(), userInput),
                generateRiskNote(sp.getPlant(), userInput),
                getPrimaryStrength(sp.getScoreBreakdown()),
                i + 1
            ));
        }
        return results;
    }

    // ── Private explanation methods (Encapsulation) ─────────────

    private String generateExplanation(Plant plant, UserInput input) {
        List<String> reasons = new ArrayList<>();

        if (plant.getLightRequirement().contains(input.getLight())) {
            String label = LIGHT_LABELS.getOrDefault(input.getLight(), input.getLight() + "-light conditions");
            reasons.add("naturally thrives in " + label + " like yours");
        }

        if (plant.getMaintenanceLevel().equals(input.getMaintenance())) {
            String label = MAINTENANCE_LABELS.getOrDefault(input.getMaintenance(), input.getMaintenance() + " maintenance");
            reasons.add("perfectly matches your preference for " + label);
        } else if (plant.getMaintenanceLevel().equals("low") && !input.getMaintenance().equals("low")) {
            reasons.add("is even easier to care for than your stated preference");
        }

        if (plant.getClimate().contains(input.getClimate())) {
            reasons.add("is well-adapted to " + input.getClimate() + " climates");
        }

        if (plant.isPetSafe()) {
            reasons.add("is completely non-toxic and safe around your pets");
        }

        if (plant.getAirPurification() >= 9) {
            reasons.add("has exceptional NASA-validated air-purifying properties");
        } else if (plant.getAirPurification() >= 7) {
            reasons.add("offers strong air purification benefits");
        }

        if (plant.getAestheticValue() >= 9) {
            reasons.add("delivers outstanding visual impact and aesthetic appeal");
        }

        String roomLabel = input.getRoomType().replace("_", " ");
        reasons.add("is an excellent fit for a " + roomLabel);

        if (reasons.isEmpty()) return "A compatible plant for your environment.";
        if (reasons.size() == 1) return "This plant is recommended because it " + reasons.get(0) + ".";

        String last = reasons.remove(reasons.size() - 1);
        return "This plant is recommended because it " + String.join(", ", reasons) + ", and " + last + ".";
    }

    private String generateRiskNote(Plant plant, UserInput input) {
        if (!plant.getToxicTo().isEmpty() && input.isHasPets()) {
            return "⚠️ Toxic to " + String.join(" and ", plant.getToxicTo()) + " — keep out of reach.";
        }
        if (!plant.getToxicTo().isEmpty()) {
            return "Note: Toxic to " + String.join(" and ", plant.getToxicTo()) + " if ingested.";
        }
        if (plant.getMaintenanceLevel().equals("high") && input.getMaintenance().equals("low")) {
            return "This plant requires more care than your stated preference.";
        }
        return null;
    }

    private String getPrimaryStrength(Map<String, Integer> breakdown) {
        return breakdown.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(e -> STRENGTH_LABELS.getOrDefault(e.getKey(), "🌿 Well Matched"))
                .orElse("🌿 Well Matched");
    }
}
