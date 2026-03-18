// GreenSense — ResultsPage
// Displays ranked plant recommendations with full detail cards.

import React, { useState }   from "react";
import { PlantCard }          from "../components/PlantCard";
import { useParticleCanvas }  from "../utils/useParticleCanvas";
import { formatRoomLabel }    from "../utils/helpers";
import { theme }              from "../styles/theme";

export function ResultsPage({ results, form, totalPlants, compatibleCount, onBack }) {
  const [expanded, setExpanded] = useState(null);
  const canvasRef = useParticleCanvas();

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #030d06 0%, #081409 40%, #040e07 100%)",
      fontFamily: theme.fonts.body, color: theme.colors.textPrimary,
      position: "relative", overflow: "hidden",
    }}>
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 20px 60px", position: "relative", zIndex: 1 }}>
        <div style={{ paddingTop: 40, marginBottom: 28 }}>
          <button onClick={onBack} style={{
            background: "transparent", border: `1px solid ${theme.colors.borderLight}`,
            color: theme.colors.primary, padding: "8px 16px",
            borderRadius: theme.radius.pill, cursor: "pointer",
            fontSize: 12, marginBottom: 24, fontFamily: theme.fonts.body,
          }}>
            ← Adjust Inputs
          </button>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h2 style={{
                margin: 0, fontSize: 28, fontWeight: 800,
                fontFamily: theme.fonts.display,
                background: "linear-gradient(135deg, #95d5b2, #52b788)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                Your Recommendations
              </h2>
              <p style={{ fontSize: 13, color: theme.colors.textFaint, marginTop: 4 }}>
                Analyzed {totalPlants} plants → {compatibleCount} compatible → top {results.length} ranked
              </p>
            </div>

            <div style={{
              background: theme.colors.bgCard, border: `1px solid ${theme.colors.borderLight}`,
              borderRadius: theme.radius.md, padding: "12px 20px",
              fontSize: 12, color: theme.colors.textMuted, lineHeight: 1.8,
            }}>
              <div>📍 {formatRoomLabel(form.roomType)} &nbsp;|&nbsp; ☀️ {form.light} light</div>
              <div>🌡️ {form.climate} &nbsp;|&nbsp; 🔧 {form.maintenance} maint. &nbsp;|&nbsp; 🐾 pets: {form.hasPets ? "yes" : "no"}</div>
            </div>
          </div>
        </div>

        {results.length === 0 ? (
          <div style={{
            textAlign: "center", padding: 60,
            background: theme.colors.bgCard, borderRadius: theme.radius.lg,
            border: `1px dashed ${theme.colors.borderLight}`,
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🌵</div>
            <h3 style={{ color: theme.colors.primary }}>No Perfect Matches Found</h3>
            <p style={{ color: theme.colors.textFaint, fontSize: 14 }}>
              Try adjusting your light level, climate, or removing pet restrictions.
            </p>
            <button onClick={onBack} style={{
              marginTop: 16, padding: "10px 24px",
              background: theme.colors.primaryDeep, border: `1px solid ${theme.colors.primary}`,
              borderRadius: theme.radius.pill, color: theme.colors.primary,
              cursor: "pointer", fontFamily: theme.fonts.body,
            }}>
              Adjust Inputs
            </button>
          </div>
        ) : (
          results.map((plant, i) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              rank={i}
              isExpanded={expanded === plant.id}
              onToggle={() => toggle(plant.id)}
            />
          ))
        )}

        {results.length > 0 && (
          <div style={{
            marginTop: 24, padding: "16px 20px",
            background: theme.colors.bgCard, borderRadius: theme.radius.md,
            border: `1px solid ${theme.colors.border}`,
            fontSize: 12, color: theme.colors.textFaint, lineHeight: 1.8,
          }}>
            <strong style={{ color: theme.colors.primary }}>🧠 About the Decision Engine: </strong>
            4-stage pipeline — (1) context-aware filtering eliminated incompatible plants,
            (2) multi-criteria scoring weighted 7 criteria, (3) plants ranked by composite score,
            (4) natural-language explanations generated from scoring logic for full transparency.
          </div>
        )}
      </div>
    </div>
  );
}
