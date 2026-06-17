import { useState, useEffect } from "react";

const CONSENT_KEY = "cookieConsent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (!saved) setVisible(true);
  }, []);

  const saveConsent = (choice) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(choice));
    setVisible(false);
    if (choice.analytics) loadAnalytics();
  };

  const acceptAll = () =>
    saveConsent({ essential: true, analytics: true, marketing: true });

  const rejectAll = () =>
    saveConsent({ essential: true, analytics: false, marketing: false });

  const saveCustom = () =>
    saveConsent({ essential: true, ...preferences });

  const loadAnalytics = () => {
    if (document.getElementById("ga-script")) return; // avoid loading twice
    const s = document.createElement("script");
    s.id = "ga-script";
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=G-TRY7M068FB";
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-TRY7M068FB');
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop for details panel */}
      {showDetails && (
        <div
          onClick={() => setShowDetails(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.3)",
            zIndex: 999,
          }}
        />
      )}

      {/* Main banner */}
      <div
        role="dialog"
        aria-label="Cookie consent"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(560px, calc(100vw - 2rem))",
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          padding: "1.25rem 1.5rem",
          zIndex: 1000,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
          <span style={{ fontSize: "22px" }}>🍪</span>
          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: "0 0 0.25rem",
                fontWeight: 600,
                fontSize: "15px",
                color: "#111",
              }}
            >
              We use cookies
            </p>
            <p
              style={{
                margin: "0 0 1rem",
                fontSize: "13px",
                color: "#6b7280",
                lineHeight: 1.6,
              }}
            >
              We use essential cookies to make our site work, and optional
              cookies to improve your experience.{" "}
              <a
                href="/privacy-policy"
                style={{ color: "#6366f1", textDecoration: "none" }}
              >
                Privacy policy ↗
              </a>
            </p>

            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <button onClick={acceptAll} style={styles.btnPrimary}>
                Accept all
              </button>
              <button onClick={rejectAll} style={styles.btnSecondary}>
                Reject all
              </button>
              <button
                onClick={() => setShowDetails((v) => !v)}
                style={styles.btnGhost}
              >
                Manage preferences
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences panel */}
      {showDetails && (
        <div
          role="dialog"
          aria-label="Cookie preferences"
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            width: "min(360px, calc(100vw - 2rem))",
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.16)",
            padding: "1.5rem",
            zIndex: 1001,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h3
            style={{
              margin: "0 0 1rem",
              fontSize: "15px",
              fontWeight: 600,
              color: "#111",
            }}
          >
            Cookie preferences
          </h3>

          <ToggleRow
            label="Essential"
            description="Required for the site to work"
            checked={true}
            disabled={true}
          />
          <ToggleRow
            label="Analytics"
            description="Help us understand how people use our site"
            checked={preferences.analytics}
            onChange={(v) => setPreferences((p) => ({ ...p, analytics: v }))}
          />
          <ToggleRow
            label="Marketing"
            description="Used to show you relevant ads"
            checked={preferences.marketing}
            onChange={(v) => setPreferences((p) => ({ ...p, marketing: v }))}
          />

          <button onClick={saveCustom} style={{ ...styles.btnPrimary, width: "100%", marginTop: "1rem" }}>
            Save my choices
          </button>
        </div>
      )}
    </>
  );
}

function ToggleRow({ label, description, checked, disabled, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "12px 0",
        borderBottom: "1px solid #f3f4f6",
      }}
    >
      <div style={{ flex: 1, paddingRight: "12px" }}>
        <p style={{ margin: 0, fontSize: "13px", fontWeight: 500, color: "#111" }}>
          {label}{" "}
          {disabled && (
            <span style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 400 }}>
              (always on)
            </span>
          )}
        </p>
        <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#6b7280" }}>
          {description}
        </p>
      </div>
      <label style={{ position: "relative", display: "inline-block", width: "40px", height: "22px", flexShrink: 0, marginTop: "2px" }}>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          style={{ opacity: 0, width: 0, height: 0 }}
        />
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "22px",
            background: checked ? "#6366f1" : "#d1d5db",
            cursor: disabled ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "3px",
            left: checked ? "21px" : "3px",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: "#fff",
            transition: "left 0.2s",
          }}
        />
      </label>
    </div>
  );
}

const styles = {
  btnPrimary: {
    background: "#6366f1",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 18px",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
  },
  btnSecondary: {
    background: "#fff",
    color: "#374151",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "8px 18px",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
  },
  btnGhost: {
    background: "transparent",
    color: "#6b7280",
    border: "none",
    padding: "8px 4px",
    fontSize: "13px",
    cursor: "pointer",
    textDecoration: "underline",
  },
};
