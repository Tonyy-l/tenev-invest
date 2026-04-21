import heroImage from "../../assets/BackgroundImgN.jpg";
import logo from "../../assets/logotransperant.png";
import { scrollToSection } from "../../utils/scrollToSection";

function Hero({ data }) {
  return (
    <section id="hero" className="relative isolate min-h-[calc(100svh+2rem)] scroll-mt-32 overflow-hidden">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat motion-safe:animate-[heroZoom_1.8s_ease-out_forwards]"
        style={{ backgroundImage: `url(${heroImage})`, backgroundPosition: "center 30%" }}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(96deg,rgba(8,8,8,0.94)_0%,rgba(8,8,8,0.86)_34%,rgba(10,10,10,0.66)_62%,rgba(12,12,12,0.42)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.10)_26%,rgba(0,0,0,0.22)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(196,151,91,0.12),transparent_28%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center_right,rgba(0,0,0,0.14),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-48 bg-[linear-gradient(180deg,rgba(235,229,219,0)_0%,rgba(235,229,219,0.06)_28%,rgba(235,229,219,0.16)_56%,#ebe5db_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh+2rem)] max-w-7xl items-center px-4 pb-12 pt-24 text-white sm:px-6 sm:pb-16 sm:pt-28 lg:px-8 lg:pb-18 lg:pt-28">
        <div className="max-w-3xl">
          <img src={logo} alt={data.title} className="mb-2.5 h-48 w-auto sm:h-16 lg:h-[5.5rem]" />
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-white/68 sm:text-sm">
            {data.smallTitle}
          </p>
          <h1 className="max-w-[14ch] text-[1.75rem] font-bold leading-[1.08] text-white sm:text-[2.85rem] lg:text-[4rem]">
            {data.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/78 sm:text-base lg:text-[1.05rem]">
            {data.subtitle}
          </p>


          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={data.primaryButtonHref}
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(data.primaryButtonHref);
              }}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#c4975b] bg-[#c4975b] px-7 py-3 text-base font-semibold text-[#111111] transition hover:bg-[#d2a566] sm:w-auto"
            >
              {data.primaryButtonText}
            </a>
            <a
              href={data.secondaryButtonHref}
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(data.secondaryButtonHref);
              }}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/18 bg-white/8 px-7 py-3 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/14 sm:w-auto"
            >
              {data.secondaryButtonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
