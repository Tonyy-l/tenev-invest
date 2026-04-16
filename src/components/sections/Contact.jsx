import { useState } from "react";

const FORM_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT ?? "";

function Contact({ data, contact }) {
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const emailLabel = data.form.emailLabel ?? "Имейл";
  const emailPlaceholder = data.form.emailPlaceholder ?? "Вашият имейл";

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append("_subject", "Ново запитване от сайта");

    setStatus("submitting");
    setStatusMessage("");

    try {
      if (!FORM_ENDPOINT) {
        throw new Error("missing-form-endpoint");
      }

      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("submit-failed");
      }

      form.reset();
      setStatus("success");
      setStatusMessage("Запитването е изпратено успешно. Ще се свържем с вас скоро.");
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error.message === "missing-form-endpoint"
          ? "Добавете VITE_FORMSPREE_ENDPOINT в env конфигурацията, за да тръгне формата."
          : "Не успяхме да изпратим запитването. Моля, опитайте отново."
      );
    }
  };

  return (
    <section id="contact" className="scroll-mt-32 py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f6558] sm:text-sm">
            {data.smallTitle}
          </p>
          <h2 className="mt-4 text-2xl font-bold sm:text-4xl">{data.title}</h2>
          <p className="mt-4 text-sm leading-7 text-[#433d35] sm:text-base">{data.description}</p>

          <div className="mt-8 space-y-4 rounded-[24px] border border-black/8 bg-white/72 p-5 shadow-[0_12px_30px_rgba(17,17,17,0.06)] backdrop-blur-sm sm:p-6">
            <a href={`tel:${contact.phoneRaw}`} className="block text-lg font-semibold">
              {contact.phoneLabel}
            </a>
            <a href={`mailto:${contact.email}`} className="block break-all text-sm text-[#433d35]">
              {contact.email}
            </a>
            <p className="text-sm text-[#433d35]">{contact.address}</p>
          </div>
        </div>

        <form
          id="inspection-form"
          onSubmit={handleSubmit}
          className="scroll-mt-32 rounded-[24px] border border-black/8 bg-white/72 p-5 shadow-[0_12px_30px_rgba(17,17,17,0.06)] backdrop-blur-sm sm:p-6"
        >
          <div className="grid gap-5">
            <input type="text" name="_gotcha" className="hidden" tabIndex="-1" autoComplete="off" />

            <label className="grid gap-2">
              <span className="text-sm font-medium">{data.form.nameLabel}</span>
              <input
                type="text"
                name="name"
                placeholder={data.form.namePlaceholder}
                required
                autoComplete="name"
                className="min-h-12 rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#c4975b]"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">{data.form.phoneLabel}</span>
              <input
                type="tel"
                name="phone"
                placeholder={data.form.phonePlaceholder}
                required
                autoComplete="tel"
                className="min-h-12 rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#c4975b]"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">{emailLabel}</span>
              <input
                type="email"
                name="email"
                placeholder={emailPlaceholder}
                required
                autoComplete="email"
                className="min-h-12 rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#c4975b]"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">{data.form.messageLabel}</span>
              <textarea
                name="message"
                rows="5"
                placeholder={data.form.messagePlaceholder}
                required
                className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#c4975b]"
              />
            </label>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#1b1a18] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#c4975b] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "submitting" ? "Изпращане..." : data.form.buttonText}
            </button>

            {statusMessage ? (
              <p
                className={`text-sm ${
                  status === "success" ? "text-[#2f6f45]" : "text-[#9f3a2f]"
                }`}
              >
                {statusMessage}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
