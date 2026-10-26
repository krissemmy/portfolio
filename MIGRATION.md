# Cloudflare migration

The site is a Next.js static export (`out/`) served by the Worker `krissemmy-portfolio`, plus `src/worker.ts` for `POST /api/consulting`. Nothing in this repository attaches a domain or changes DNS.

## Build

Requires Node.js 22 (see `.nvmrc`).

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm typecheck
pnpm build
```

`pnpm build` writes one Open Graph PNG per page into `public/og/` and then runs `next build`. The export is `out/`.

Preview it locally (no Cloudflare account needed):

```sh
pnpm exec wrangler dev
```

## Secrets

Set these on the Worker. Do not put the values in `wrangler.jsonc` or git.

```sh
pnpm exec wrangler secret put RESEND_API_KEY
pnpm exec wrangler secret put CONSULTING_CONTACT_EMAIL
pnpm exec wrangler secret put RESEND_FROM_EMAIL   # optional
```

`CONSULTING_CONTACT_EMAIL` is an optional comma-separated list (`krissemmy17@gmail.com,consulting@krissemmy.com`). Whitespace is trimmed, empty entries are dropped, each address must be an email, and duplicates are ignored. When the secret is unset, inquiries go to both `krissemmy17@gmail.com` and `consulting@krissemmy.com`. `RESEND_FROM_EMAIL` defaults to `Portfolio Contact <consulting@krissemmy.com>`. Copy names into `.dev.vars` for `wrangler dev` (see `.env.example`).

`wrangler secret put` deploys a new version. Prefer `wrangler versions secret put` when the change should not go out immediately.

The consulting rate limit is 5 accepted inquiries per 60 seconds per client IP per Cloudflare location (`CONSULTING_RATE_LIMITER` in `wrangler.jsonc`). It is approximate. Honeypot submissions are not counted and do not send mail.

## Deploy

This publishes to `*.workers.dev` only. It does not change krissemmy.com. `preview_urls` is `false` in `wrangler.jsonc`, so a deploy does not also publish a version preview URL (`<version>-krissemmy-portfolio.<subdomain>.workers.dev`). Wrangler turned those on by default during a test deploy.

```sh
pnpm deploy
```

`pnpm deploy` is `pnpm build && wrangler deploy`.

## Cutover

Do this only after a preview check, and only with explicit approval. Do not change nameservers, MX, DKIM, SPF, DMARC, or any subdomain that is not `www`.

Apex and www are already proxied through Cloudflare. Leave the existing DNS records in place and switch traffic with a route, which is reversible without a TTL wait.

1. Add a Single Redirect (zone ruleset, dynamic redirect): hostname `krissemmy.com` to `https://www.krissemmy.com` plus the original path, status 301, preserve the query string. This replaces Vercel's apex 307.
2. Add a Worker route `www.krissemmy.com/*` to `krissemmy-portfolio`. Do not add that route in `wrangler.jsonc` until this step; a config route is applied on every later deploy.
3. Purge the Cloudflare cache for www, then recheck the pages, 404, trailing slash, OG images, and the contact form against `https://www.krissemmy.com`.

Recorded origin values, for the later custom-domain swap (not part of the route cutover):

- Apex `A` `216.198.79.1` (proxied), currently Vercel.
- `www` `CNAME` `c388903fce3a900c.vercel-dns-017.com` (proxied).

A custom domain cannot replace an existing CNAME. That swap is a later step: delete the www CNAME, attach the custom domain, point the apex `A`/`AAAA` at a proxied placeholder such as `100::` so the redirect rule still has a target, then remove the domains from the Vercel project. Keep the Vercel project paused for a while as a cold rollback.

## Rollback

While traffic is on the Worker route: delete the route `www.krissemmy.com/*` and the apex redirect rule. The proxied `A` and `CNAME` still point at Vercel, so the current deployment serves again. Expect this to take under a minute.

After a later custom-domain swap: recreate `www` `CNAME` `c388903fce3a900c.vercel-dns-017.com` (proxied) and apex `A` `216.198.79.1` (proxied), unpause the Vercel project, and reattach `krissemmy.com` and `www.krissemmy.com`.

## Differences from the Vercel site

- Pages are built once. `revalidate = 60` on the project pages did not change content (Contentlayer runs at build time) and is removed.
- `POST /api/incr` and the project view counter are removed. The Vercel project has no Upstash credentials, so the counter could not persist.
- Open Graph images are files at `/og/<slug>.png` (one per page, 1200×630). `/og?title=` and `/consulting/opengraph-image` are gone. The consulting card keeps its own layout. Already-cached social cards keep the old URL until a platform rescrapes.
- `next/image` is unoptimized. There is no `/_next/image` optimizer. The portrait is the existing WebP file.
- `POST /api/consulting` is the Worker, not a Next route. The JSON contract is the same, including honeypot `{ ok: true }` and the 400 / 502 / 503 messages. New: HTTP 429 after the rate limit. Mail is a `fetch` to `https://api.resend.com/emails` with the same `reply_to` and text body the Resend SDK sent. `to` is an array. The default recipients are `krissemmy17@gmail.com` and `consulting@krissemmy.com`.
- Static responses send `Strict-Transport-Security: max-age=63072000` via `public/_headers`. `/_next/static/*` is `public, max-age=31536000, immutable`. Worker responses set the same HSTS plus `Cache-Control: no-store`.
- `/projects` and `/projects/` follow Next's no-slash files (`auto-trailing-slash`): `/projects/` is a 307 to `/projects`. Unknown paths serve `404.html` with status 404.
- Apex 301 is not in the Worker. It is the cutover redirect above.
