package com.greensense.engine;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.InputStream;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * GreenSense — ML Weights Loader
 * ────────────────────────────────
 * Reads ML-trained scoring weights from ml_weights.json (on the classpath)
 * and constructs a ScoringWeights object to inject into ScoringEngine.
 *
 * The JSON file is produced by train_weights.py, which uses a
 * scikit-learn Decision Tree trained on 3,000 synthetic user-plant
 * interaction samples to learn which scoring criteria matter most.
 *
 * If the file is missing or malformed, it gracefully falls back to
 * ScoringWeights.defaults() so the app always works.
 *
 * OOP Concepts Demonstrated:
 *   - Single Responsibility: only responsible for loading weights from disk
 *   - Encapsulation: JSON parsing is fully private; callers only see load()
 *   - Dependency Injection: returns a ScoringWeights object for constructor injection
 *   - Open/Closed Principle: ScoringEngine doesn't change — only the weights change
 *   - Fail-safe design: fallback to defaults on any error
 */
public class MLWeightsLoader {

    private static final Logger LOGGER   = Logger.getLogger(MLWeightsLoader.class.getName());
    private static final String JSON_PATH = "ml_weights.json";

    /**
     * Loads ML-trained weights from the classpath JSON file.
     * Falls back to ScoringWeights.defaults() if loading fails.
     *
     * @return ScoringWeights instance (ML-trained or default)
     */
    public static ScoringWeights load() {
        try (InputStream is = MLWeightsLoader.class
                .getClassLoader()
                .getResourceAsStream(JSON_PATH)) {

            if (is == null) {
                LOGGER.warning("[MLWeightsLoader] ml_weights.json not found on classpath — using defaults.");
                return ScoringWeights.defaults();
            }

            ObjectMapper mapper = new ObjectMapper();
            JsonNode     root   = mapper.readTree(is);

            // Extract scoring weights
            JsonNode w = root.get("weights");
            JsonNode s = root.get("survival");

            if (w == null || s == null) {
                LOGGER.warning("[MLWeightsLoader] JSON missing 'weights' or 'survival' node — using defaults.");
                return ScoringWeights.defaults();
            }

            ScoringWeights mlWeights = new ScoringWeights(
                // Scoring weights (must match ScoringWeights constructor order)
                w.get("lightMatch").asInt(),
                w.get("maintenanceMatch").asInt(),
                w.get("airPurification").asInt(),
                w.get("aestheticValue").asInt(),
                w.get("petSafety").asInt(),
                w.get("climateMatch").asInt(),
                w.get("popularity").asInt(),
                // Survival config
                s.get("base").asInt(),
                s.get("lightBonus").asInt(),
                s.get("maintenanceBonus").asInt(),
                s.get("maintenancePartial").asInt(),
                s.get("climateBonus").asInt(),
                s.get("petBonus").asInt(),
                s.get("max").asInt()
            );

            double r2 = root.has("model_r2_mean") ? root.get("model_r2_mean").asDouble() : 0.0;
            LOGGER.info(String.format(
                "[MLWeightsLoader] Loaded ML weights successfully. Model R²=%.4f | " +
                "light=%d, climate=%d, maint=%d, air=%d, pets=%d, aes=%d, pop=%d",
                r2,
                mlWeights.getLightMatch(),
                mlWeights.getClimateMatch(),
                mlWeights.getMaintenanceMatch(),
                mlWeights.getAirPurification(),
                mlWeights.getPetSafety(),
                mlWeights.getAestheticValue(),
                mlWeights.getPopularity()
            ));

            return mlWeights;

        } catch (Exception e) {
            LOGGER.log(Level.SEVERE,
                "[MLWeightsLoader] Failed to parse ml_weights.json — falling back to defaults.", e);
            return ScoringWeights.defaults();
        }
    }

    /** Private constructor — this is a utility class, not instantiated */
    private MLWeightsLoader() {}
}