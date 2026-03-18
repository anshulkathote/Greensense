package com.greensense.engine;

import com.greensense.model.Plant;
import com.greensense.model.UserInput;

import java.util.List;
import java.util.stream.Collectors;

/**
 * GreenSense — Filter Engine
 * ─────────────────────────────
 * Stage 1 of the Decision Pipeline.
 * Hard-eliminates plants incompatible with the user's environment.
 *
 * OOP Concepts Demonstrated:
 *   - Implements EngineStage interface (Interface implementation)
 *   - Polymorphism: behaves as an EngineStage when used in the pipeline
 *   - Single Responsibility: only responsible for filtering
 *   - Encapsulation: each filter rule is a private method
 */
public class FilterEngine implements EngineStage<List<Plant>, List<Plant>> {

    @Override
    public String getStageName() {
        return "Context-Aware Filter";
    }

    /**
     * Filters out plants incompatible with the user's environment.
     * All four rules must pass for a plant to be included.
     */
    @Override
    public List<Plant> process(List<Plant> plants, UserInput userInput) {
        return plants.stream()
                .filter(plant -> passesLightRule(plant, userInput))
                .filter(plant -> passesClimateRule(plant, userInput))
                .filter(plant -> passesPetRule(plant, userInput))
                .filter(plant -> passesRoomRule(plant, userInput))
                .collect(Collectors.toList());
    }

    // ── Private filter rules (Encapsulation) ────────────────────

    /** Rule 1: Plant must support the available light level */
    private boolean passesLightRule(Plant plant, UserInput input) {
        return plant.getLightRequirement().contains(input.getLight())
            || plant.getLightRequirement().contains("any");
    }

    /** Rule 2: Plant must be suited to the regional climate */
    private boolean passesClimateRule(Plant plant, UserInput input) {
        return plant.getClimate().contains(input.getClimate())
            || plant.getClimate().contains("any");
    }

    /** Rule 3: If pets are present, only pet-safe plants pass */
    private boolean passesPetRule(Plant plant, UserInput input) {
        if (input.isHasPets()) {
            return plant.isPetSafe();
        }
        return true;
    }

    /** Rule 4: Plant must be suitable for the specified room */
    private boolean passesRoomRule(Plant plant, UserInput input) {
        return plant.getRoomSuitability().contains(input.getRoomType())
            || plant.getRoomSuitability().contains("any");
    }
}
