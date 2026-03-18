package com.greensense.engine;

import com.greensense.model.Plant;
import com.greensense.model.UserInput;

import java.util.*;

/**
 * GreenSense — Scoring Engine
 * ─────────────────────────────
 * Stage 2 & 3 of the Decision Pipeline.
 * Assigns a weighted composite score to each compatible plant,
 * then sorts them by score descending.
 *
 * OOP Concepts Demonstrated:
 *   - Implements EngineStage interface (Interface implementation)
 *   - Polymorphism: used as an EngineStage in the pipeline
 *   - Composition: uses ScoringWeights object for configuration
 *   - Encapsulation: each criterion is a private method
 *   - Single Responsibility: only scores and ranks plants
 */
public class ScoringEngine implements EngineStage<List<Plant>, List<ScoredPlant>> {

    // Maintenance level numeric map for distance calculation
    private static final Map<String, Integer> MAINTENANCE_MAP = new HashMap<>();
    static {
        MAINTENANCE_MAP.put("low",    0);
        MAINTENANCE_MAP.put("medium", 1);
        MAINTENANCE_MAP.put("high",   2);
    }

    private final ScoringWeights weights;

    public ScoringEngine(ScoringWeights weights) {
        this.weights = weights;
    }

    @Override
    public String getStageName() {
        return "Multi-Criteria Scoring & Ranking";
    }

    /**
     * Scores every plant and returns them sorted highest-to-lowest.
     */
    @Override
    public List<ScoredPlant> process(List<Plant> plants, UserInput userInput) {
        List<ScoredPlant> scored = new ArrayList<>();
        for (Plant plant : plants) {
            scored.add(scorePlant(plant, userInput));
        }
        Collections.sort(scored); // uses ScoredPlant.compareTo (descending)
        return scored;
    }

    // ── Private scoring methods (Encapsulation) ─────────────────

    private ScoredPlant scorePlant(Plant plant, UserInput userInput) {
        double score = plant.getBaseScore();
        Map<String, Integer> breakdown = new LinkedHashMap<>();

        // Criterion 1: Light match
        int lightScore = calcLightScore(plant, userInput);
        score += lightScore;
        breakdown.put("lightMatch", lightScore);

        // Criterion 2: Maintenance alignment
        int maintScore = calcMaintenanceScore(plant, userInput);
        score += maintScore;
        breakdown.put("maintenanceMatch", maintScore);

        // Criterion 3: Air purification
        int airScore = (int) Math.round((plant.getAirPurification() / 10.0) * weights.getAirPurification());
        score += airScore;
        breakdown.put("airPurification", airScore);

        // Criterion 4: Aesthetic value
        int aestheticScore = (int) Math.round((plant.getAestheticValue() / 10.0) * weights.getAestheticValue());
        score += aestheticScore;
        breakdown.put("aestheticValue", aestheticScore);

        // Criterion 5: Pet safety bonus
        int petScore = plant.isPetSafe() ? weights.getPetSafety() : 0;
        score += petScore;
        breakdown.put("petSafety", petScore);

        // Criterion 6: Climate match
        int climateScore = calcClimateScore(plant, userInput);
        score += climateScore;
        breakdown.put("climateMatch", climateScore);

        // Criterion 7: Community popularity
        int popScore = (int) Math.round(((plant.getPopularityScore() - 8) / 2.0) * weights.getPopularity());
        score += popScore;
        breakdown.put("popularity", popScore);

        int survivalProbability = calcSurvivalProbability(plant, userInput);

        return new ScoredPlant(plant, (int) Math.round(score), breakdown, survivalProbability);
    }

    private int calcLightScore(Plant plant, UserInput input) {
        return plant.getLightRequirement().contains(input.getLight())
                ? weights.getLightMatch() : 0;
    }

    private int calcMaintenanceScore(Plant plant, UserInput input) {
        int userLevel  = MAINTENANCE_MAP.getOrDefault(input.getMaintenance(), 1);
        int plantLevel = MAINTENANCE_MAP.getOrDefault(plant.getMaintenanceLevel(), 1);
        int diff       = Math.abs(userLevel - plantLevel);
        return Math.max(0, weights.getMaintenanceMatch() - diff * 6);
    }

    private int calcClimateScore(Plant plant, UserInput input) {
        return plant.getClimate().contains(input.getClimate())
                ? weights.getClimateMatch() : 5;
    }

    private int calcSurvivalProbability(Plant plant, UserInput input) {
        int userLevel  = MAINTENANCE_MAP.getOrDefault(input.getMaintenance(), 1);
        int plantLevel = MAINTENANCE_MAP.getOrDefault(plant.getMaintenanceLevel(), 1);
        int diff       = Math.abs(userLevel - plantLevel);

        int bonus = 0;
        if (plant.getLightRequirement().contains(input.getLight()))
            bonus += weights.getSurvivalLightBonus();
        if (diff == 0)
            bonus += weights.getSurvivalMaintenanceBonus();
        else if (diff == 1)
            bonus += weights.getSurvivalMaintenancePartial();
        if (plant.getClimate().contains(input.getClimate()))
            bonus += weights.getSurvivalClimateBonus();
        if (plant.isPetSafe() || !input.isHasPets())
            bonus += weights.getSurvivalPetBonus();

        return Math.min(weights.getSurvivalMax(), weights.getSurvivalBase() + bonus);
    }
}
