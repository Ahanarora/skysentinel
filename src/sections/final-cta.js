import { html } from "../lib/html.js";
import { finalCta as f } from "../content/home.js";
import { site } from "../content/site.js";
import { icon } from "../components/icons.js";
import { demoButton } from "../components/ui.js";
import { consoleVisual } from "../components/console.js";

export function finalCtaSection() {
  const c = site.contact;
  return html`<section class="section section--dark final-cta" id="${f.id}" aria-labelledby="${f.id}-title">
    <div class="container final-cta__grid">
      <div class="final-cta__copy">
        <h2 class="final-cta__title" id="${f.id}-title">${f.headline}</h2>
        <p class="final-cta__body">${f.body}</p>
        ${demoButton({ track: "final", size: "lg" })}
        <p class="final-cta__contact">
          Or talk to us directly:
          <a href="${c.phones[0].href}">${icon("phone", { size: 15 })}${c.phones[0].label}</a>
          <a href="mailto:${c.email}">${icon("mail", { size: 15 })}${c.email}</a>
        </p>
      </div>
      <div class="final-cta__visual">${consoleVisual({ variant: "compact" })}</div>
    </div>
  </section>`;
}
