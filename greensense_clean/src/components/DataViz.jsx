// GreenSense — DataViz Components
// SurvivalRing: circular SVG progress ring
// ScoreBar: horizontal criterion bar

import React from "react";
import { survivalColor, circleCircumference, toPercent } from "../utils/helpers";
import { theme } from "../styles/theme";

export function SurvivalRing({ pct }) {
  const RADIUS = 22;
  const circ   = circleCircumference(RADIUS);
  const color  = survivalColor(pct);

  return (
    <div style={{ position: "relative", width: 60, height: 60 }}>
      <svg width="60" height="60" viewBox="0 0 60 60" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="30" cy="30" r={RADIUS} fill="none" stroke="#ffffff15" strokeWidth="4" />
        <circle
          cx="30" cy="30" r={RADIUS} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={`${(pct / 100) * circ} ${circ}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1.2s ease" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ color, fontSize: 12, fontWeight: 700 }}>{pct}%</span>
      </div>
    </div>
  );
}

export function ScoreBar({ label, value, max = 20, color = theme.colors.primary }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontSize: 11, color: "#a0a0a0" }}>{label}</span>
        <span style={{ fontSize: 11, color: theme.colors.textPrimary, fontWeight: 600 }}>{value}</span>
      </div>
      <div style={{ height: 4, background: "#ffffff10", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: toPercent(value, max),
          background: color, borderRadius: 2,
          transition: "width 1s ease",
        }} />
      </div>
    </div>
  );
}
