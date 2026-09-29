import { html } from "../lib/html.js";
import { visible } from "../lib/flags.js";
import { about as a } from "../content/home.js";
import { draftMarker, sectionHead } from "../components/ui.js";

export function aboutSection() {
  const credentials = visible(a.credentials);
  return html`<section class="section section--tint about-section" id="${a.id}" aria-labelledby="${a.id}-title">
    <div class="container about-section__grid">
      <div>
        ${sectionHead({ headline: a.headline, body: a.body, id: `${a.id}-title` })}
        ${credentials.length > 0 &&
        html`<dl class="credentials">
          ${credentials.map((c) => html`<div class="credential"><dt>${c.label} ${draftMarker(c)}</dt><dd>${c.value}</dd></div>`)}
        </dl>`}
      </div>
      ${a.logo && html`<a class="about-section__brand" href="${a.logo.href}" target="_blank" rel="noreferrer" aria-label="Visit ProMind Solutions">
        <img src="${a.logo.src}" alt="${a.logo.alt}" width="${a.logo.width}" height="${a.logo.height}" loading="lazy" />
      </a>`}
    </div>
  </section>`;
}
