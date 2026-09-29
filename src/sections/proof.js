import { html } from "../lib/html.js";
import { isVisible, visible } from "../lib/flags.js";
import { proof as p } from "../content/home.js";
import { icon } from "../components/icons.js";
import { draftMarker, sectionHead } from "../components/ui.js";

// Proof components: logo strip, metrics, testimonial, case study.
// Each renders only when it has visible content; the section disappears
// entirely (and its nav link with it) when none does.

// Heading and nav label: "Case studies" once a case study is published,
// otherwise the shorter `withoutCaseStudy` variant.
export const proofHeading = () => (isVisible(p.caseStudy) ? { ...p, navLabel: null } : { ...p, ...p.withoutCaseStudy });

export const proofHasContent = () =>
  visible(p.logos).length > 0 || visible(p.metrics).length > 0 || isVisible(p.testimonial) || isVisible(p.caseStudy);

function logoStrip() {
  const logos = visible(p.logos);
  if (!logos.length) return "";
  return html`<div class="proof-logos">
    <div class="proof-logos__head">
      <p class="proof-logos__label">${p.logoLabel ?? "Customers"} ${logos.some((l) => l.placeholder) && draftMarker({ placeholder: true })}</p>
      ${p.logoSource && html`<a href="${p.logoSource.href}" target="_blank" rel="noreferrer">${p.logoSource.label}</a>`}
    </div>
    <ul class="logo-row">
      ${logos.map((l) =>
        l.src
          ? html`<li><img src="${l.src}" alt="${l.name}" width="${l.width}" height="${l.height}" loading="lazy" /></li>`
          : html`<li class="logo-slot">${l.name}</li>`
      )}
    </ul>
  </div>`;
}

function metrics() {
  const items = visible(p.metrics);
  if (!items.length) return "";
  return html`<dl class="metrics">
    ${items.map((m) => html`<div class="metric"><dt>${m.label} ${draftMarker(m)}</dt><dd>${m.value}</dd></div>`)}
  </dl>`;
}

function testimonial() {
  const t = p.testimonial;
  if (!isVisible(t)) return "";
  return html`<figure class="testimonial">
    ${icon("quote", { size: 28, className: "testimonial__mark" })}
    <blockquote><p>${t.quote}</p></blockquote>
    <figcaption><strong>${t.name}</strong><span>${t.role}</span> ${draftMarker(t)}</figcaption>
  </figure>`;
}

function caseStudy() {
  const c = p.caseStudy;
  if (!isVisible(c)) return "";
  return html`<article class="case">
    <header class="case__head">
      ${draftMarker(c)}
      <h3 class="case__customer">${c.customer}</h3>
      <p class="case__context">${c.context}</p>
    </header>
    <ol class="case__stages">
      ${c.stages.map((s) => html`<li><h4>${s.label}</h4><p>${s.body}</p></li>`)}
    </ol>
  </article>`;
}

export function proofSection() {
  if (!proofHasContent()) return "";
  const heading = proofHeading();
  return html`<section class="section proof-section" id="${p.id}" aria-labelledby="${p.id}-title">
    <div class="container">
      ${sectionHead({ headline: heading.headline, id: `${p.id}-title` })}
      ${logoStrip()} ${metrics()}
      <div class="proof-section__stories">${caseStudy()} ${testimonial()}</div>
    </div>
  </section>`;
}
