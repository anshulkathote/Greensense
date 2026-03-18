// GreenSense — PlantCard Component
// Expandable recommendation card showing full plant details.

import React from "react";
import { PlantVisual }            from "./PlantVisual";
import { SurvivalRing, ScoreBar } from "./DataViz";
import { rankColor }              from "../utils/helpers";
import { theme }                  from "../styles/theme";

export function PlantCard({ plant, rank, isExpanded, onToggle }) {
  const rColor = rankColor(rank);

  return (
    <div
      onClick={onToggle}
      style={{
        background: isExpanded
          ? "linear-gradient(135deg, #1a2e22 0%, #0f1d14 100%)"
          : "linear-gradient(135deg, #141f17 0%, #0a120c 100%)",
        border: `1px solid ${isExpanded ? theme.colors.primary : theme.colors.borderLight}`,
        borderRadius: theme.radius.lg,
        padding: "20px 24px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        marginBottom: 12,
        boxShadow: isExpanded ? theme.shadows.card : "none",
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Rank badge */}
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: `${rColor}20`, border: `2px solid ${rColor}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 800, color: rColor, flexShrink: 0,
        }}>
          {rank + 1}
        </div>

        <PlantVisual plant={plant} size={56} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <h3 style={{
              margin: 0, fontSize: 18, fontWeight: 700,
              color: theme.colors.textPrimary,
              fontFamily: theme.fonts.display,
            }}>
              {plant.name}
            </h3>
            <span style={{
              background: `${theme.colors.primary}20`, color: theme.colors.primary,
              fontSize: 10, padding: "2px 8px", borderRadius: theme.radius.full,
              border: `1px solid ${theme.colors.primary}40`, fontWeight: 600,
            }}>
              {plant.primaryStrength}
            </span>
            {plant.petSafe && (
              <span style={{
                background: "#52b78820", color: "#52b788",
                fontSize: 10, padding: "2px 8px", borderRadius: theme.radius.full,
                border: "1px solid #52b78840", fontWeight: 600,
              }}>
                🐾 PET SAFE
              </span>
            )}
          </div>
          <div style={{ fontSize: 12, color: theme.colors.textMuted, fontStyle: "italic", marginTop: 2 }}>
            {plant.scientificName}
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
            {plant.tags.slice(0, 3).map((tag) => (
              <span key={tag} style={{
                background: "#2a4d33", color: "#95d5b2",
                fontSize: 10, padding: "2px 8px", borderRadius: theme.radius.full,
              }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 }}>
          <SurvivalRing pct={plant.survivalProbability} />
          <span style={{ fontSize: 9, color: theme.colors.textMuted }}>SURVIVAL</span>
        </div>

        <div style={{
          fontSize: 22, color: theme.colors.primary,
          transition: "transform 0.3s",
          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
        }}>⌄</div>
      </div>

      {/* AI Explanation */}
      <div style={{
        marginTop: 12, padding: "10px 14px",
        background: `${theme.colors.primary}10`, borderRadius: theme.radius.sm,
        borderLeft: `3px solid ${theme.colors.primary}`,
      }}>
        <span style={{ fontSize: 11, color: theme.colors.primary, fontWeight: 600 }}>🤖 AI REASONING  </span>
        <span style={{ fontSize: 12, color: "#b7e4c7", lineHeight: 1.6 }}>{plant.explanation}</span>
      </div>

      {/* Expanded details */}
      {isExpanded && (
        <div style={{ marginTop: 20, borderTop: `1px solid ${theme.colors.borderLight}`, paddingTop: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Benefits */}
            <div>
              <h4 style={{ margin: "0 0 10px", fontSize: 13, color: theme.colors.primary, textTransform: "uppercase", letterSpacing: "1px" }}>
                ✨ Benefits
              </h4>
              {plant.benefits.map((b) => (
                <div key={b} style={{ fontSize: 12, color: "#b7e4c7", padding: "4px 0", borderBottom: "1px solid #ffffff08" }}>
                  • {b}
                </div>
              ))}
            </div>

            {/* Care Guide */}
            <div>
              <h4 style={{ margin: "0 0 10px", fontSize: 13, color: theme.colors.primary, textTransform: "uppercase", letterSpacing: "1px" }}>
                🌿 Care Guide
              </h4>
              <div style={{ fontSize: 12, color: "#b7e4c7", lineHeight: 2 }}>
                <div>💧 <strong style={{ color: theme.colors.textPrimary }}>Water:</strong> {plant.care.watering}</div>
                <div>☀️ <strong style={{ color: theme.colors.textPrimary }}>Light:</strong> {plant.care.sunlight}</div>
                <div>💦 <strong style={{ color: theme.colors.textPrimary }}>Humidity:</strong> {plant.care.humidity}</div>
              </div>
            </div>
          </div>

          {/* Score Breakdown */}
          <div style={{ marginTop: 16 }}>
            <h4 style={{ margin: "0 0 12px", fontSize: 13, color: theme.colors.primary, textTransform: "uppercase", letterSpacing: "1px" }}>
              📊 Score Breakdown
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 24px" }}>
              <ScoreBar label="Light Match"      value={plant.scoreBreakdown.lightMatch}      max={20} color="#74c69d" />
              <ScoreBar label="Maintenance Fit"  value={plant.scoreBreakdown.maintenanceMatch} max={18} color="#52b788" />
              <ScoreBar label="Air Purification" value={plant.scoreBreakdown.airPurification}  max={15} color="#40916c" />
              <ScoreBar label="Aesthetics"       value={plant.scoreBreakdown.aestheticValue}   max={12} color="#95d5b2" />
              <ScoreBar label="Pet Safety"       value={plant.scoreBreakdown.petSafety}        max={15} color="#b7e4c7" />
              <ScoreBar label="Climate Fit"      value={plant.scoreBreakdown.climateMatch}     max={10} color="#d8f3dc" />
            </div>
          </div>

          {/* Risk note */}
          {plant.riskNote && (
            <div style={{
              marginTop: 14, padding: "10px 14px",
              background: "#e6394620", border: "1px solid #e6394640",
              borderRadius: theme.radius.sm,
            }}>
              <span style={{ fontSize: 12, color: "#ffb3b8" }}>{plant.riskNote}</span>
            </div>
          )}

          {/* Community rating */}
          <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, color: "#a0a0a0" }}>Community Rating</span>
              <div style={{ display: "flex", gap: 2 }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: i < Math.round(plant.popularityScore / 2) ? "#FFD700" : "#2a3d2e", fontSize: 14 }}>★</span>
                ))}
              </div>
              <span style={{ fontSize: 13, color: theme.colors.textPrimary, fontWeight: 700 }}>{plant.popularityScore}/10</span>
            </div>
            <div style={{
              background: `${theme.colors.primary}20`, border: `1px solid ${theme.colors.primary}40`,
              borderRadius: theme.radius.sm, padding: "4px 12px",
              fontSize: 12, color: theme.colors.primary, fontWeight: 600,
            }}>
              Score: {plant.finalScore} pts
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
