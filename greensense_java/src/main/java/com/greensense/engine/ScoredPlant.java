package com.greensense.engine;

import com.greensense.model.Plant;
import java.util.Map;

/**
 * GreenSense — ScoredPlant
 * ─────────────────────────
 * Intermediate object produced by the ScoringEngine.
 * Holds a Plant alongside its computed score data.
 *
 * OOP Concepts Demonstrated:
 *   - Composition: wraps a Plant (has-a relationship)
 *   - Encapsulation: score data is private
 *   - Separation of concerns: score data kept separate from Plant model
 *   - Comparable: implements Comparable for natural sort ordering
 */
public class ScoredPlant implements Comparable<ScoredPlant> {

    private final Plant plant;
    private final int finalScore;
    private final Map<String, Integer> scoreBreakdown;
    private final int survivalProbability;

    public ScoredPlant(Plant plant, int finalScore,
                       Map<String, Integer> scoreBreakdown,
                       int survivalProbability) {
        this.plant               = plant;
        this.finalScore          = finalScore;
        this.scoreBreakdown      = scoreBreakdown;
        this.survivalProbability = survivalProbability;
    }

    public Plant getPlant()                         { return plant; }
    public int getFinalScore()                      { return finalScore; }
    public Map<String, Integer> getScoreBreakdown() { return scoreBreakdown; }
    public int getSurvivalProbability()             { return survivalProbability; }

    /**
     * Natural ordering: higher score = higher priority.
     * Used by Collections.sort() to rank recommendations.
     */
    @Override
    public int compareTo(ScoredPlant other) {
        return Integer.compare(other.finalScore, this.finalScore); // descending
    }

    @Override
    public String toString() {
        return String.format("ScoredPlant{name='%s', score=%d, survival=%d%%}",
                plant.getName(), finalScore, survivalProbability);
    }
}
