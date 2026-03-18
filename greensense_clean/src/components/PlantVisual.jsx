// GreenSense — PlantVisual Component
// Circular plant image avatar using real Wikimedia Commons photos.
// Falls back to emoji gradient if the image fails to load.

import React, { useState } from "react";

// Real plant photos from Wikimedia Commons (freely licensed, CC BY-SA)
const PLANT_IMAGES = {
  // Snake Plant — Dracaena trifasciata, CC BY-SA 3.0, Peter A. Mansfeld
  snake_plant:  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg/480px-Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg",
  // Golden Pothos — Epipremnum aureum, CC BY-SA 3.0
  pothos:       "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Epipremnum_aureum_31082012.jpg/480px-Epipremnum_aureum_31082012.jpg",
  // Spider Plant — Chlorophytum comosum, CC BY-SA 3.0, Mokkie
  spider_plant: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Chlorophytum_comosum_%27Vittatum%27_-_variegated_spider_plant.jpg/480px-Chlorophytum_comosum_%27Vittatum%27_-_variegated_spider_plant.jpg",
  // Peace Lily — Spathiphyllum, CC BY-SA 3.0
  peace_lily:   "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Spathiphyllum_cochlearispathum_RTBG.jpg/480px-Spathiphyllum_cochlearispathum_RTBG.jpg",
  // Lavender — Lavandula angustifolia, CC BY-SA 2.0
  lavender:     "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Lavandula_angustifolia_%28Lavender%29_2.jpg/480px-Lavandula_angustifolia_%28Lavender%29_2.jpg",
  // Aloe Vera — Aloe barbadensis, public domain
  aloe_vera:    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aloe_vera_flower_inset.png/480px-Aloe_vera_flower_inset.png",
  // Fiddle Leaf Fig — Ficus lyrata, CC BY-SA 4.0
  fiddle_leaf:  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Ficus_lyrata%2C_fiddle-leaf_fig.jpg/480px-Ficus_lyrata%2C_fiddle-leaf_fig.jpg",
  // Boston Fern — Nephrolepis exaltata, CC BY-SA 3.0
  boston_fern:  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Boston_fern_on_display.jpg/480px-Boston_fern_on_display.jpg",
  // Monstera Deliciosa — CC BY-SA 2.0
  monstera:     "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/A_single_Monstera_deliciosa_leaf.jpg/480px-A_single_Monstera_deliciosa_leaf.jpg",
  // Rubber Plant — Ficus elastica, CC BY-SA 3.0
  rubber_plant: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Ficus_elastica_leaves.jpg/480px-Ficus_elastica_leaves.jpg",
  // ZZ Plant — Zamioculcas zamiifolia, CC BY-SA 3.0
  zz_plant:     "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Zamioculcas_zamiifolia2.jpg/480px-Zamioculcas_zamiifolia2.jpg",
  // Bamboo Palm — Chamaedorea seifrizii, CC BY-SA 3.0
  bamboo_palm:  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Chamaedorea_seifrizii.jpg/480px-Chamaedorea_seifrizii.jpg",
  // Calathea ornata — CC BY-SA 4.0
  calathea:     "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Calathea_ornata_-_Makati.jpg/480px-Calathea_ornata_-_Makati.jpg",
  // Rosemary — Salvia rosmarinus, CC BY-SA 3.0
  rosemary:     "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Rosemary_bush.jpg/480px-Rosemary_bush.jpg",
  // English Ivy — Hedera helix, CC BY-SA 3.0
  english_ivy:  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Hedera_helix_L_250911.jpg/480px-Hedera_helix_L_250911.jpg",
  // Anthurium andraeanum — CC BY-SA 3.0
  anthurium:    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Anthurium_andraeanum_flowers.jpg/480px-Anthurium_andraeanum_flowers.jpg",
};

// Fallback gradient colors per plant (used if image fails to load)
const FALLBACK_COLORS = {
  snake_plant:  ["#2d6a4f", "#52b788"],
  pothos:       ["#40916c", "#74c69d"],
  spider_plant: ["#95d5b2", "#52b788"],
  peace_lily:   ["#1b4332", "#ffffff"],
  lavender:     ["#7b2d8b", "#c77dff"],
  aloe_vera:    ["#2d6a4f", "#95d5b2"],
  fiddle_leaf:  ["#1b4332", "#40916c"],
  boston_fern:  ["#2d6a4f", "#74c69d"],
  monstera:     ["#1b4332", "#52b788"],
  rubber_plant: ["#1a1a2e", "#40916c"],
  zz_plant:     ["#2d6a4f", "#52b788"],
  bamboo_palm:  ["#2d6a4f", "#95d5b2"],
  calathea:     ["#1b4332", "#c77dff"],
  rosemary:     ["#40916c", "#b7e4c7"],
  english_ivy:  ["#2d6a4f", "#52b788"],
  anthurium:    ["#1b4332", "#ff4d6d"],
};

export function PlantVisual({ plant, size = 80 }) {
  const [imgError, setImgError] = useState(false);
  const imgUrl = PLANT_IMAGES[plant.id];
  const [bg, accent] = FALLBACK_COLORS[plant.id] ?? ["#2d6a4f", "#74c69d"];

  if (imgUrl && !imgError) {
    return (
      <div style={{
        width: size, height: size, borderRadius: "50%",
        overflow: "hidden", flexShrink: 0,
        border: `2px solid #52b78860`,
        boxShadow: "0 0 20px #52b78830",
      }}>
        <img
          src={imgUrl}
          alt={plant.name}
          onError={() => setImgError(true)}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    );
  }

  // Emoji gradient fallback
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `radial-gradient(circle at 35% 35%, ${accent}40, ${bg})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.42,
      border: `2px solid ${accent}60`,
      flexShrink: 0,
      boxShadow: `0 0 20px ${accent}30`,
      userSelect: "none",
    }}>
      {plant.emoji}
    </div>
  );
}
