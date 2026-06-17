import { useId, useState } from "react";

const PHONE_PATTERN = /^(\+359|0)\s?[0-9]{2,3}[\s-]?[0-9]{3}[\s-]?[0-9]{3,4}$/;
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT ?? "/api/contact";

function buildMailtoUrl(email, values) {
  const subject = "Ново запитване от сайта";
  const body = [
    `Име: ${values.name.trim()}`,
    `Телефон: ${values.phone.trim()}`,
    "",
    "Описание:",
    values.message.trim(),
  ].join("\n");

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Field({ id, label, error, children }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium text-[#181512]">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-[#9f3a2f]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function InspectionForm({ data, contact }) {
  const formId = useId();
  const nameId = `${formId}-name`;
  const phoneId = `${formId}-phone`;
  const messageId = `${formId}-message`;
  const honeypotId = `${formId}-gotcha`;
  const statusId = `${formId}-status`;

  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const isSubmitting = status === "submitting";
  const inputBaseClassName =
    "min-h-12 w-full rounded-2xl border border-black/10 bg-white/86 px-4 py-3 text-[#181512] outline-none transition placeholder:text-black/40 focus:border-[#c4975b] focus:ring-4 focus:ring-[#c4975b]/20 disabled:cursor-not-allowed disabled:opacity-60";
  const textareaClassName =
    "w-full rounded-2xl border border-black/10 bg-white/86 px-4 py-3 text-[#181512] outline-none transition placeholder:text-black/40 focus:border-[#c4975b] focus:ring-4 focus:ring-[#c4975b]/20 disabled:cursor-not-allowed disabled:opacity-60";

  const validate = (values) => {
    const nextErrors = {
      name: "",
      phone: "",
      message: "",
    };

    if (!values.name.trim()) {
      nextErrors.name = "Моля, въведете име.";
    }

    if (!values.phone.trim()) {
      nextErrors.phone = "Моля, въведете телефонен номер.";
    } else if (!PHONE_PATTERN.test(values.phone.trim())) {
      nextErrors.phone = "Моля, въведете валиден телефонен номер.";
    }

    if (!values.message.trim()) {
      nextErrors.message = "Моля, въведете съобщение.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("_gotcha")) {
      setStatus("error");
      setStatusMessage("Изпращането не беше прието.");
      return;
    }

    const values = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
    };

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setStatusMessage("");

    const firstErrorField = Object.entries(nextErrors).find(([, value]) => value)?.[0];

    if (firstErrorField) {
      setStatus("error");
      setStatusMessage("Моля, коригирайте маркираните полета.");

      const fieldMap = {
        name: nameId,
        phone: phoneId,
        message: messageId,
      };

      document.getElementById(fieldMap[firstErrorField])?.focus();
      return;
    }

    try {
      setStatus("submitting");

      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        let apiMessage = "";

        try {
          const errorBody = await response.json();
          apiMessage = typeof errorBody?.error === "string" ? errorBody.error : "";
        } catch {
          // Ignore non-JSON error bodies and fall through to mail fallback.
        }

        if (apiMessage) {
          throw new Error(apiMessage);
        }

        throw new Error("submit-failed");
      }

      setErrors({ name: "", phone: "", message: "" });
      setStatus("success");
      setStatusMessage("\u0417\u0430\u043f\u0438\u0442\u0432\u0430\u043d\u0435\u0442\u043e \u0435 \u0438\u0437\u043f\u0440\u0430\u0442\u0435\u043d\u043e \u0443\u0441\u043f\u0435\u0448\u043d\u043e. \u0429\u0435 \u0441\u0435 \u0441\u0432\u044a\u0440\u0436\u0435\u043c \u0441 \u0432\u0430\u0441 \u0441\u043a\u043e\u0440\u043e.");
      form.reset();
    } catch (error) {
      window.location.href = buildMailtoUrl(contact.email, values);
      setErrors({ name: "", phone: "", message: "" });
      setStatus("success");
      setStatusMessage(
        error instanceof Error && error.message && error.message !== "submit-failed"
          ? `\u041e\u0442\u0432\u0430\u0440\u044f\u043c\u0435 \u0438\u043c\u0435\u0439\u043b \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435: ${error.message}`
          : "\u041e\u0442\u0432\u0430\u0440\u044f\u043c\u0435 \u0438\u043c\u0435\u0439\u043b \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435, \u0437\u0430 \u0434\u0430 \u0434\u043e\u0432\u044a\u0440\u0448\u0438\u0442\u0435 \u0437\u0430\u043f\u0438\u0442\u0432\u0430\u043d\u0435\u0442\u043e.",
      );
      form.reset();
    }
  };

  return (
    <form
      id="inspection-form"
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
      aria-describedby={statusMessage ? statusId : undefined}
      className="scroll-mt-32 flex h-full w-full flex-col rounded-[26px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,255,255,0.78))] p-5 shadow-[0_12px_28px_rgba(34,28,22,0.05)] backdrop-blur-sm sm:p-6"
    >
      <fieldset disabled={isSubmitting} className="grid h-full gap-5">
        <div className="border-b border-black/8 pb-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#81684a] sm:text-base">
            Форма за запитване
          </p>
          <h2 className="mt-4 max-w-xl text-2xl font-bold leading-tight text-[#181512] sm:text-4xl">
            Попълнете данните и ще ви върнем обаждане възможно най-скоро.
          </h2>
        </div>

        <div className="sr-only" aria-hidden="true">
          <label htmlFor={honeypotId}>Не попълвайте това поле</label>
          <input
            id={honeypotId}
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <Field id={nameId} label={data.form.nameLabel} error={errors.name}>
          <input
            id={nameId}
            type="text"
            name="name"
            placeholder={data.form.namePlaceholder}
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            className={inputBaseClassName}
          />
        </Field>

        <Field id={phoneId} label={data.form.phoneLabel} error={errors.phone}>
          <input
            id={phoneId}
            type="tel"
            name="phone"
            placeholder={data.form.phonePlaceholder}
            autoComplete="tel"
            inputMode="tel"
            required
            pattern="^(\+359|0)\s?[0-9]{2,3}[\s-]?[0-9]{3}[\s-]?[0-9]{3,4}$"
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${phoneId}-error` : undefined}
            className={inputBaseClassName}
          />
        </Field>

        <Field id={messageId} label={data.form.messageLabel} error={errors.message}>
          <textarea
            id={messageId}
            name="message"
            rows={5}
            placeholder={data.form.messagePlaceholder}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${messageId}-error` : undefined}
            className={textareaClassName}
          />
        </Field>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full border border-[#2e2923] bg-[#1b1a18] px-6 py-3 text-base font-semibold text-white shadow-[0_16px_30px_rgba(27,26,24,0.22)] transition duration-200 hover:-translate-y-0.5 hover:border-[#c4975b]/60 hover:bg-[#c4975b] hover:shadow-[0_18px_34px_rgba(196,151,91,0.28)] focus:outline-none focus:ring-4 focus:ring-[#c4975b]/25 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <svg
                className="h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  className="opacity-25"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  d="M21 12a9 9 0 0 0-9-9"
                  className="opacity-90"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
              <span>Изпращане...</span>
            </>
          ) : (
            data.form.buttonText
          )}
        </button>

        <div
          id={statusId}
          role={status === "error" ? "alert" : "status"}
          aria-live={status === "error" ? "assertive" : "polite"}
          className="min-h-6"
        >
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
      </fieldset>
    </form>
  );
}
