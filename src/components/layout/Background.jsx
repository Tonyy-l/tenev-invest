const sectionBackgroundVariants = {
  sandstone: {
    shell: "bg-[#ddd4c7]",
    glow:
      "bg-[radial-gradient(circle_at_top_left,rgba(196,151,91,0.24),transparent_30%),radial-gradient(circle_at_center_right,rgba(214,120,47,0.16),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(74,60,44,0.10),transparent_24%),linear-gradient(180deg,#efe6d8_0%,#ddd4c7_48%,#cfc6bb_100%)]",
    topShade: "",
  },
  warmSteel: {
    shell: "bg-[#d7d2ca]",
    glow:
      "bg-[radial-gradient(circle_at_top_left,rgba(196,151,91,0.22),transparent_28%),radial-gradient(circle_at_center_right,rgba(210,122,52,0.18),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(87,79,70,0.14),transparent_26%),linear-gradient(180deg,#ebe5db_0%,#d7d2ca_48%,#c8beb1_100%)]",
    topShade: "",
  },
  graphiteGold: {
    shell: "bg-[#d1cbc2]",
    glow:
      "bg-[radial-gradient(circle_at_top_left,rgba(196,151,91,0.26),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(86,79,72,0.16),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(214,120,47,0.14),transparent_26%),linear-gradient(180deg,#e6e0d6_0%,#d1cbc2_50%,#beb4a7_100%)]",
    topShade: "",
  },
};

const activeSectionBackground = sectionBackgroundVariants.warmSteel;

export function SharedSectionsBackground({ children }) {
  return (
    <div className={`relative -mt-8 overflow-hidden pt-8 ${activeSectionBackground.shell}`}>
      <div className={`pointer-events-none absolute inset-0 opacity-80 ${activeSectionBackground.glow}`} />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-56 bg-[linear-gradient(180deg,rgba(172,163,149,0.34)_0%,rgba(172,163,149,0.18)_34%,rgba(172,163,149,0.06)_62%,rgba(172,163,149,0)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.02)_44%,rgba(43,36,29,0.05)_100%)]" />
      {activeSectionBackground.topShade ? (
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-28 ${activeSectionBackground.topShade}`}
        />
      ) : null}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function Background() {
  return <div className="fixed inset-0 -z-20 bg-[linear-gradient(180deg,#f4efe6_0%,#ece5da_100%)]" />;
}
