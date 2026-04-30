// GreenSense — FormPage
// Environment configuration form with live compatibility counter.

import React from "react";
import { SelectField }       from "../components/SelectField";
import { useParticleCanvas } from "../utils/useParticleCanvas";
import { theme }             from "../styles/theme";
import { ROOM_OPTIONS, LIGHT_OPTIONS, CLIMATE_OPTIONS, MAINTENANCE_OPTIONS, PET_OPTIONS } from "../data/constants";

export function FormPage({ form, setForm, onAnalyze, compatibleCount, totalPlants, error }) {
  const canvasRef = useParticleCanvas();
  const set = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }));
  const fillPct = (compatibleCount / totalPlants) * 100;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #f0f7f3 0%, #e8f5ee 40%, #f4faf7 100%)",
      fontFamily: theme.fonts.body, color: theme.colors.textPrimary,
      position: "relative", overflow: "hidden",
    }}>
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 20px 80px", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ paddingTop: 48, marginBottom: 32, textAlign: "center" }}>
          <span style={{ fontSize: 36 }}>🌿</span>
          <h2 style={{
            margin: "8px 0 6px", fontFamily: theme.fonts.display, fontSize: 28,
            background: "linear-gradient(135deg, #95d5b2, #52b788)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Environment Analysis
          </h2>
          <p style={{ fontSize: 13, color: theme.colors.textFaint }}>
            Configure your space — the AI engine adapts in real-time
          </p>
        </div>

        {/* Live filter indicator */}
        <div style={{
          background: theme.colors.bgInput, border: `1px solid ${theme.colors.borderLight}`,
          borderRadius: theme.radius.md, padding: "14px 20px", marginBottom: 28,
          display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
        }}>
          <span style={{ fontSize: 12, color: theme.colors.primary, fontWeight: 600 }}>🔍 LIVE FILTER</span>
          <span style={{ fontSize: 13, color: theme.colors.primaryLight }}>{compatibleCount} plants compatible with current settings</span>
          <div style={{ flex: 1, height: 6, background: "#ddf0e6", borderRadius: 3, minWidth: 80 }}>
            <div style={{
              height: "100%", width: `${fillPct}%`,
              background: "linear-gradient(90deg, #2d6a4f, #52b788)",
              borderRadius: 3, transition: "width 0.4s ease",
            }} />
          </div>
        </div>

        {/* Form card */}
        <div style={{
          background: "linear-gradient(135deg, #ffffff, #f7fbf9)",
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.radius.xl, padding: "32px 28px",
        }}>
          <SelectField label="Room Type"              icon="🏠" value={form.roomType}    onChange={set("roomType")}    options={ROOM_OPTIONS}        />
          <SelectField label="Light Availability"     icon="☀️" value={form.light}       onChange={set("light")}       options={LIGHT_OPTIONS}       />
          <SelectField label="Climate / Region"       icon="🌡️" value={form.climate}     onChange={set("climate")}     options={CLIMATE_OPTIONS}     />
          <SelectField label="Maintenance Preference" icon="🔧" value={form.maintenance} onChange={set("maintenance")} options={MAINTENANCE_OPTIONS} />
          <SelectField label="Pets in Home"           icon="🐾" value={form.hasPets}     onChange={set("hasPets")}     options={PET_OPTIONS}         />
        </div>

        {/* Error banner */}
        {error && (
          <div style={{
            marginTop: 16, padding: "12px 16px",
            background: "#e6394620", border: "1px solid #e6394680",
            borderRadius: theme.radius.md,
            fontSize: 13, color: "#ffb3b8",
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Submit button */}
        <button onClick={onAnalyze} style={{
          width: "100%", marginTop: 20, padding: "18px",
          fontSize: 16, fontWeight: 700, letterSpacing: "1px",
          background: "linear-gradient(135deg, #2d6a4f, #1b4332)",
          color: "#d8f3dc", border: "2px solid #52b788",
          borderRadius: theme.radius.lg, cursor: "pointer",
          boxShadow: theme.shadows.glow, transition: "all 0.3s ease",
          fontFamily: theme.fonts.body,
        }}>
          🌿 Analyze & Recommend Plants →
        </button>
      </div>
    </div>
  );
}