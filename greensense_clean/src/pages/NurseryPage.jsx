// GreenSense — NurseryPage
// Light-themed dedicated page showing nearby nurseries for each recommended plant.

import { useState } from "react";
import { getNurseriesForPlant } from "../data/nurseries";

// ─── Design tokens (light theme) ────────────────────────────────────────────
const lt = {
  bg:          "#f7faf8",
  bgCard:      "#ffffff",
  bgHover:     "#f0f7f3",
  border:      "#d1e8da",
  borderStrong:"#a8d5b8",
  primary:     "#2d6a4f",
  primaryMid:  "#40916c",
  primaryLight:"#74c69d",
  accent:      "#52b788",
  textHead:    "#1b3a2d",
  textBody:    "#2d4a38",
  textMuted:   "#6b8f7a",
  textFaint:   "#9ab8a8",
  shadow:      "0 2px 12px rgba(45,106,79,0.10)",
  shadowHover: "0 6px 24px rgba(45,106,79,0.16)",
  radius:      { sm: 8, md: 12, lg: 16, pill: 999 },
  fonts: {
    display: "'Playfair Display', Georgia, serif",
    body:    "'DM Sans', 'Segoe UI', sans-serif",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <span style={{ fontSize: 13, letterSpacing: 1 }}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ color: i < Math.round(rating) ? "#f59e0b" : "#d1e8da" }}>★</span>
      ))}
    </span>
  );
}

// ─── Plant selector tab ──────────────────────────────────────────────────────
function PlantTab({ plant, active, onClick, rank }) {
  const rankColors = ["#d97706", "#6b7280", "#b45309", lt.accent, lt.accent];
  const rc = rankColors[rank] ?? lt.accent;
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "12px 18px",
        background: active ? lt.bgCard : "transparent",
        border: `1.5px solid ${active ? lt.accent : "transparent"}`,
        borderRadius: lt.radius.md,
        cursor: "pointer",
        transition: "all 0.2s",
        boxShadow: active ? lt.shadow : "none",
        textAlign: "left",
        width: "100%",
      }}
    >
      <div style={{
        width: 26, height: 26, borderRadius: "50%",
        background: `${rc}18`, border: `1.5px solid ${rc}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 800, color: rc, flexShrink: 0,
      }}>
        {rank + 1}
      </div>
      <div style={{ fontSize: 20, flexShrink: 0 }}>{plant.emoji || "🌿"}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontSize: 13, fontWeight: 700,
          color: active ? lt.primary : lt.textBody,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          fontFamily: lt.fonts.body,
        }}>
          {plant.name}
        </div>
        <div style={{ fontSize: 10, color: lt.textMuted }}>Score: {plant.finalScore} pts</div>
      </div>
    </button>
  );
}

// ─── Single nursery card ─────────────────────────────────────────────────────
function NurseryCard({ nursery, index }) {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [hovered, setHovered]         = useState(false);

  const copyPhone = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(nursery.phone).catch(() => {});
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 1800);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: lt.bgCard,
        border: `1.5px solid ${hovered ? lt.accent : lt.border}`,
        borderRadius: lt.radius.lg,
        padding: "20px",
        boxShadow: hovered ? lt.shadowHover : lt.shadow,
        transition: "all 0.22s ease",
        transform: hovered ? "translateY(-3px)" : "none",
        animation: `nurseryIn 0.3s ease both`,
        animationDelay: `${index * 70}ms`,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{
          width: 46, height: 46, borderRadius: lt.radius.md,
          background: `${lt.accent}15`,
          border: `1px solid ${lt.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, flexShrink: 0,
        }}>
          {nursery.icon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 15, fontWeight: 700,
              color: lt.textHead, fontFamily: lt.fonts.body,
            }}>
              {nursery.name}
            </span>
            <span style={{
              fontSize: 10, fontWeight: 700,
              background: `${nursery.badgeColor}18`,
              color: nursery.badgeColor,
              border: `1px solid ${nursery.badgeColor}40`,
              borderRadius: lt.radius.pill,
              padding: "2px 8px",
            }}>
              {nursery.badge}
            </span>
          </div>
          <div style={{ fontSize: 11, color: lt.textMuted, marginTop: 2 }}>
            {nursery.speciality}
          </div>
        </div>

        {/* Price pill */}
        <div style={{
          flexShrink: 0,
          background: `${lt.primary}10`,
          border: `1.5px solid ${lt.accent}60`,
          borderRadius: lt.radius.md,
          padding: "6px 12px",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 9, color: lt.textMuted, fontWeight: 600, letterSpacing: 1 }}>AVG PRICE</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: lt.primary }}>₹{nursery.avgPrice}</div>
          <div style={{ fontSize: 9, color: lt.textFaint }}>{nursery.priceRange}</div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: lt.border }} />

      {/* Rating + hours */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Stars rating={nursery.rating} />
          <span style={{ fontSize: 13, fontWeight: 700, color: lt.textHead }}>{nursery.rating}</span>
          <span style={{ fontSize: 11, color: lt.textMuted }}>({nursery.reviews} reviews)</span>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 5,
          background: "#f0fdf4", border: "1px solid #bbf7d0",
          borderRadius: lt.radius.pill, padding: "3px 10px",
        }}>
          <span style={{ fontSize: 12 }}>🕐</span>
          <span style={{ fontSize: 11, color: "#15803d", fontWeight: 600 }}>{nursery.hours}</span>
        </div>
      </div>

      {/* Address */}
      <div style={{
        display: "flex", gap: 8,
        background: lt.bg, borderRadius: lt.radius.sm,
        padding: "10px 12px",
        border: `1px solid ${lt.border}`,
      }}>
        <span style={{ fontSize: 14, flexShrink: 0 }}>📍</span>
        <div>
          <div style={{ fontSize: 12, color: lt.textBody, lineHeight: 1.5 }}>{nursery.address}</div>
          <div style={{ fontSize: 11, color: lt.textMuted, marginTop: 2, fontWeight: 600 }}>{nursery.area}, Pune</div>
        </div>
      </div>

      {/* Action row */}
      <div style={{ display: "flex", gap: 8 }}>
        {/* Phone */}
        <button
          onClick={copyPhone}
          style={{
            flex: 1,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            background: copiedPhone ? "#f0fdf4" : lt.bgCard,
            border: `1.5px solid ${copiedPhone ? "#86efac" : lt.border}`,
            borderRadius: lt.radius.sm,
            padding: "9px 12px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <span style={{ fontSize: 14 }}>{copiedPhone ? "✅" : "📞"}</span>
          <span style={{
            fontSize: 12, fontWeight: 600,
            color: copiedPhone ? "#16a34a" : lt.primaryMid,
          }}>
            {copiedPhone ? "Copied!" : nursery.phone}
          </span>
        </button>

        {/* Map link */}
        <a
          href={nursery.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            background: lt.primary,
            color: "#fff",
            border: "none",
            borderRadius: lt.radius.sm,
            padding: "9px 16px",
            fontSize: 12, fontWeight: 700,
            cursor: "pointer",
            textDecoration: "none",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = lt.primaryMid}
          onMouseLeave={(e) => e.currentTarget.style.background = lt.primary}
        >
          <span>🗺️</span> Directions
        </a>
      </div>
    </div>
  );
}

// ─── Main NurseryPage ────────────────────────────────────────────────────────
export function NurseryPage({ results, onBack }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activePlant = results[activeIdx];
  const nurseries   = activePlant ? getNurseriesForPlant(activePlant.id) : [];

  // Price stats
  const prices    = nurseries.map((n) => n.avgPrice);
  const minPrice  = Math.min(...prices);
  const maxPrice  = Math.max(...prices);
  const avgPrice  = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length / 5) * 5;
  const cheapest  = nurseries.find((n) => n.avgPrice === minPrice);

  return (
    <div style={{
      minHeight: "100vh",
      background: lt.bg,
      fontFamily: lt.fonts.body,
      color: lt.textBody,
    }}>
      {/* Top nav bar */}
      <div style={{
        background: "#ffffff",
        borderBottom: `1px solid ${lt.border}`,
        padding: "0 24px",
        display: "flex", alignItems: "center", gap: 16,
        height: 60,
        position: "sticky", top: 0, zIndex: 10,
        boxShadow: "0 1px 8px rgba(45,106,79,0.07)",
      }}>
        <button
          onClick={onBack}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "transparent", border: `1.5px solid ${lt.border}`,
            borderRadius: lt.radius.pill, padding: "6px 14px",
            fontSize: 12, fontWeight: 600, color: lt.primary,
            cursor: "pointer", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = lt.bgHover; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          ← Back to Results
        </button>

        <div style={{ width: 1, height: 28, background: lt.border }} />

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20 }}>🏪</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: lt.textHead, fontFamily: lt.fonts.display }}>
              Find Nearby Nurseries
            </div>
            <div style={{ fontSize: 10, color: lt.textMuted }}>Pune, Maharashtra · {nurseries.length} locations</div>
          </div>
        </div>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: lt.textFaint }}>ℹ️</span>
          <span style={{ fontSize: 11, color: lt.textFaint }}>Prices are approximate. Call ahead to confirm stock.</span>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px 60px", display: "flex", gap: 24, alignItems: "flex-start" }}>

        {/* ── Left sidebar: plant tabs ── */}
        <div style={{
          width: 210, flexShrink: 0,
          position: "sticky", top: 80,
        }}>
          <div style={{
            background: lt.bgCard,
            border: `1px solid ${lt.border}`,
            borderRadius: lt.radius.lg,
            padding: 12,
            boxShadow: lt.shadow,
          }}>
            <div style={{
              fontSize: 10, fontWeight: 700, color: lt.textMuted,
              letterSpacing: 1, textTransform: "uppercase",
              padding: "0 6px 10px",
              borderBottom: `1px solid ${lt.border}`,
              marginBottom: 8,
            }}>
              Your Recommended Plants
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {results.map((plant, i) => (
                <PlantTab
                  key={plant.id}
                  plant={plant}
                  rank={i}
                  active={i === activeIdx}
                  onClick={() => setActiveIdx(i)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Right main area ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Plant hero header */}
          {activePlant && (
            <div style={{
              background: lt.bgCard,
              border: `1.5px solid ${lt.border}`,
              borderRadius: lt.radius.lg,
              padding: "20px 24px",
              marginBottom: 20,
              boxShadow: lt.shadow,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: 16,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: lt.radius.md,
                  background: `${lt.accent}15`, border: `1.5px solid ${lt.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 30,
                }}>
                  {activePlant.emoji || "🌿"}
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: lt.textHead, fontFamily: lt.fonts.display }}>
                    {activePlant.name}
                  </h2>
                  <div style={{ fontSize: 12, color: lt.textMuted, fontStyle: "italic" }}>
                    {activePlant.scientificName}
                  </div>
                </div>
              </div>

              {/* Price summary chips */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[
                  { label: "Lowest", value: `₹${minPrice}`, color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
                  { label: "Average", value: `₹${avgPrice}`, color: lt.primary, bg: `${lt.accent}10`, border: lt.borderStrong },
                  { label: "Highest", value: `₹${maxPrice}`, color: "#b45309", bg: "#fffbeb", border: "#fde68a" },
                ].map(({ label, value, color, bg, border }) => (
                  <div key={label} style={{
                    background: bg, border: `1px solid ${border}`,
                    borderRadius: lt.radius.md, padding: "8px 14px",
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: 9, color, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{label}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Best deal callout */}
          {cheapest && (
            <div style={{
              background: "#f0fdf4",
              border: "1.5px solid #86efac",
              borderRadius: lt.radius.md,
              padding: "11px 16px",
              marginBottom: 20,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ fontSize: 18 }}>💡</span>
              <span style={{ fontSize: 13, color: "#15803d" }}>
                <strong>Best deal:</strong> {cheapest.name} in {cheapest.area} has the lowest price at{" "}
                <strong>₹{cheapest.avgPrice}</strong> on average.
              </span>
            </div>
          )}

          {/* Nursery grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 16,
          }}>
            {nurseries.map((n, i) => (
              <NurseryCard key={n.id} nursery={n} index={i} />
            ))}
          </div>

          {/* Footer tip */}
          <div style={{
            marginTop: 24, padding: "14px 18px",
            background: lt.bgCard, border: `1px solid ${lt.border}`,
            borderRadius: lt.radius.md,
            display: "flex", alignItems: "flex-start", gap: 10,
          }}>
            <span style={{ fontSize: 18 }}>🚚</span>
            <div style={{ fontSize: 12, color: lt.textMuted, lineHeight: 1.7 }}>
              <strong style={{ color: lt.textBody }}>Pro tip:</strong> Many Pune nurseries offer WhatsApp ordering and home delivery for orders above ₹500.
              Call ahead to confirm plant availability — stock changes frequently, especially for rare varieties.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes nurseryIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}