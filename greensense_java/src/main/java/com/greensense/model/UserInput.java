package com.greensense.model;

/**
 * GreenSense — UserInput Model
 * ──────────────────────────────
 * Encapsulates all environment preferences submitted by the user.
 *
 * OOP Concepts Demonstrated:
 *   - Encapsulation: private fields, public getters/setters
 *   - Abstraction: represents a real-world concept (user's environment)
 */
public class UserInput {

    private String roomType;
    private String light;
    private String climate;
    private String maintenance;
    private boolean hasPets;

    // Default constructor (needed for JSON deserialization)
    public UserInput() {}

    public UserInput(String roomType, String light, String climate,
                     String maintenance, boolean hasPets) {
        this.roomType    = roomType;
        this.light       = light;
        this.climate     = climate;
        this.maintenance = maintenance;
        this.hasPets     = hasPets;
    }

    // Getters
    public String getRoomType()    { return roomType; }
    public String getLight()       { return light; }
    public String getClimate()     { return climate; }
    public String getMaintenance() { return maintenance; }
    public boolean isHasPets()     { return hasPets; }

    // Setters (needed for JSON deserialization)
    public void setRoomType(String roomType)       { this.roomType = roomType; }
    public void setLight(String light)             { this.light = light; }
    public void setClimate(String climate)         { this.climate = climate; }
    public void setMaintenance(String maintenance) { this.maintenance = maintenance; }
    public void setHasPets(boolean hasPets)        { this.hasPets = hasPets; }

    @Override
    public String toString() {
        return String.format(
            "UserInput{room='%s', light='%s', climate='%s', maintenance='%s', pets=%b}",
            roomType, light, climate, maintenance, hasPets);
    }
}
