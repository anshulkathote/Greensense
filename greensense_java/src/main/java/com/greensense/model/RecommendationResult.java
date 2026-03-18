package com.greensense.model;

import java.util.Map;

/**
 * GreenSense — RecommendationResult Model
 * ─────────────────────────────────────────
 * Wraps a Plant with additional fields computed by the engine:
 * final score, score breakdown, survival probability, and explanation.
 *
 * OOP Concepts Demonstrated:
 *   - Encapsulation: private fields, public getters
 *   - Composition: contains a Plant object (has-a relationship)
 *   - Separation of concerns: keeps computed data separate from raw Plant data
 */
public class RecommendationResult {

    private final Plant plant;
    private final int finalScore;
    private final Map<String, Integer> scoreBreakdown;
    private final int survivalProbability;
    private final String explanation;
    private final String riskNote;
    private final String primaryStrength;
    private final int rank;

    public RecommendationResult(Plant plant, int finalScore,
                                Map<String, Integer> scoreBreakdown,
                                int survivalProbability, String explanation,
                                String riskNote, String primaryStrength, int rank) {
        this.plant               = plant;
        this.finalScore          = finalScore;
        this.scoreBreakdown      = scoreBreakdown;
        this.survivalProbability = survivalProbability;
        this.explanation         = explanation;
        this.riskNote            = riskNote;
        this.primaryStrength     = primaryStrength;
        this.rank                = rank;
    }

    public Plant getPlant()                        { return plant; }
    public int getFinalScore()                     { return finalScore; }
    public Map<String, Integer> getScoreBreakdown(){ return scoreBreakdown; }
    public int getSurvivalProbability()            { return survivalProbability; }
    public String getExplanation()                 { return explanation; }
    public String getRiskNote()                    { return riskNote; }
    public String getPrimaryStrength()             { return primaryStrength; }
    public int getRank()                           { return rank; }

    @Override
    public String toString() {
        return String.format(
            "RecommendationResult{rank=%d, plant='%s', score=%d, survival=%d%%}",
            rank, plant.getName(), finalScore, survivalProbability);
    }
}
