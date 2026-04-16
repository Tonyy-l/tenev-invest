function Services({ data, items }) {
  return (
    <section
      id="services"
      className="relative -mt-px bg-[#f5f1ea] scroll-mt-32"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f6558] sm:text-sm">
          {data.smallTitle}
        </p>
        <h2 className="mt-4 text-2xl font-bold sm:text-4xl">{data.title}</h2>
        <p className="mt-4 text-sm leading-7 text-[#433d35] sm:text-base">{data.description}</p>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article key={item.title} className="rounded-[24px] border border-black/8 bg-white/72 p-5 shadow-[0_12px_30px_rgba(17,17,17,0.06)] backdrop-blur-sm sm:p-6">
              <img src={item.iconSrc} alt={item.title} className="h-12 w-12" />
              <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#433d35]">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
