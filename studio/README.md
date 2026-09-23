# The Media Foundry — Sanity Studio

Schemas for everything content-shaped on the site: Team, Journal, Work
items, Case studies, Careers roles/pillars/steps, and the small page-copy
text. This is a separate project from the Next.js site (`../`) — the site
reads from it at build time, but Studio itself runs and deploys on its own.

## One-time setup (run these yourself — they need your own Sanity login)

```bash
cd studio
npm install
npx sanity login      # opens your browser to sign in / create an account
npx sanity init --env # creates the project on sanity.io, writes .env
```

`sanity init --env` will ask a few questions:
- **Create new project** → give it a name, e.g. "The Media Foundry"
- **Use the default dataset configuration** → yes, dataset name `production`
- **Would you like to add configuration files for a Sanity project?** → **No**,
  this repo already has `sanity.config.ts` and the schema files — don't let
  it overwrite them.

That writes `studio/.env` with your real `SANITY_STUDIO_PROJECT_ID`. **Send
me that project ID** (the dataset is `production` unless you changed it) —
I need it to wire the Next.js site to read from your project.

## Running Studio locally

```bash
npm run dev
```

Opens at `http://localhost:3333`.

## Publishing Studio so it has a real URL

```bash
npm run deploy
```

Asks for a subdomain and gives you `https://<your-subdomain>.sanity.studio`
— a hosted editing page, separate from the main site, that only people you
invite (via sanity.io/manage) can sign into.

## Notes

- Every text field that appears in both languages on the site (English/Krio)
  is one field here with an `en` and a `kri` box, rather than two separate
  documents — matching the `.ts`/`.kri.ts` file pairs the site used before.
- `Person` covers both Team members and Journal article authors, so editing
  someone's name or photo once updates it everywhere they're credited.
- `Site copy` is a single document (see the pinned "Site copy" item in the
  Studio, not a list) — it holds hero headlines and small UI labels that
  don't belong to any one record.
- Fields marked "advanced" (some Work item layout fields) are raw Tailwind
  classes a developer tuned by eye — leave them alone unless you mean to
  change the layout, not just the content.
