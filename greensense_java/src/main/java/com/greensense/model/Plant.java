package com.greensense.model;

import java.util.List;

/**
 * GreenSense — Plant Model
 * ─────────────────────────
 * Represents a single plant in the knowledge base.
 *
 * OOP Concepts Demonstrated:
 *   - Encapsulation: all fields are private, accessed via getters
 *   - Abstraction: exposes only relevant data to the outside world
 */
public class Plant {

    // ── Private fields (Encapsulation) ──────────────────────────
    private final String id;
    private final String name;
    private final String scientificName;
    private final String emoji;
    private final List<String> lightRequirement;
    private final List<String> climate;
    private final String maintenanceLevel;
    private final boolean petSafe;
    private final List<String> roomSuitability;
    private final int aestheticValue;       // 1–10
    private final int airPurification;      // 1–10
    private final List<String> benefits;
    private final CareGuide care;
    private final double popularityScore;   // 0–10
    private final List<String> tags;
    private final List<String> toxicTo;
    private final int baseScore;

    // ── Constructor ──────────────────────────────────────────────
    public Plant(String id, String name, String scientificName, String emoji,
                 List<String> lightRequirement, List<String> climate,
                 String maintenanceLevel, boolean petSafe,
                 List<String> roomSuitability, int aestheticValue,
                 int airPurification, List<String> benefits, CareGuide care,
                 double popularityScore, List<String> tags,
                 List<String> toxicTo, int baseScore) {
        this.id                = id;
        this.name              = name;
        this.scientificName    = scientificName;
        this.emoji             = emoji;
        this.lightRequirement  = lightRequirement;
        this.climate           = climate;
        this.maintenanceLevel  = maintenanceLevel;
        this.petSafe           = petSafe;
        this.roomSuitability   = roomSuitability;
        this.aestheticValue    = aestheticValue;
        this.airPurification   = airPurification;
        this.benefits          = benefits;
        this.care              = care;
        this.popularityScore   = popularityScore;
        this.tags              = tags;
        this.toxicTo           = toxicTo;
        this.baseScore         = baseScore;
    }

    // ── Getters (Encapsulation — controlled access) ─────────────
    public String getId()                    { return id; }
    public String getName()                  { return name; }
    public String getScientificName()        { return scientificName; }
    public String getEmoji()                 { return emoji; }
    public List<String> getLightRequirement(){ return lightRequirement; }
    public List<String> getClimate()         { return climate; }
    public String getMaintenanceLevel()      { return maintenanceLevel; }
    public boolean isPetSafe()               { return petSafe; }
    public List<String> getRoomSuitability() { return roomSuitability; }
    public int getAestheticValue()           { return aestheticValue; }
    public int getAirPurification()          { return airPurification; }
    public List<String> getBenefits()        { return benefits; }
    public CareGuide getCare()               { return care; }
    public double getPopularityScore()       { return popularityScore; }
    public List<String> getTags()            { return tags; }
    public List<String> getToxicTo()         { return toxicTo; }
    public int getBaseScore()                { return baseScore; }

    @Override
    public String toString() {
        return String.format("Plant{id='%s', name='%s', maintenance='%s', petSafe=%b}",
                id, name, maintenanceLevel, petSafe);
    }
}
