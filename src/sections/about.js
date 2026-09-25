import { html } from "../lib/html.js";
import { isVisible, visible } from "../lib/flags.js";
import { about as a } from "../content/home.js";
import { assetSlot, draftMarker, sectionHead } from "../components/ui.js";

export function aboutSection() {
  const credentials = visible(a.credentials);
  return html`<section class="section section--tint about-section" id="${a.id}" aria-labelledby="${a.id}-title">
    <div class="container about-section__grid">
      <div>
        ${sectionHead({ eyebrow: a.eyebrow, headline: a.headline, body: a.body, id: `${a.id}-title` })}
        ${credentials.length > 0 &&
        html`<dl class="credentials">
          ${credentials.map((c) => html`<div class="credential"><dt>${c.label} ${draftMarker(c)}</dt><dd>${c.value}</dd></div>`)}
        </dl>`}
      </div>
      ${isVisible(a.visual) && assetSlot({ label: a.visual.label, ratio: "4 / 3.4", className: "about-section__visual" })}
    </div>
  </section>`;
}
