import { useEffect, useState } from "react";
import { scrollToSection } from "../../utils/scrollToSection";

function Navbar({ data }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const inspectionFormHref = "#inspection-form";

  const closeMenu = () => setIsMenuOpen(false);
  const handleSectionClick = (targetId, shouldCloseMenu = false) => (event) => {
    event.preventDefault();
    scrollToSection(targetId);
    setActiveHref(targetId);

    if (shouldCloseMenu) {
      closeMenu();
    }
  };

  useEffect(() => {
    const sectionIds = data.links.map((link) => link.href.replace(/^#/, ""));

    const updateActiveSection = () => {
      const offset = 160;
      let currentHref = "";

      for (const link of data.links) {
        const section = document.getElementById(link.href.replace(/^#/, ""));

        if (!section) {
          continue;
        }

        const { top, bottom } = section.getBoundingClientRect();

        if (top <= offset && bottom > offset) {
          currentHref = link.href;
          break;
        }
      }

      if (!currentHref && sectionIds.length > 0) {
        const firstSection = document.getElementById(sectionIds[0]);

        if (firstSection && firstSection.getBoundingClientRect().top <= offset) {
          currentHref = data.links[data.links.length - 1]?.href ?? "";
        }
      }

      setActiveHref(currentHref);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [data.links]);

  return (
    <header className="fixed inset-x-0 top-0 z-30 px-4 pt-4 sm:px-6 lg:px-8 lg:pt-6">
      <div className="mx-auto max-w-7xl rounded-[30px] border border-[#3a382f] bg-[#1b1a18]/92 px-4 py-3 text-white shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-md sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <a href="#hero" className="min-w-0 flex-1 md:flex-none" onClick={handleSectionClick("#hero")}>
            <span className="block truncate pr-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B99E83] sm:text-sm lg:text-base">
              {data.brand}
            </span>
          </a>

          <nav className="hidden items-center gap-3 md:flex lg:gap-6">
            {data.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleSectionClick(link.href)}
                className={`group relative rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-white/6 hover:text-[#c4975b] ${
                  activeHref === link.href ? "text-[#B99E83]" : "text-white/88"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-3 h-[2px] rounded-full bg-[#c4975b] transition-all duration-200 group-hover:w-[calc(100%-24px)] group-hover:opacity-100 ${
                    activeHref === link.href ? "w-[calc(100%-24px)] opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${data.phoneRaw}`}
              className="hidden rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/82 transition hover:border-[#c4975b]/50 hover:text-[#c4975b] lg:inline-flex"
            >
              {data.phoneLabel}
            </a>
            <a
              href={inspectionFormHref}
              onClick={handleSectionClick(inspectionFormHref)}
              className="hidden h-11 items-center rounded-full bg-[#D2A566] px-4 text-sm font-semibold text-[#171614] transition hover:bg-[#c4975b] sm:inline-flex lg:px-5"
            >
              {data.ctaLabel}
            </a>
            <button
              type="button"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white transition hover:border-[#c4975b]/50 hover:text-[#c4975b] md:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className="text-lg leading-none">{isMenuOpen ? "x" : "="}</span>
            </button>
          </div>
        </div>

        {isMenuOpen ? (
          <div className="mt-3 rounded-[24px] border border-[#3a382f] bg-[#171614]/96 p-3 md:hidden">
            <nav className="grid gap-2">
              {data.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleSectionClick(link.href, true)}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-white/6 hover:text-[#c4975b] ${
                    activeHref === link.href ? "text-[#c4975b]" : "text-white/88"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-3 grid gap-2 border-t border-white/10 pt-3">
              <a
                href={`tel:${data.phoneRaw}`}
                className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/82 transition hover:border-[#c4975b]/50 hover:text-[#c4975b]"
                onClick={closeMenu}
              >
                {data.phoneLabel}
              </a>
              <a
                href={inspectionFormHref}
                onClick={handleSectionClick(inspectionFormHref, true)}
                className="inline-flex items-center justify-center rounded-2xl bg-[#f2c230] px-4 py-3 text-sm font-semibold text-[#171614] transition hover:bg-[#c4975b]"
              >
                {data.ctaLabel}
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default Navbar;
