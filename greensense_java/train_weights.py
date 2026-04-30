"""
GreenSense — ML Weight Training Script
=======================================
Trains a Decision Tree on simulated plant-user interaction data
to learn optimal scoring weights for the ScoringEngine.

Output: ml_weights.json  (read by MLWeightsLoader.java at startup)

OOP Angle: The learned weights are injected into ScoringWeights,
replacing hardcoded defaults. ScoringEngine never knows the difference —
that's abstraction + Open/Closed Principle in action.
"""

import json, math, random
import numpy as np
from sklearn.tree import DecisionTreeRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import cross_val_score

random.seed(42)
np.random.seed(42)

# ── Plant database (mirrors PlantKnowledgeBase.java) ─────────────────────────
PLANTS = [
    {"id":"snake_plant",  "light":["low","medium"],           "climate":["tropical","temperate"],    "maintenance":"low",    "petSafe":False,"airPurification":9,"aesthetic":8,"popularity":9.2},
    {"id":"pothos",       "light":["low","medium"],           "climate":["tropical","temperate"],    "maintenance":"low",    "petSafe":False,"airPurification":8,"aesthetic":7,"popularity":9.0},
    {"id":"spider_plant", "light":["low","medium"],           "climate":["temperate","tropical"],    "maintenance":"low",    "petSafe":True, "airPurification":9,"aesthetic":7,"popularity":8.8},
    {"id":"peace_lily",   "light":["low","medium"],           "climate":["tropical"],                "maintenance":"medium", "petSafe":False,"airPurification":9,"aesthetic":9,"popularity":8.5},
    {"id":"lavender",     "light":["bright"],                  "climate":["temperate","arid"],        "maintenance":"medium", "petSafe":True, "airPurification":6,"aesthetic":9,"popularity":8.7},
    {"id":"aloe_vera",    "light":["medium","bright"],         "climate":["arid","tropical"],         "maintenance":"low",    "petSafe":False,"airPurification":7,"aesthetic":7,"popularity":8.9},
    {"id":"fiddle_leaf",  "light":["medium","bright"],         "climate":["tropical"],                "maintenance":"high",   "petSafe":False,"airPurification":6,"aesthetic":10,"popularity":8.3},
    {"id":"boston_fern",  "light":["low","medium"],            "climate":["temperate","tropical"],    "maintenance":"high",   "petSafe":True, "airPurification":9,"aesthetic":8,"popularity":8.0},
    {"id":"monstera",     "light":["medium","bright"],         "climate":["tropical"],                "maintenance":"medium", "petSafe":False,"airPurification":7,"aesthetic":10,"popularity":9.1},
    {"id":"rubber_plant", "light":["medium","bright"],         "climate":["tropical","temperate"],    "maintenance":"low",    "petSafe":False,"airPurification":8,"aesthetic":8,"popularity":8.4},
    {"id":"zz_plant",     "light":["low","medium"],            "climate":["tropical","arid"],         "maintenance":"low",    "petSafe":False,"airPurification":6,"aesthetic":8,"popularity":8.6},
    {"id":"bamboo_palm",  "light":["medium","bright"],         "climate":["tropical"],                "maintenance":"medium", "petSafe":True, "airPurification":9,"aesthetic":9,"popularity":8.5},
    {"id":"calathea",     "light":["low","medium"],            "climate":["tropical"],                "maintenance":"high",   "petSafe":True, "airPurification":7,"aesthetic":9,"popularity":8.2},
    {"id":"rosemary",     "light":["bright"],                  "climate":["temperate","arid"],        "maintenance":"medium", "petSafe":True, "airPurification":6,"aesthetic":7,"popularity":8.1},
    {"id":"english_ivy",  "light":["low","medium","bright"],   "climate":["temperate"],               "maintenance":"medium", "petSafe":False,"airPurification":8,"aesthetic":8,"popularity":7.9},
    {"id":"anthurium",    "light":["medium"],                  "climate":["tropical"],                "maintenance":"medium", "petSafe":False,"airPurification":7,"aesthetic":9,"popularity":8.4},
]

LIGHT_OPTIONS       = ["low", "medium", "bright"]
CLIMATE_OPTIONS     = ["tropical", "temperate", "arid"]
MAINT_OPTIONS       = ["low", "medium", "high"]
MAINT_MAP           = {"low": 0, "medium": 1, "high": 2}


def plant_score_for_user(plant, user_light, user_climate, user_maint, user_pets):
    """Ground-truth scoring function we're trying to learn."""
    s = 0
    # Light match (most important)
    if user_light in plant["light"]:
        s += 20
    # Maintenance closeness
    diff = abs(MAINT_MAP[user_maint] - MAINT_MAP[plant["maintenance"]])
    s += max(0, 18 - diff * 6)
    # Air purification
    s += round((plant["airPurification"] / 10.0) * 15)
    # Aesthetics
    s += round((plant["aesthetic"] / 10.0) * 12)
    # Pet safety
    if plant["petSafe"] or not user_pets:
        s += 15
    # Climate
    if user_climate in plant["climate"]:
        s += 10
    else:
        s += 5
    # Popularity
    s += round(((plant["popularity"] - 8) / 2.0) * 10)
    return s


# ── Generate synthetic training data ──────────────────────────────────────────
# Each sample: user preferences → feature vector → target weight importance
def generate_training_data(n=3000):
    X, y = [], []
    for _ in range(n):
        user_light   = random.choice(LIGHT_OPTIONS)
        user_climate = random.choice(CLIMATE_OPTIONS)
        user_maint   = random.choice(MAINT_OPTIONS)
        user_pets    = random.random() < 0.35

        scores = [(p, plant_score_for_user(p, user_light, user_climate, user_maint, user_pets))
                  for p in PLANTS]
        scores.sort(key=lambda x: -x[1])
        top1 = scores[0][0]

        # Features: user preferences one-hot + top plant properties
        feat = [
            int(user_light == "low"),
            int(user_light == "medium"),
            int(user_light == "bright"),
            int(user_climate == "tropical"),
            int(user_climate == "temperate"),
            int(user_climate == "arid"),
            MAINT_MAP[user_maint],
            int(user_pets),
            top1["airPurification"] / 10.0,
            top1["aesthetic"] / 10.0,
            (top1["popularity"] - 8) / 2.0,
            int(top1["petSafe"]),
        ]

        # Target: what score the best plant got — we want to predict importance weights
        target_score = scores[0][1]
        X.append(feat)
        y.append(target_score)

    return np.array(X), np.array(y)


X, y = generate_training_data(3000)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train a decision tree
dt = DecisionTreeRegressor(max_depth=6, min_samples_leaf=10, random_state=42)
dt.fit(X_scaled, y)

cv_scores = cross_val_score(dt, X_scaled, y, cv=5, scoring="r2")
print(f"Cross-validation R² scores: {cv_scores.round(3)}")
print(f"Mean R²: {cv_scores.mean():.3f} ± {cv_scores.std():.3f}")

# ── Extract feature importances → remap to scoring weights ───────────────────
importances = dt.feature_importances_
feature_names = ["light_low","light_med","light_bright",
                 "clim_trop","clim_temp","clim_arid",
                 "maint_level","user_pets",
                 "air_purif","aesthetic","popularity","pet_safe"]

print("\nFeature importances:")
for name, imp in zip(feature_names, importances):
    print(f"  {name:25s}: {imp:.4f}")

# Aggregate light importance (sum of all light variants)
light_imp   = importances[0] + importances[1] + importances[2]
climate_imp = importances[3] + importances[4] + importances[5]
maint_imp   = importances[6]
pets_imp    = importances[7] + importances[11]
air_imp     = importances[8]
aes_imp     = importances[9]
pop_imp     = importances[10]

raw = {"light": light_imp, "climate": climate_imp, "maintenance": maint_imp,
       "pets": pets_imp,   "air": air_imp,          "aesthetic": aes_imp,
       "popularity": pop_imp}

total = sum(raw.values())
# Normalize to a total budget of 100 points (matching original defaults: 20+18+15+12+15+10+10=100)
BUDGET = 100
normed = {k: max(1, round((v / total) * BUDGET)) for k, v in raw.items()}

# Slight correction to ensure sum = 100
diff = BUDGET - sum(normed.values())
keys_by_val = sorted(normed, key=lambda k: -normed[k])
normed[keys_by_val[0]] += diff   # add/remove rounding error from top weight

print("\nLearned weight distribution:")
for k, v in normed.items():
    print(f"  {k:15s}: {v:3d}")
print(f"  Total:          {sum(normed.values())}")

# ── Survival weights (heuristic, informed by feature importances) ─────────────
# Keep survival config close to original but scale bonuses by feature importances
survival_base              = 60
survival_light_bonus       = max(8, min(20, round(light_imp   * 100)))
survival_maint_bonus       = max(6, min(16, round(maint_imp   * 100)))
survival_maint_partial     = max(3, min(8,  round(maint_imp   *  50)))
survival_climate_bonus     = max(5, min(15, round(climate_imp * 100)))
survival_pet_bonus         = max(2, min(6,  round(pets_imp    *  30)))
survival_max               = 98

output = {
    "source": "decision_tree_regressor",
    "model_r2_mean": round(float(cv_scores.mean()), 4),
    "weights": {
        "lightMatch":       normed["light"],
        "maintenanceMatch": normed["maintenance"],
        "airPurification":  normed["air"],
        "aestheticValue":   normed["aesthetic"],
        "petSafety":        normed["pets"],
        "climateMatch":     normed["climate"],
        "popularity":       normed["popularity"]
    },
    "survival": {
        "base":               survival_base,
        "lightBonus":         survival_light_bonus,
        "maintenanceBonus":   survival_maint_bonus,
        "maintenancePartial": survival_maint_partial,
        "climateBonus":       survival_climate_bonus,
        "petBonus":           survival_pet_bonus,
        "max":                survival_max
    }
}

out_path = "src/main/resources/ml_weights.json"
with open(out_path, "w") as f:
    json.dump(output, f, indent=2)

print(f"\nWeights written to {out_path}")
print(json.dumps(output, indent=2))