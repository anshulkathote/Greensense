package com.greensense.model;

/**
 * GreenSense — CareGuide Model
 * ──────────────────────────────
 * Represents the care instructions for a plant.
 *
 * OOP Concepts Demonstrated:
 *   - Encapsulation: private fields with public getters
 *   - Composition: used as a field inside Plant (has-a relationship)
 */
public class CareGuide {

    private final String watering;
    private final String sunlight;
    private final String humidity;

    public CareGuide(String watering, String sunlight, String humidity) {
        this.watering = watering;
        this.sunlight = sunlight;
        this.humidity = humidity;
    }

    public String getWatering() { return watering; }
    public String getSunlight() { return sunlight; }
    public String getHumidity() { return humidity; }

    @Override
    public String toString() {
        return String.format("CareGuide{watering='%s', sunlight='%s', humidity='%s'}",
                watering, sunlight, humidity);
    }
}
