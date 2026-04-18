import { useRef, useState } from "react";
import { scrollToSection } from "../../utils/scrollToSection";

function Gallery({ data, items }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = items.length;
  const showGalleryCta = Boolean(data.buttonText && data.buttonHref);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const minSwipeDistance = 50;

  const goToPreviousSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handleTouchStart = (event) => {
    touchEndX.current = null;
    touchStartX.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    touchEndX.current = event.changedTouches[0].clientX;

    if (touchStartX.current === null || touchEndX.current === null || totalSlides < 2) {
      return;
    }

    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) < minSwipeDistance) {
      return;
    }

    if (distance > 0) {
      goToNextSlide();
      return;
    }

    goToPreviousSlide();
  };

  return (
    <section id="gallery" className="relative scroll-mt-32">
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8f6c42] sm:text-sm">
              {data.smallTitle}
            </p>
            <h2 className="mt-4 text-2xl font-bold text-[#181512] sm:text-4xl">{data.title}</h2>
            <p className="mt-4 text-sm leading-7 text-[#43392e] sm:text-base">{data.description}</p>
          </div>

          {showGalleryCta ? (
            <a
              href={data.buttonHref}
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(data.buttonHref);
              }}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#8f6c42] bg-white/20 px-5 py-3 text-base font-semibold text-[#181512] transition hover:bg-[#c4975b] hover:text-[#171411]"
            >
              {data.buttonText}
            </a>
          ) : null}
        </div>

        <div className="mt-8 flex flex-col items-center sm:mt-10">
          <div
            className="relative w-full overflow-hidden rounded-[24px] border border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.66))] shadow-[0_12px_34px_rgba(48,37,27,0.08)] backdrop-blur-md sm:max-w-4xl sm:rounded-[28px]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {items.map((item, index) => (
                <div key={`${item.imageSrc}-${index}`} className="relative w-full flex-shrink-0">
                  <img
                    src={item.imageSrc}
                    alt={item.alt}
                    className="h-72 w-full object-cover sm:h-80 lg:h-[420px]"
                  />

                  {totalSlides > 1 ? (
                    <div className="absolute inset-0 z-10 flex">
                      <button
                        type="button"
                        onClick={goToPreviousSlide}
                        className="h-full w-1/2 cursor-pointer bg-transparent"
                        aria-label="Previous slide"
                      />
                      <button
                        type="button"
                        onClick={goToNextSlide}
                        className="h-full w-1/2 cursor-pointer bg-transparent"
                        aria-label="Next slide"
                      />
                    </div>
                  ) : null}

                  <div className="pointer-events-none absolute inset-0 z-20 flex items-end bg-gradient-to-t from-black/62 via-black/18 to-transparent">
                    <div className="p-4 text-white sm:p-5">
                      <p className="text-base font-semibold sm:text-lg">{item.title}</p>
                      <p className="mt-1 text-sm text-white/80">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={goToPreviousSlide}
              className="absolute left-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full opacity-0 transition sm:left-3 sm:h-10 sm:w-10"
              aria-label="Previous slide"
            >
              {"<"}
            </button>

            <button
              type="button"
              onClick={goToNextSlide}
              className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full opacity-0 transition sm:right-3 sm:h-10 sm:w-10"
              aria-label="Next slide"
            >
              {">"}
            </button>
          </div>

          <div className="mt-5 flex items-center gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`h-3 w-3 rounded-full transition ${
                  index === currentSlide ? "bg-[#181512]" : "bg-black/20"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
