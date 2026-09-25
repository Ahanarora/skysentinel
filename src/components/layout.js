import { html, raw, attr } from "../lib/html.js";
import { flags } from "../lib/flags.js";
import { site } from "../content/site.js";
import { icon } from "./icons.js";
import { demoButton, wordmark } from "./ui.js";
import { proofHasContent, proofHeading } from "../sections/proof.js";

// Homepage sections that can be omitted when they have no approved content;
// nav links pointing at them are dropped so no link goes nowhere.
const navItems = () =>
  site.nav
    .filter((item) => !(item.href.endsWith("#proof") && !proofHasContent()))
    .map((item) => (item.href.endsWith("#proof") ? { ...item, label: proofHeading().navLabel ?? item.label } : item));

function head({ title, description, path, assets }) {
  const canonical = site.url ? new URL(path, site.url).href : null;
  const ogImage = site.seo.ogImage && site.url ? new URL(site.seo.ogImage, site.url).href : null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.company,
    brand: { "@type": "Brand", name: site.name },
    email: site.contact.email,
    telephone: site.contact.phones[0]?.href.replace("tel:", ""),
    address: { "@type": "PostalAddress", streetAddress: site.contact.address, addressCountry: "IN" },
    ...(site.url && { url: site.url }),
  };

  return html`<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    ${canonical && html`<link rel="canonical" href="${canonical}" />`}
    ${/* Draft builds contain placeholder copy; keep them out of search indexes. */ ""}
    ${(flags.showPlaceholders || flags.showUnverified) && html`<meta name="robots" content="noindex" />`}
    <meta name="theme-color" content="${site.seo.themeColor}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${site.name}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    ${canonical && html`<meta property="og:url" content="${canonical}" />`}
    ${ogImage && html`<meta property="og:image" content="${ogImage}" />`}
    <meta name="twitter:card" content="${ogImage ? "summary_large_image" : "summary"}" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
    <link rel="stylesheet" href="${assets.css}" />
    <script type="module" src="${assets.js}"></script>
    <script type="application/ld+json">${raw(JSON.stringify(jsonLd).replace(/</g, "\\u003c"))}</script>
  </head>`;
}

function header({ path }) {
  const home = path === "/";
  // On the homepage, in-page anchors stay relative so they scroll smoothly.
  const href = (target) => (home && target.startsWith("/#") ? target.slice(1) : target);
  return html`<header class="site-header" data-header>
    <div class="container site-header__inner">
      <a class="site-header__brand" href="/" aria-label="${site.name} home">${wordmark({ height: 54 })}<span class="site-header__tagline">${site.tagline}</span></a>
      <nav class="site-nav" id="site-nav" aria-label="Primary" data-nav>
        <ul class="site-nav__list">
          ${navItems().map((item) => html`<li><a class="site-nav__link" href="${href(item.href)}">${item.label}</a></li>`)}
        </ul>
        ${demoButton({ track: "nav-mobile", className: "site-nav__cta" })}
      </nav>
      <div class="site-header__actions">
        ${demoButton({ track: "nav", size: "sm", className: "site-header__cta" })}
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle>
          <span class="nav-toggle__open">${icon("menu", { size: 22 })}</span>
          <span class="nav-toggle__close">${icon("close", { size: 22 })}</span>
          <span class="visually-hidden">Menu</span>
        </button>
      </div>
    </div>
  </header>`;
}

function footer() {
  const c = site.contact;
  return html`<footer class="site-footer">
    <div class="container site-footer__grid">
      <div class="site-footer__brand">
        ${wordmark({ onDark: true, height: 48 })}
        <p>Remote CCTV monitoring and operational control, by ${site.company}.</p>
      </div>
      <nav aria-label="Footer">
        <p class="site-footer__heading">Explore</p>
        <ul>
          ${navItems().map((item) => html`<li><a href="${item.href}">${item.label}</a></li>`)}
          <li><a href="${site.primaryCta.href}">${site.primaryCta.label}</a></li>
        </ul>
      </nav>
      <div>
        <p class="site-footer__heading">Contact</p>
        <ul class="site-footer__contact">
          <li><a href="mailto:${c.email}">${icon("mail", { size: 16 })}<span>${c.email}</span></a></li>
          ${c.phones.map((p) => html`<li><a href="${p.href}">${icon("phone", { size: 16 })}<span>${p.label}</span></a></li>`)}
          <li>${icon("pin", { size: 16 })}<span>${c.address}</span></li>
        </ul>
      </div>
    </div>
    <div class="container site-footer__base">
      <p>© ${new Date().getFullYear()} ${site.company}. ${site.name} is a service of ${site.companyShort}.</p>
      <a href="${c.website.href}" rel="noopener" target="_blank">${c.website.label}</a>
    </div>
  </footer>`;
}

export function layout({ path, title = site.seo.title, description = site.seo.description, assets, bodyClass, content }) {
  return `<!doctype html>\n${html`<html lang="en-IN">
  ${head({ title, description, path, assets })}
  <body${attr("class", bodyClass)}${attr("data-draft", flags.showPlaceholders || flags.showUnverified ? "true" : null)}>
    <a class="skip-link" href="#main">Skip to content</a>
    ${header({ path })}
    <main id="main" tabindex="-1">${content}</main>
    ${footer()}
  </body>
</html>`}\n`;
}
