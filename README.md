<div align="center">
    <h1 align="center">Portfolio</h1>

Personal portfolio website, built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Contentlayer](https://www.contentlayer.dev/) and served as a static export by a [Cloudflare Worker](https://developers.cloudflare.com/workers/static-assets/).

</div>

<br/>

## Running Locally

Install dependencies and run the Next.js development server:
```sh-session
pnpm install
pnpm dev
```

`pnpm dev` does not serve `POST /api/consulting`. That route is the Worker in `src/worker.ts`. To preview the static export and the form together, build and run Wrangler (see `MIGRATION.md`):

```sh-session
pnpm build
pnpm exec wrangler dev
```

## Consulting page

Edit indicative USD prices and the review-credit copy in `data/consulting.ts`.
The same file defines optional qualification choices used by both the form and
server validation. Only name, work email, and company are required.

The form posts to `/api/consulting`. A Worker sends the message through Resend.
See `.env.example` for secrets. Provider failures return an error and keep the
visitor's answers; the page also offers direct email.

Run `pnpm test` for validation and route tests (email delivery is mocked),
`pnpm typecheck`, and `pnpm build` before publishing.
Deploy and DNS cutover steps are in `MIGRATION.md`. `pnpm deploy` publishes
the Worker only; it does not move krissemmy.com.
