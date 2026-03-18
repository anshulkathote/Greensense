package com.greensense.engine;

/**
 * GreenSense — Scoring Weights Configuration
 * ─────────────────────────────────────────────
 * Centralizes all scoring weights for the multi-criteria evaluation.
 * Change values here to retune the recommendation engine without
 * touching any other class.
 *
 * OOP Concepts Demonstrated:
 *   - Encapsulation: weights are private, accessed via getters
 *   - Single Responsibility: only holds scoring configuration
 *   - Abstraction: ScoringEngine depends on this class, not raw numbers
 */
public class ScoringWeights {

    private final int lightMatch;
    private final int maintenanceMatch;
    private final int airPurification;
    private final int aestheticValue;
    private final int petSafety;
    private final int climateMatch;
    private final int popularity;

    // Survival probability config
    private final int survivalBase;
    private final int survivalLightBonus;
    private final int survivalMaintenanceBonus;
    private final int survivalMaintenancePartial;
    private final int survivalClimateBonus;
    private final int survivalPetBonus;
    private final int survivalMax;

    /** Default weights used by the system */
    public static ScoringWeights defaults() {
        return new ScoringWeights(
            20, 18, 15, 12, 15, 10, 10,  // scoring weights
            60, 15, 12,  6, 10,  3, 98   // survival config
        );
    }

    public ScoringWeights(int lightMatch, int maintenanceMatch, int airPurification,
                          int aestheticValue, int petSafety, int climateMatch, int popularity,
                          int survivalBase, int survivalLightBonus, int survivalMaintenanceBonus,
                          int survivalMaintenancePartial, int survivalClimateBonus,
                          int survivalPetBonus, int survivalMax) {
        this.lightMatch                = lightMatch;
        this.maintenanceMatch          = maintenanceMatch;
        this.airPurification           = airPurification;
        this.aestheticValue            = aestheticValue;
        this.petSafety                 = petSafety;
        this.climateMatch              = climateMatch;
        this.popularity                = popularity;
        this.survivalBase              = survivalBase;
        this.survivalLightBonus        = survivalLightBonus;
        this.survivalMaintenanceBonus  = survivalMaintenanceBonus;
        this.survivalMaintenancePartial= survivalMaintenancePartial;
        this.survivalClimateBonus      = survivalClimateBonus;
        this.survivalPetBonus          = survivalPetBonus;
        this.survivalMax               = survivalMax;
    }

    public int getLightMatch()                 { return lightMatch; }
    public int getMaintenanceMatch()           { return maintenanceMatch; }
    public int getAirPurification()            { return airPurification; }
    public int getAestheticValue()             { return aestheticValue; }
    public int getPetSafety()                  { return petSafety; }
    public int getClimateMatch()               { return climateMatch; }
    public int getPopularity()                 { return popularity; }
    public int getSurvivalBase()               { return survivalBase; }
    public int getSurvivalLightBonus()         { return survivalLightBonus; }
    public int getSurvivalMaintenanceBonus()   { return survivalMaintenanceBonus; }
    public int getSurvivalMaintenancePartial() { return survivalMaintenancePartial; }
    public int getSurvivalClimateBonus()       { return survivalClimateBonus; }
    public int getSurvivalPetBonus()           { return survivalPetBonus; }
    public int getSurvivalMax()                { return survivalMax; }
}
