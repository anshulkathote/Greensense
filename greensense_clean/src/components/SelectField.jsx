// GreenSense — SelectField Component
// Pill-button group for single-value selection.

import React from "react";
import { theme } from "../styles/theme";

export function SelectField({ label, icon, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{
        display: "block", fontSize: 12, color: theme.colors.primary,
        textTransform: "uppercase", letterSpacing: "1.5px",
        marginBottom: 8, fontWeight: 600,
      }}>
        {icon} {label}
      </label>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={String(opt.value)}
              onClick={() => onChange(opt.value)}
              style={{
                padding: "10px 18px", borderRadius: theme.radius.pill,
                border: `1.5px solid ${isSelected ? theme.colors.primary : theme.colors.borderLight}`,
                background: isSelected
                  ? `linear-gradient(135deg, ${theme.colors.primaryDark}, ${theme.colors.primaryDeep})`
                  : theme.colors.bgCard,
                color: isSelected ? "#ffffff" : theme.colors.textMuted,
                cursor: "pointer", fontSize: 13,
                fontWeight: isSelected ? 700 : 400,
                fontFamily: theme.fonts.body,
                transition: "all 0.2s ease",
                boxShadow: isSelected ? `0 0 12px ${theme.colors.primary}40` : "none",
              }}
            >
              {opt.icon} {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}