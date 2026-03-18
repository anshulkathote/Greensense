// GreenSense — LoadingPage
// Animated analysis screen showing the AI pipeline stages.

import React from "react";
import { useParticleCanvas } from "../utils/useParticleCanvas";
import { staggerDelay }      from "../utils/helpers";
import { theme }             from "../styles/theme";

const PIPELINE_STAGES = [
  "Parsing environmental parameters...",
  "Filtering incompatible species...",
  "Running multi-criteria scoring...",
  "Generating AI explanations...",
  "Ranking final recommendations...",
];

export function LoadingPage() {
  const canvasRef = useParticleCanvas();

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #030d06 0%, #081409 40%, #040e07 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: theme.fonts.body,
    }}>
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />

      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <style>{`
          @keyframes spin   { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
          @keyframes fadeIn { to { opacity: 1 } }
        `}</style>

        <div style={{ fontSize: 64, marginBottom: 24, display: "inline-block", animation: "spin 3s linear infinite" }}>
          🌱
        </div>

        <h2 style={{
          fontFamily: theme.fonts.display, fontSize: 24,
          background: "linear-gradient(135deg, #95d5b2, #52b788)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          marginBottom: 32,
        }}>
          Analyzing Your Environment
        </h2>

        {PIPELINE_STAGES.map((stage, i) => (
          <div key={stage} style={{
            fontSize: 13, color: theme.colors.primary, padding: "6px 0",
            opacity: 0, animation: `fadeIn 0.5s ${staggerDelay(i)} forwards`,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <span style={{ color: theme.colors.primaryDeep }}>◆</span>
            {stage}
          </div>
        ))}
      </div>
    </div>
  );
}
