# Promind 360 website

Marketing site for Promind 360. It is a static site, rendered at build time by a small Node script with no dependencies. It deploys to Vercel.

```sh
npm run dev               # build, serve on http://localhost:3000, rebuild on change
npm run build             # draft build → dist/ (shows placeholders, noindex)
npm run build:production  # hides every placeholder / unverified item
```

## Where things live

| To change…                                   | Edit                                   |
| -------------------------------------------- | -------------------------------------- |
| Nav, CTA, contact details, SEO, form endpoint | `src/content/site.js`                  |
| All homepage copy, section by section         | `src/content/home.js`                  |
| Simulated incidents, feeds, dashboards        | `src/content/demo-data.js`             |
| Section order                                 | `src/pages/index.js`                   |
| Section markup                                | `src/sections/*.js`                    |
| Colours, type, spacing (brand)                | `src/styles/tokens.css`                |
| Interactions                                  | `src/scripts/*.js`                     |

## Draft vs production content

Content items can be flagged in the content files:

- `placeholder: true` means a slot is waiting for approved content.
- `verified: false` means a claim was carried over from the previous website and has not been re-approved.

Draft builds show both with a yellow **Placeholder** / **Verify** tag and add `noindex`. Production builds leave them out. When a pending section has nothing to show, it falls back to a Book a Demo prompt; the Proof section is removed entirely, and so is its nav link.

## Open items

Search the codebase for `TODO(` for the full list. The main ones are:

- **Brand:** final colours and typography, and an Open Graph share image (`site.js`, `tokens.css`).
- **Launch:** the production domain (`site.url`), which enables the canonical URL and `sitemap.xml`.
- **Integrations:** a demo-form endpoint and an analytics provider. Until the form endpoint is set, the form opens a pre-filled email instead.
- **Content not yet supplied** (hidden in production until added):
  - customer logos, proof metrics and a case study (the Proof section shows as "Clients" until a case study exists)
  - the Promind credibility visual in About
  - real platform screenshots
- **Product confirmation:** the evidence fields shown in the platform mockup, the details of CCTV compatibility, and the data security specifics (encryption, retention, data location).

The previous site's assets are in `reference/legacy-assets/`. They are not deployed.
