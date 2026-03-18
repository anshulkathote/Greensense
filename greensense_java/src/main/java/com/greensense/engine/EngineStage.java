package com.greensense.engine;

import com.greensense.model.UserInput;
import java.util.List;

/**
 * GreenSense — EngineStage Interface
 * ─────────────────────────────────────
 * Defines the contract that every stage in the recommendation
 * pipeline must fulfill.
 *
 * OOP Concepts Demonstrated:
 *   - Interface: defines a contract without implementation
 *   - Abstraction: callers depend on the interface, not concrete classes
 *   - Polymorphism: different stages implement the same interface differently
 *
 * @param <I> Input type for this stage
 * @param <O> Output type produced by this stage
 */
public interface EngineStage<I, O> {

    /**
     * Processes the input and returns the stage's output.
     *
     * @param input     The data to process
     * @param userInput The user's environment preferences (context)
     * @return Processed output
     */
    O process(I input, UserInput userInput);

    /**
     * Returns a human-readable name for this stage.
     * Used for logging and transparency.
     */
    String getStageName();
}
