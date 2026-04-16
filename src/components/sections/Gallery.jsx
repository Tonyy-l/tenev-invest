import { scrollToSection } from "../../utils/scrollToSection";

function Gallery({ data, items }) {
  return (
    <section id="gallery" className="mx-auto max-w-7xl scroll-mt-32 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f6558] sm:text-sm">
            {data.smallTitle}
          </p>
          <h2 className="mt-4 text-2xl font-bold sm:text-4xl">{data.title}</h2>
          <p className="mt-4 text-sm leading-7 text-[#433d35] sm:text-base">{data.description}</p>
        </div>
        <a
          href={data.buttonHref}
          onClick={(event) => {
            event.preventDefault();
            scrollToSection(data.buttonHref);
          }}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#c4975b] px-5 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#c4975b] hover:text-white"
        >
          {data.buttonText}
        </a>
      </div>

      <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <figure key={item.title} className="overflow-hidden rounded-[24px] border border-black/8 bg-white/72 shadow-[0_12px_30px_rgba(17,17,17,0.06)]">
            <img src={item.imageSrc} alt={item.alt} className="h-56 w-full object-cover sm:h-64 xl:h-72" />
            <figcaption className="p-5">
              <p className="text-lg font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-[#433d35]">{item.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
