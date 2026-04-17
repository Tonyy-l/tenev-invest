function Services({ data, items }) {
  return (
    <section id="services" className="relative -mt-px scroll-mt-32">
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#81684a] sm:text-sm">
            {data.smallTitle}
          </p>
          <h2 className="mt-4 text-2xl font-bold text-[#181512] sm:text-4xl">{data.title}</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#4f4336] sm:text-base">{data.description}</p>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="group rounded-[28px] border border-white/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.68))] p-5 shadow-[0_12px_30px_rgba(34,28,22,0.06)] backdrop-blur-sm transition hover:-translate-y-1 hover:border-[#c4975b]/30 hover:shadow-[0_18px_40px_rgba(34,28,22,0.10)] sm:p-6"
            >
              <div className="inline-flex rounded-2xl border border-[#c4975b]/16 bg-[#c4975b]/8 p-3">
                <img src={item.iconSrc} alt={item.title} className="h-12 w-12" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[#181512]">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#574a3c]">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
