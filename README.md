<div align="center">
    <h1 align="center">Portfolio</h1>

Personal portfolio website, built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Contentlayer](https://www.contentlayer.dev/) and deployed to [Vercel](https://vercel.com/).

</div>

<br/>

## Running Locally

Then install dependencies and run the development server:
```sh-session
pnpm install
pnpm dev
```

## Consulting page

Edit indicative USD prices and the review-credit copy in `data/consulting.ts`.
The same file defines optional qualification choices used by both the form and
server validation. Only name, work email, and company are required.

The form posts to `/api/consulting` and sends through the existing Resend
integration. See `.env.example` for configuration. Provider failures return an
error and keep the visitor's answers; the page also offers direct email.

Run `npm test` for validation and route tests (email delivery is mocked),
`./node_modules/.bin/tsc --noEmit`, and `npm run build` before publishing.
The existing Vercel Git integration deploys updates to `main`.
