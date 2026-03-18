package com.greensense.api;

import com.greensense.engine.DecisionEngine;
import com.greensense.model.RecommendationResult;
import com.greensense.model.UserInput;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * GreenSense — REST API Controller
 * ───────────────────────────────────
 * Exposes the Java decision engine to the React frontend via HTTP.
 * The frontend sends user input as JSON; this controller passes it
 * through the engine and returns recommendations as JSON.
 *
 * OOP Concepts Demonstrated:
 *   - Composition: contains a DecisionEngine instance (has-a)
 *   - Encapsulation: engine is private, only endpoints are public
 *   - Single Responsibility: only handles HTTP request/response mapping
 *   - Abstraction: frontend has no knowledge of Java engine internals
 *
 * API Endpoints:
 *   POST /api/recommend         → Get plant recommendations
 *   POST /api/compatible-count  → Get live filter count
 *   GET  /api/total-plants      → Get total KB size
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Allow React dev server
public class RecommendationController {

    // Composition: controller HAS-A decision engine
    private final DecisionEngine decisionEngine;

    public RecommendationController() {
        this.decisionEngine = new DecisionEngine();
    }

    /**
     * Main recommendation endpoint.
     * Accepts user environment input and returns ranked plant recommendations.
     *
     * POST /api/recommend
     * Body: { roomType, light, climate, maintenance, hasPets }
     */
    @PostMapping("/recommend")
    public List<RecommendationResult> recommend(@RequestBody UserInput userInput) {
        return decisionEngine.recommend(userInput);
    }

    /**
     * Live compatibility count endpoint.
     * Used by the frontend form to show how many plants match current settings.
     *
     * POST /api/compatible-count
     */
    @PostMapping("/compatible-count")
    public Map<String, Integer> compatibleCount(@RequestBody UserInput userInput) {
        return Map.of("count", decisionEngine.countCompatible(userInput));
    }

    /**
     * Total plants count endpoint.
     *
     * GET /api/total-plants
     */
    @GetMapping("/total-plants")
    public Map<String, Integer> totalPlants() {
        return Map.of("total", decisionEngine.totalPlants());
    }
}
