# Contact form email delivery

The contact page posts to `/api/contact`. This project does not currently have
a backend or email provider configured, so the form reports delivery as
successful only after the serverless endpoint receives confirmation from
Resend. Until the following settings are configured and deployed, submissions
will show an explicit unavailable message.

## Deploy on Vercel

The endpoint in `api/contact.js` uses Vercel's Node.js serverless function
convention and the built-in `fetch` API. Connect this repository to Vercel and
deploy it with the existing Vite build settings. For local end-to-end testing,
use the Vercel CLI (`vercel dev`) so requests to `/api/contact` reach the
function; the Vite development server by itself does not run serverless
functions.

## Configure email

Create a Resend API key and verify a sending domain in Resend. In the Vercel
project's Environment Variables settings, add these values for the environments
where the site will run:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Secret Resend API key. Keep it server-side; never prefix it with `VITE_`. |
| `CONTACT_TO_EMAIL` | Inbox that should receive enquiries. The existing site lists `Inquire@acplogs.com`. |
| `CONTACT_FROM_EMAIL` | Sender address on the domain verified with Resend, for example `ACP Logistics <website@your-verified-domain.com>`. Replace the example with a real verified sender. |

Redeploy after setting or changing these values. The sender domain must be
verified with Resend before messages can be delivered. The submitted email is
used as `Reply-To`; it is never used as the sender.

The endpoint checks the request method, JSON body size, required values,
email syntax, service selection, and field lengths on the server. A hidden
honeypot field provides basic spam filtering. Provider failures are logged
server-side and returned as an error to the form; no success response is sent
unless Resend accepts the email. Add provider-side rate limiting or CAPTCHA if
the live form receives abusive traffic.

If the site is hosted somewhere other than Vercel, deploy `api/contact.js` as
that host's equivalent Node.js serverless function (or deploy the project on
Vercel) and preserve the same `/api/contact` contract.
