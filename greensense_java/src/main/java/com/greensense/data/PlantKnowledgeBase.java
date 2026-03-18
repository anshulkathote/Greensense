package com.greensense.data;

import com.greensense.model.CareGuide;
import com.greensense.model.Plant;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * GreenSense — Plant Knowledge Base
 * ────────────────────────────────────
 * Central repository of all plant records.
 * Acts as an in-memory data store for the recommendation engine.
 *
 * OOP Concepts Demonstrated:
 *   - Encapsulation: plant list is private, accessed via getter
 *   - Abstraction: engine only calls getAllPlants(), unaware of storage details
 *   - Single Responsibility: only stores and provides plant data
 */
public class PlantKnowledgeBase {

    private final List<Plant> plants;

    public PlantKnowledgeBase() {
        this.plants = buildKnowledgeBase();
    }

    /** Returns the full list of plants in the knowledge base */
    public List<Plant> getAllPlants() {
        return Collections.unmodifiableList(plants);
    }

    /** Returns total count of plants */
    public int size() {
        return plants.size();
    }

    // ── Private builder (Encapsulation) ─────────────────────────

    private List<Plant> buildKnowledgeBase() {
        return Arrays.asList(

            new Plant("snake_plant", "Snake Plant", "Sansevieria trifasciata", "🌿",
                list("low","medium","bright"), list("tropical","temperate","arid","any"),
                "low", false,
                list("bedroom","living_room","office","hallway"),
                8, 9,
                list("Air purification powerhouse","Converts CO₂ to O₂ at night",
                     "Removes formaldehyde & benzene","Boosts focus & productivity"),
                new CareGuide("Every 2–6 weeks","Tolerates any light level","Low–medium"),
                9.2, list("beginner-friendly","low-water","architectural"),
                list("cats","dogs"), 78),

            new Plant("pothos", "Golden Pothos", "Epipremnum aureum", "🍃",
                list("low","medium","bright"), list("tropical","temperate","any"),
                "low", false,
                list("living_room","bedroom","office","bathroom","hallway"),
                8, 8,
                list("Removes VOCs from the air","Trails beautifully on shelves",
                     "Mood enhancer","Extremely forgiving to beginners"),
                new CareGuide("Every 1–2 weeks","Low to bright indirect","Medium"),
                9.5, list("beginner-friendly","trailing","versatile"),
                list("cats","dogs"), 76),

            new Plant("spider_plant", "Spider Plant", "Chlorophytum comosum", "🌱",
                list("low","medium","bright"), list("tropical","temperate","any"),
                "low", true,
                list("living_room","bedroom","office","bathroom"),
                7, 9,
                list("Completely pet-safe","Prolific propagator",
                     "Removes CO & formaldehyde","Great for families with children"),
                new CareGuide("Every 1–2 weeks","Indirect light preferred","Medium"),
                8.8, list("pet-safe","beginner-friendly","hanging"),
                list(), 74),

            new Plant("peace_lily", "Peace Lily", "Spathiphyllum wallisii", "🌸",
                list("low","medium"), list("tropical","temperate","any"),
                "medium", false,
                list("bedroom","living_room","bathroom","office"),
                9, 10,
                list("Top NASA air purifier","Absorbs acetone & alcohols",
                     "Blooms beautifully in low light","Feng shui symbol of harmony"),
                new CareGuide("Every 1–2 weeks (drooping signals thirst)",
                              "Low to medium indirect","High"),
                9.0, list("flowering","air-purifier","low-light-champion"),
                list("cats","dogs"), 80),

            new Plant("lavender", "Lavender", "Lavandula angustifolia", "💜",
                list("bright"), list("temperate","mediterranean","arid"),
                "medium", false,
                list("balcony","outdoor_garden","windowsill","living_room"),
                10, 5,
                list("Aromatherapy & stress relief","Natural insect repellent",
                     "Edible in cooking","Clinically shown to improve sleep quality"),
                new CareGuide("Every 2 weeks (drought tolerant)",
                              "Full sun 6+ hours daily","Low"),
                9.3, list("aromatic","outdoor-friendly","medicinal"),
                list("cats","dogs"), 72),

            new Plant("aloe_vera", "Aloe Vera", "Aloe barbadensis miller", "🌵",
                list("medium","bright"), list("arid","tropical","temperate","any"),
                "low", false,
                list("kitchen","balcony","windowsill","living_room","office"),
                7, 7,
                list("Medicinal gel for burns & skin care","Removes benzene & formaldehyde",
                     "Drought-tolerant succulent","Natural first-aid plant"),
                new CareGuide("Every 3–4 weeks","Bright indirect to direct sun","Low"),
                9.1, list("medicinal","succulent","beginner-friendly"),
                list("cats","dogs"), 75),

            new Plant("fiddle_leaf", "Fiddle Leaf Fig", "Ficus lyrata", "🌳",
                list("bright"), list("tropical","temperate"),
                "high", false,
                list("living_room","office","hallway"),
                10, 6,
                list("Dramatic designer statement plant","Large format architectural beauty",
                     "Creates a room focal point","Instagram-worthy aesthetic"),
                new CareGuide("Every 1–2 weeks (avoid drafts)","Bright indirect only","Medium–high"),
                8.6, list("statement-plant","trending","designer"),
                list("cats","dogs"), 68),

            new Plant("boston_fern", "Boston Fern", "Nephrolepis exaltata", "🌿",
                list("low","medium"), list("tropical","temperate"),
                "high", true,
                list("bathroom","living_room","bedroom","balcony"),
                8, 9,
                list("Completely pet-safe","Acts as a natural humidifier",
                     "Removes xylene & toluene","Lush tropical look year-round"),
                new CareGuide("Frequent — keep soil moist","Low to medium indirect",
                              "High (mist regularly)"),
                8.4, list("pet-safe","humidity-lover","hanging"),
                list(), 70),

            new Plant("monstera", "Monstera Deliciosa", "Monstera deliciosa", "🌴",
                list("medium","bright"), list("tropical","temperate"),
                "medium", false,
                list("living_room","office","bedroom"),
                10, 7,
                list("Iconic tropical aesthetic","Fast grower with dramatic leaves",
                     "Creates a lush jungle feel","Most recognized houseplant worldwide"),
                new CareGuide("Every 1–2 weeks","Medium to bright indirect","Medium–high"),
                9.4, list("trending","tropical","statement-plant"),
                list("cats","dogs"), 77),

            new Plant("rubber_plant", "Rubber Plant", "Ficus elastica", "🌿",
                list("medium","bright"), list("tropical","temperate"),
                "low", false,
                list("living_room","office","bedroom"),
                9, 8,
                list("Removes airborne bacteria & mold","Bold, glossy architectural leaves",
                     "Hardy and resilient","Air-cleaning powerhouse"),
                new CareGuide("Every 1–2 weeks","Bright indirect","Medium"),
                8.9, list("statement-plant","low-maintenance","architectural"),
                list("cats","dogs"), 76),

            new Plant("zz_plant", "ZZ Plant", "Zamioculcas zamiifolia", "🍀",
                list("low","medium"), list("tropical","temperate","arid","any"),
                "low", false,
                list("office","bedroom","living_room","hallway"),
                8, 7,
                list("Nearly indestructible","Tolerates very low light",
                     "Glossy, elegant upright leaves","Drought-tolerant"),
                new CareGuide("Every 3–4 weeks","Low to medium indirect","Low"),
                9.0, list("beginner-friendly","low-water","office-perfect"),
                list("cats","dogs"), 73),

            new Plant("bamboo_palm", "Bamboo Palm", "Chamaedorea seifrizii", "🎋",
                list("low","medium"), list("tropical","temperate"),
                "medium", true,
                list("living_room","office","bedroom","hallway"),
                9, 10,
                list("Completely pet-safe","Top-ranked NASA air purifier",
                     "Naturally humidifies the air","Elegant tropical statement"),
                new CareGuide("Every 1–2 weeks","Low to bright indirect","Medium–high"),
                8.7, list("pet-safe","air-purifier","tropical"),
                list(), 79),

            new Plant("calathea", "Calathea", "Calathea ornata", "🍂",
                list("low","medium"), list("tropical","temperate"),
                "high", true,
                list("bedroom","bathroom","living_room"),
                10, 6,
                list("Completely pet-safe","Stunning pinstripe leaf patterns",
                     "Leaves move with light","Adds living artistic flair"),
                new CareGuide("Every 1 week (use distilled water)",
                              "Low to medium indirect only","High"),
                8.5, list("pet-safe","exotic-patterns","humidity-lover"),
                list(), 69),

            new Plant("rosemary", "Rosemary", "Salvia rosmarinus", "🌿",
                list("bright"), list("mediterranean","temperate","arid"),
                "medium", false,
                list("kitchen","balcony","outdoor_garden","windowsill"),
                7, 4,
                list("Edible culinary herb","Aromatherapy enhances memory & focus",
                     "Natural insect repellent","Dual-purpose ornamental & functional"),
                new CareGuide("Every 1–2 weeks","Full sun 6+ hours","Low"),
                8.8, list("edible","aromatic","herb"),
                list("cats","dogs"), 67),

            new Plant("english_ivy", "English Ivy", "Hedera helix", "🌾",
                list("low","medium","bright"), list("temperate","tropical"),
                "medium", false,
                list("living_room","office","balcony","hallway"),
                8, 9,
                list("Reduces airborne mold spores","Removes fecal particles from air",
                     "Elegant cascading trails","Fast, vigorous grower"),
                new CareGuide("Every 1 week","Low to bright indirect","Medium"),
                8.3, list("trailing","air-purifier","classic"),
                list("cats","dogs"), 71),

            new Plant("anthurium", "Anthurium", "Anthurium andraeanum", "❤️",
                list("medium","bright"), list("tropical","temperate"),
                "medium", false,
                list("living_room","bedroom","office"),
                10, 8,
                list("Long-lasting waxy blooms year-round","Removes ammonia & xylene",
                     "Vivid tropical color splash","Exotic, luxury appearance"),
                new CareGuide("Every 1–2 weeks","Bright indirect","High"),
                8.9, list("flowering","exotic","statement-plant"),
                list("cats","dogs"), 74)
        );
    }

    /** Helper to create an immutable list from varargs */
    @SafeVarargs
    private static <T> List<T> list(T... items) {
        return Arrays.asList(items);
    }
}
