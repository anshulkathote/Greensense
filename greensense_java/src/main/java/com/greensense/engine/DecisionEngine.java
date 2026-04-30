package com.greensense.engine;

import com.greensense.data.PlantKnowledgeBase;
import com.greensense.model.Plant;
import com.greensense.model.RecommendationResult;
import com.greensense.model.UserInput;

import java.util.List;

/**
 * GreenSense — Decision Engine (Main Orchestrator)
 * ──────────────────────────────────────────────────
 * Coordinates the full 4-stage intelligent recommendation pipeline.
 * This is the single entry point for the entire AI recommendation system.
 *
 * Pipeline:
 *   Stage 1 → FilterEngine      — Hard filter incompatible plants
 *   Stage 2 → ScoringEngine     — Multi-criteria weighted scoring
 *   Stage 3 → ScoringEngine     — Rank by composite score
 *   Stage 4 → ExplanationEngine — Generate natural-language reasoning
 *
 * OOP Concepts Demonstrated:
 *   - Composition: holds instances of all 4 engine stages (has-a)
 *   - Encapsulation: pipeline stages are private implementation details
 *   - Abstraction: callers just call recommend(), unaware of internal stages
 *   - Polymorphism: all stages are treated as EngineStage interface types
 *   - Single Responsibility: only orchestrates, delegates work to stages
 */
public class DecisionEngine {

    private static final int MAX_RESULTS = 5;

    // All stages referenced via their interface type (Polymorphism)
    private final EngineStage<List<Plant>, List<Plant>>            filterEngine;
    private final EngineStage<List<Plant>, List<ScoredPlant>>      scoringEngine;
    private final EngineStage<List<ScoredPlant>, List<RecommendationResult>> explanationEngine;

    private final PlantKnowledgeBase knowledgeBase;

    /** Default constructor wires up all dependencies */
    public DecisionEngine() {
        this.knowledgeBase     = new PlantKnowledgeBase();
        this.filterEngine      = new FilterEngine();
        this.scoringEngine     = new ScoringEngine(MLWeightsLoader.load()); // ML-trained weights
        this.explanationEngine = new ExplanationEngine();
    }

    /**
     * Runs the full pipeline and returns top N recommendations.
     *
     * @param userInput Environment preferences from the user
     * @return Ranked list of recommendations with explanations
     */
    public List<RecommendationResult> recommend(UserInput userInput) {
        // Stage 1: Filter incompatible plants
        List<Plant> allPlants   = knowledgeBase.getAllPlants();
        List<Plant> compatible  = filterEngine.process(allPlants, userInput);

        // Stage 2 + 3: Score and rank
        List<ScoredPlant> ranked = scoringEngine.process(compatible, userInput);
        List<ScoredPlant> topN   = ranked.subList(0, Math.min(MAX_RESULTS, ranked.size()));

        // Stage 4: Generate explanations
        return explanationEngine.process(topN, userInput);
    }

    /**
     * Returns the count of compatible plants for a given input.
     * Used by the frontend's live filter indicator.
     */
    public int countCompatible(UserInput userInput) {
        return filterEngine.process(knowledgeBase.getAllPlants(), userInput).size();
    }

    /** Returns the total number of plants in the knowledge base */
    public int totalPlants() {
        return knowledgeBase.getAllPlants().size();
    }
}