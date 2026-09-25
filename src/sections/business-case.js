import { html } from "../lib/html.js";
import { businessCase as b } from "../content/home.js";
import { icon } from "../components/icons.js";
import { demoButton, sectionHead } from "../components/ui.js";

// Benefits, told visually: a before/after strip, four icon tiles and a
// diagram of the cost argument (a supervisor per site vs one Surveillance
// Centre across every site). Copy stays to a few words per item.

function comparison() {
  const [before, after] = b.comparison.columns;
  return html`<div class="vs">
    <div class="vs__head" aria-hidden="true">
      <p class="vs__col vs__col--before">${before}</p>
      <span></span>
      <p class="vs__col vs__col--after">${after}</p>
    </div>
    <ul class="vs__rows">
      ${b.comparison.rows.map(
        (r) => html`<li class="vs__row">
          <p class="vs__before"><span class="visually-hidden">${r.aspect}, ${before}: </span>${icon("x", { size: 16 })}<span>${r.before}</span></p>
          <p class="vs__aspect" aria-hidden="true">${icon(r.icon, { size: 18 })}<span>${r.aspect}</span></p>
          <p class="vs__after"><span class="visually-hidden">${after}: </span>${icon("check", { size: 16 })}<span>${r.after}</span></p>
        </li>`
      )}
    </ul>
  </div>`;
}

function costVisual() {
  const { cost } = b;
  const sites = Array.from({ length: cost.sites });
  const x = (i) => ((i + 0.5) / cost.sites) * 100;
  return html`<div class="cost">
    <div class="cost__copy">
      <p class="cost__title">${icon("chart", { size: 18 })}<span>${cost.title}</span></p>
      <p class="cost__body">${cost.body}</p>
    </div>
    <figure class="cost__visual">
      <figcaption class="visually-hidden">${cost.before}, compared with ${cost.after}.</figcaption>
      <div class="cost__panel cost__panel--before" aria-hidden="true">
        <ul class="cost__sites">
          ${sites.map(() => html`<li><span class="cost__sup">${icon("user", { size: 16 })}</span>${icon("building", { size: 22 })}</li>`)}
        </ul>
        <p class="cost__label">${cost.before}</p>
      </div>
      <div class="cost__panel cost__panel--after" aria-hidden="true">
        <span class="cost__hub">${icon("headset", { size: 22 })}</span>
        <svg class="cost__wires" viewBox="0 0 100 40" preserveAspectRatio="none" focusable="false">
          ${sites.map((_, i) => html`<path d="M50 0 C 50 22, ${x(i)} 18, ${x(i)} 40" />`)}
        </svg>
        <ul class="cost__sites">
          ${sites.map(() => html`<li>${icon("building", { size: 22 })}</li>`)}
        </ul>
        <p class="cost__label">${cost.after}</p>
      </div>
    </figure>
  </div>`;
}

export function businessCaseSection() {
  return html`<section class="section business-section" id="${b.id}" aria-labelledby="${b.id}-title">
    <div class="container">
      ${sectionHead({ eyebrow: b.eyebrow, headline: b.headline, id: `${b.id}-title` })}
      ${comparison()}

      <ul class="benefits">
        ${b.outcomes.map(
          (o) => html`<li class="benefit">
            <span class="benefit__icon">${icon(o.icon, { size: 24 })}</span>
            <h3>${o.title}</h3>
            <p>${o.body}</p>
          </li>`
        )}
      </ul>

      ${costVisual()}

      <div class="business-section__cta">
        <p>${b.costNote}</p>
        ${demoButton({ track: "business-case", variant: "secondary" })}
      </div>
    </div>
  </section>`;
}
