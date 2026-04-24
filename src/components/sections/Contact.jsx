import InspectionForm from "./InspectionForm";

function Contact({ data, contact }) {
  return (
    <section id="contact" className="relative scroll-mt-32 py-16 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
          <div className="h-full rounded-[30px] border border-[#d7cdbf] bg-[linear-gradient(180deg,rgba(244,239,230,0.96),rgba(232,224,214,0.92))] p-6 shadow-[0_18px_46px_rgba(56,44,30,0.08)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#81684a] sm:text-base">
              {data.smallTitle}
            </p>
            <h2 className="mt-4 max-w-[14ch] text-2xl font-bold leading-tight text-[#181512] sm:text-4xl">
              {data.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#574a3c] sm:text-base">
              {data.description}
            </p>

            <div className="mt-8 grid gap-4">
              <div className="rounded-[24px] border border-white/60 bg-white/65 p-5 shadow-[0_10px_24px_rgba(56,44,30,0.05)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b6d48]">
                  Телефон
                </p>
                <a
                  href={`tel:${contact.phoneRaw}`}
                  className="mt-3 block text-xl font-semibold text-[#181512] transition hover:text-[#8b6d48]"
                >
                  {contact.phoneLabel}
                </a>
              </div>

              <div className="rounded-[24px] border border-white/60 bg-white/65 p-5 shadow-[0_10px_24px_rgba(56,44,30,0.05)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b6d48]">
                  Имейл
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-3 block break-all text-base text-[#3f352a] transition hover:text-[#8b6d48]"
                >
                  {contact.email}
                </a>
              </div>

              <div className="rounded-[24px] border border-white/60 bg-white/65 p-5 shadow-[0_10px_24px_rgba(56,44,30,0.05)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b6d48]">
                  Обхват
                </p>
                <p className="mt-3 text-base leading-7 text-[#3f352a]">{contact.address}</p>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-[#c4975b]/18 bg-[#1f1c18] p-5 text-white shadow-[0_14px_30px_rgba(25,20,16,0.18)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d7b98e]">
                Бърз отговор
              </p>
              <p className="mt-3 text-sm leading-7 text-white/78 sm:text-base">
                Изпратете кратко описание на обекта и ще се свържем с вас за оглед, срок и ориентировъчна оферта.
              </p>
            </div>
          </div>

          <div className="flex h-full rounded-[30px] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.68),rgba(255,255,255,0.52))] p-3 shadow-[0_18px_46px_rgba(56,44,30,0.08)] sm:p-4">
            <InspectionForm data={data} contact={contact} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
