// GreenSense — IntroPage
// Landing screen with brand identity and feature highlights.

import React from "react";
import { useParticleCanvas } from "../utils/useParticleCanvas";
import { theme }             from "../styles/theme";

const FEATURE_BADGES = [
  ["🧠", "Multi-criteria AI scoring"],
  ["🔍", "Context-aware filtering"],
  ["📊", "Ranked recommendations"],
  ["💬", "Explainable reasoning"],
];

export function IntroPage({ onStart, totalPlants }) {
  const canvasRef = useParticleCanvas();

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #f0f7f3 0%, #e8f5ee 40%, #f4faf7 100%)",
      fontFamily: theme.fonts.body, color: theme.colors.textPrimary,
      position: "relative", overflow: "hidden",
    }}>
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />

      <div style={{
        maxWidth: 760, margin: "0 auto", padding: "80px 24px 60px",
        textAlign: "center", position: "relative", zIndex: 1,
      }}>
        <div style={{ fontSize: 72, marginBottom: 16, lineHeight: 1 }}>🌿</div>

        <h1 style={{
          fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, margin: "0 0 12px",
          fontFamily: theme.fonts.display,
          background: "linear-gradient(135deg, #95d5b2, #52b788, #40916c)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          lineHeight: 1.1,
        }}>
          GreenSense
        </h1>

        <p style={{ fontSize: 18, color: theme.colors.primaryLight, marginBottom: 8, letterSpacing: "0.5px" }}>
          AI-Based Smart Plant Placement & Recommendation
        </p>
        <p style={{ fontSize: 14, color: theme.colors.textFaint, maxWidth: 480, margin: "0 auto 48px", lineHeight: 1.8 }}>
          An intelligent decision-support system that analyzes your living environment
          and recommends the most compatible plants — with full reasoning, care guidance,
          and survival probability estimates.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
          {FEATURE_BADGES.map(([icon, label]) => (
            <div key={label} style={{
              background: theme.colors.bgCard, border: `1px solid ${theme.colors.borderLight}`,
              borderRadius: theme.radius.pill, padding: "8px 16px",
              fontSize: 12, color: theme.colors.primaryLight,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span>{icon}</span><span>{label}</span>
            </div>
          ))}
        </div>

        <button onClick={onStart} style={{
          padding: "16px 48px", fontSize: 16, fontWeight: 700,
          background: "linear-gradient(135deg, #2d6a4f, #1b4332)",
          color: "#d8f3dc", border: "2px solid #52b788",
          borderRadius: theme.radius.pill, cursor: "pointer",
          letterSpacing: "1px", boxShadow: theme.shadows.glowStrong,
          transition: "all 0.3s ease", fontFamily: theme.fonts.body,
        }}>
          Begin Analysis →
        </button>

        <p style={{ marginTop: 16, fontSize: 12, color: theme.colors.textDim }}>
          {totalPlants} plants in knowledge base • Intelligent decision engine
        </p>
      </div>
    </div>
  );
}