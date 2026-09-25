import { html } from "../lib/html.js";
import { hero } from "../content/home.js";
import { proof } from "../content/home.js";
import { icon } from "../components/icons.js";
import { button, demoButton } from "../components/ui.js";
import { consoleVisual } from "../components/console.js";

export function heroSection() {
  // The hero logo strip only appears once real, approved logos exist.
  const logos = proof.logos.filter((l) => !l.placeholder && l.src);

  return html`<section class="hero" aria-labelledby="hero-title">
    <div class="container hero__grid">
      <div class="hero__copy">
        <p class="eyebrow">${hero.eyebrow}</p>
        <h1 class="hero__title" id="hero-title">${hero.headline}</h1>
        <p class="hero__sub">${hero.subheadline}</p>
        <div class="hero__actions">
          ${demoButton({ track: "hero", size: "lg" })}
          ${button({ ...hero.secondaryCta, variant: "ghost", size: "lg", track: "see-how-it-works:hero" })}
        </div>
        ${hero.reassurance && html`<p class="hero__reassure">${icon("check", { size: 16 })}<span>${hero.reassurance}</span></p>`}
      </div>
      <div class="hero__visual">${consoleVisual({ variant: "hero" })}</div>
    </div>
    ${logos.length > 0 &&
    html`<div class="container hero__logos">
      <p class="hero__logos-label">Trusted by</p>
      <ul class="logo-row">
        ${logos.map((l) => html`<li><img src="${l.src}" alt="${l.name}" width="${l.width}" height="${l.height}" loading="lazy" /></li>`)}
      </ul>
    </div>`}
  </section>`;
}
