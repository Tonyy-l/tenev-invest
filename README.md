# tenev-invest

## Contact form on Cloudflare Workers

The form submits to `POST /api/contact` by default.

Required Worker env vars:
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

Frontend override:
- Set `VITE_CONTACT_ENDPOINT` if your API runs on a different origin.

Deploy notes:
- `worker/index.js` contains the Worker endpoint.
- `wrangler.toml` is a minimal Worker config for the API.
- Resend's free plan currently lists `3,000 emails / mo` and `1 domain`.
