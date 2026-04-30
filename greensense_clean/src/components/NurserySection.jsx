// GreenSense — NurserySection Component
// Shows where to buy a recommended plant, with location, contact & price.

import { useState } from "react";
import { theme }    from "../styles/theme";
import { getNurseriesForPlant } from "../data/nurseries";

// Star rating helper
function Stars({ rating }) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  return (
    <span style={{ fontSize: 11, letterSpacing: 1 }}>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          style={{
            color: i < full ? "#FFD700"
                 : (i === full && half) ? "#FFD700"
                 : "#2a3d2e",
          }}
        >
          {i === full && half ? "½" : "★"}
        </span>
      ))}
      <span style={{ color: theme.colors.textMuted, marginLeft: 4, fontWeight: 600 }}>
        {rating}
      </span>
    </span>
  );
}

// Single nursery card
function NurseryCard({ nursery, index }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(nursery.phone).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Stagger fade-in via inline animation delay
  const animDelay = `${index * 60}ms`;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f1d14 0%, #0a150d 100%)",
        border: `1px solid ${theme.colors.borderLight}`,
        borderRadius: theme.radius.md,
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        animation: `gsNurseryFadeIn 0.35s ease both`,
        animationDelay: animDelay,
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${theme.colors.primary}80`;
        e.currentTarget.style.boxShadow   = `0 0 16px ${theme.colors.primary}18`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = theme.colors.borderLight;
        e.currentTarget.style.boxShadow   = "none";
      }}
    >
      {/* Top row: icon + name + price badge */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <span style={{
          fontSize: 22, lineHeight: 1,
          flexShrink: 0, marginTop: 2,
        }}>
          {nursery.icon}
        </span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 13, fontWeight: 700,
              color: theme.colors.textPrimary,
              fontFamily: theme.fonts.display,
            }}>
              {nursery.name}
            </span>

            {/* Price badge */}
            <div style={{
              background: `${theme.colors.primary}18`,
              border: `1px solid ${theme.colors.primary}50`,
              borderRadius: theme.radius.pill,
              padding: "3px 10px",
              display: "flex", alignItems: "center", gap: 4,
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 10, color: theme.colors.textMuted }}>AVG</span>
              <span style={{
                fontSize: 13, fontWeight: 800,
                color: theme.colors.primary,
              }}>
                ₹{nursery.avgPrice}
              </span>
            </div>
          </div>

          {/* Speciality tag */}
          <span style={{
            fontSize: 10, color: "#74c69d",
            background: "#74c69d12",
            border: "1px solid #74c69d30",
            borderRadius: theme.radius.full,
            padding: "1px 7px",
            display: "inline-block",
            marginTop: 3,
          }}>
            {nursery.speciality}
          </span>
        </div>
      </div>

      {/* Stars */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Stars rating={nursery.rating} />
        <span style={{ fontSize: 10, color: theme.colors.textMuted }}>
          · {nursery.hours}
        </span>
      </div>

      {/* Address */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
        <span style={{ fontSize: 12, flexShrink: 0, marginTop: 1 }}>📍</span>
        <div>
          <div style={{ fontSize: 12, color: "#b7e4c7", lineHeight: 1.4 }}>
            {nursery.address}
          </div>
          <div style={{ fontSize: 11, color: theme.colors.textMuted, marginTop: 2 }}>
            {nursery.area}
          </div>
        </div>
      </div>

      {/* Phone + price range */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 2 }}>
        <button
          onClick={handleCopy}
          style={{
            display: "flex", alignItems: "center", gap: 5,
            background: "transparent", border: "none",
            padding: 0, cursor: "pointer",
          }}
          title="Copy number"
        >
          <span style={{ fontSize: 12 }}>📞</span>
          <span style={{
            fontSize: 12, color: theme.colors.primary,
            fontWeight: 600, textDecoration: "underline",
            textDecorationStyle: "dotted",
            textUnderlineOffset: 3,
          }}>
            {nursery.phone}
          </span>
          <span style={{
            fontSize: 10,
            color: copied ? "#52b788" : theme.colors.textFaint,
            transition: "color 0.2s",
            marginLeft: 2,
          }}>
            {copied ? "✓ copied" : "copy"}
          </span>
        </button>

        <span style={{ fontSize: 10, color: theme.colors.textMuted }}>
          Range: {nursery.priceRange}
        </span>
      </div>
    </div>
  );
}


// ── Main export ──────────────────────────────────────────────────────────────

export function NurserySection({ plantId, plantName }) {
  const [open, setOpen] = useState(false);
  const nurseries       = getNurseriesForPlant(plantId);

  const handleToggle = (e) => {
    e.stopPropagation();   // don't collapse the parent PlantCard
    setOpen((v) => !v);
  };

  return (
    <div style={{ marginTop: 16 }}>
      {/* Section toggle header */}
      <button
        onClick={handleToggle}
        style={{
          width: "100%",
          background: open
            ? `linear-gradient(90deg, ${theme.colors.primary}18, transparent)`
            : `${theme.colors.primary}0a`,
          border: `1px solid ${open ? theme.colors.primary + "50" : theme.colors.borderLight}`,
          borderRadius: theme.radius.sm,
          padding: "10px 14px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => {
          if (!open) e.currentTarget.style.borderColor = `${theme.colors.primary}40`;
        }}
        onMouseLeave={(e) => {
          if (!open) e.currentTarget.style.borderColor = theme.colors.borderLight;
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>🏪</span>
          <span style={{
            fontSize: 12, fontWeight: 700,
            color: theme.colors.primary,
            textTransform: "uppercase", letterSpacing: "0.8px",
          }}>
            Where to Buy — {plantName}
          </span>
          <span style={{
            background: `${theme.colors.primary}25`,
            color: theme.colors.primary,
            fontSize: 10, fontWeight: 700,
            padding: "1px 7px",
            borderRadius: theme.radius.full,
          }}>
            {nurseries.length} nearby
          </span>
        </div>

        <span style={{
          fontSize: 16, color: theme.colors.primary,
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.25s ease",
          display: "inline-block",
        }}>
          ⌄
        </span>
      </button>

      {/* Nursery grid */}
      {open && (
        <>
          {/* Disclaimer */}
          <div style={{
            marginTop: 10, marginBottom: 12,
            padding: "7px 12px",
            background: "#ffffff06",
            border: "1px solid #ffffff10",
            borderRadius: theme.radius.sm,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{ fontSize: 12 }}>ℹ️</span>
            <span style={{ fontSize: 11, color: theme.colors.textMuted, lineHeight: 1.4 }}>
              Prices are approximate. Call ahead to confirm stock & availability.
              Locations are in Pune, Maharashtra.
            </span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 10,
          }}>
            {nurseries.map((n, i) => (
              <NurseryCard key={n.id} nursery={n} index={i} />
            ))}
          </div>

          {/* Footer note */}
          <div style={{
            marginTop: 10, textAlign: "center",
            fontSize: 11, color: theme.colors.textDim,
          }}>
            🌍 Want delivery? Ask these nurseries about WhatsApp orders.
          </div>
        </>
      )}

      {/* Keyframe injection — only once per page */}
      <style>{`
        @keyframes gsNurseryFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
      `}</style>
    </div>
  );
}