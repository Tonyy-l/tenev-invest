import heroImage from "../../assets/backgroundImg.jpg";
import logo from "../../assets/logotransperant.png";
import { scrollToSection } from "../../utils/scrollToSection";

function Hero({ data }) {
  return (
    <section id="hero" className="relative isolate scroll-mt-32 overflow-hidden">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat motion-safe:animate-[heroZoom_1.8s_ease-out_forwards]"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(12,12,12,0.84)_0%,rgba(12,12,12,0.72)_38%,rgba(12,12,12,0.42)_64%,rgba(12,12,12,0.58)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(196,151,91,0.18),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-52 bg-[linear-gradient(180deg,rgba(245,241,234,0)_0%,rgba(245,241,234,0.22)_35%,rgba(245,241,234,0.6)_68%,#f5f1ea_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-[radial-gradient(ellipse_at_bottom,rgba(245,241,234,0.55),rgba(245,241,234,0)_70%)]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 pb-20 pt-32 text-white sm:px-6 sm:pb-24 sm:pt-36 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-8 lg:pb-32 lg:pt-40 xl:min-h-[820px] xl:items-end">
        <div className="max-w-2xl">
          <img
            src={logo}
            alt={data.title}
            className="mb-5 h-16 w-auto sm:h-20 lg:h-28"
          />
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/70 sm:text-sm">
            {data.smallTitle}
          </p>
          <h1 className="max-w-[12ch] text-3xl font-bold leading-tight text-white sm:max-w-[11ch] sm:text-5xl lg:text-6xl">
            {data.title}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/82 sm:text-base lg:text-lg">
            {data.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={data.primaryButtonHref}
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(data.primaryButtonHref);
              }}
              className="inline-flex min-h-12 items-center justify-center border border-[#c4975b] bg-[#c4975b] px-6 py-3 text-base font-semibold text-[#111111] transition hover:bg-[#d2a566]"
            >
              {data.primaryButtonText}
            </a>
            <a
              href={data.secondaryButtonHref}
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(data.secondaryButtonHref);
              }}
              className="inline-flex min-h-12 items-center justify-center border border-white/25 bg-white/8 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/14"
            >
              {data.secondaryButtonText}
            </a>
          </div>
        </div>

        <div className="lg:flex lg:items-end lg:justify-end">
          <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-black/18 p-4 backdrop-blur-md sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/65 sm:text-sm">
              {data.statsTitle}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {data.stats.map((stat) => (
                <div key={stat.label} className="border border-white/8 bg-white/5 p-3 sm:p-4">
                  <p className="text-2xl font-bold text-white sm:text-[1.75rem]">{stat.value}</p>
                  <p className="mt-2 text-sm text-white/72">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
