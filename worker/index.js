function jsonResponse(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...extraHeaders,
    },
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEmailHtml({ name, phone, message }) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #181512;">
      <h2 style="margin: 0 0 16px; font-size: 20px;">New website inquiry</h2>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 0 0 8px;"><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p style="margin: 16px 0 8px;"><strong>Message:</strong></p>
      <div style="white-space: pre-wrap;">${escapeHtml(message)}</div>
    </div>
  `;
}

function buildEmailText({ name, phone, message }) {
  return [
    "New website inquiry",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    "",
    "Message:",
    message,
  ].join("\n");
}

function validatePayload(payload) {
  const name = String(payload?.name ?? "").trim();
  const phone = String(payload?.phone ?? "").trim();
  const message = String(payload?.message ?? "").trim();

  if (!name || !phone || !message) {
    return { ok: false, error: "Missing required fields." };
  }

  if (name.length > 120 || phone.length > 40 || message.length > 4000) {
    return { ok: false, error: "Payload too large." };
  }

  return {
    ok: true,
    value: { name, phone, message },
  };
}

export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return jsonResponse({ ok: false, error: "Method not allowed." }, 405, corsHeaders);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ ok: false, error: "Invalid JSON body." }, 400, corsHeaders);
    }

    const result = validatePayload(payload);
    if (!result.ok) {
      return jsonResponse({ ok: false, error: result.error }, 400, corsHeaders);
    }

    const resendApiKey = env.RESEND_API_KEY;
    const fromEmail = env.RESEND_FROM_EMAIL;
    const toEmail = env.CONTACT_TO_EMAIL;

    if (!resendApiKey || !fromEmail || !toEmail) {
      return jsonResponse(
        {
          ok: false,
          error: "Missing RESEND_API_KEY, RESEND_FROM_EMAIL, or CONTACT_TO_EMAIL.",
        },
        500,
        corsHeaders,
      );
    }

    const { name, phone, message } = result.value;
    const subject = `\u041d\u043e\u0432\u043e \u0437\u0430\u043f\u0438\u0442\u0432\u0430\u043d\u0435 \u043e\u0442 ${name}`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject,
        html: buildEmailHtml({ name, phone, message }),
        text: buildEmailText({ name, phone, message }),
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      return jsonResponse(
        {
          ok: false,
          error: "Email relay failed.",
          details: errorText,
        },
        502,
        corsHeaders,
      );
    }

    return jsonResponse({ ok: true }, 200, corsHeaders);
  },
};
