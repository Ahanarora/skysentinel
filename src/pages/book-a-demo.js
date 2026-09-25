import { html } from "../lib/html.js";
import { site } from "../content/site.js";
import { layout } from "../components/layout.js";
import { icon } from "../components/icons.js";

export const path = "/book-a-demo";

// Short, focused demo request. Submission goes to `site.demoForm.endpoint`
// when configured; otherwise the client script falls back to a pre-filled
// email so no enquiry is lost (see src/scripts/demo-form.js).

const field = ({ name, label, type = "text", required = false, autocomplete, hint, inputmode }) => html`<div class="field">
  <label for="f-${name}">${label}${required ? html`<span class="field__req" aria-hidden="true">*</span>` : html`<span class="field__opt">Optional</span>`}</label>
  <input id="f-${name}" name="${name}" type="${type}" ${required ? "required" : ""} ${autocomplete ? html`autocomplete="${autocomplete}"` : ""} ${inputmode ? html`inputmode="${inputmode}"` : ""} ${hint ? html`aria-describedby="f-${name}-hint"` : ""} />
  ${hint && html`<p class="field__hint" id="f-${name}-hint">${hint}</p>`}
  <p class="field__error" id="f-${name}-error" hidden></p>
</div>`;

export function render(assets) {
  const c = site.contact;
  return layout({
    path,
    assets,
    title: `Book a demo | ${site.name}`,
    description: `See how ${site.name} would monitor your sites and turn what your cameras see into tracked, accountable incidents.`,
    bodyClass: "page-demo",
    content: html`<section class="section demo-page">
      <div class="container demo-page__grid">
        <div class="demo-page__intro">
          <p class="eyebrow">${site.primaryCta.label}</p>
          <h1 class="demo-page__title">See Promind 360 on your operations.</h1>
          <p class="demo-page__lead">Tell us about your sites. We’ll show you how monitoring, detection and incident tracking would work across them.</p>
          <ul class="demo-page__list">
            <li>${icon("check", { size: 18 })}<span>How our Surveillance Centre would monitor your sites</span></li>
            <li>${icon("check", { size: 18 })}<span>The analytics management would see across locations</span></li>
            <li>${icon("check", { size: 18 })}<span>How incidents are recorded, escalated and reported</span></li>
          </ul>
          <div class="demo-page__contact">
            <p class="demo-page__contact-label">Prefer to talk now?</p>
            <p><strong>${c.person}</strong>, ${c.role}</p>
            <p><a href="${c.phones[0].href}">${icon("phone", { size: 16 })}${c.phones[0].label}</a></p>
            <p><a href="mailto:${c.email}">${icon("mail", { size: 16 })}${c.email}</a></p>
          </div>
        </div>

        <form class="demo-form" data-demo-form data-endpoint="${site.demoForm.endpoint}" data-fallback-email="${c.email}" novalidate>
          <h2 class="demo-form__title">Request a demo</h2>
          <div class="demo-form__grid">
            ${field({ name: "name", label: "Full name", required: true, autocomplete: "name" })}
            ${field({ name: "company", label: "Company", required: true, autocomplete: "organization" })}
            ${field({ name: "email", label: "Work email", type: "email", required: true, autocomplete: "email" })}
            ${field({ name: "phone", label: "Phone", type: "tel", required: true, autocomplete: "tel" })}
            ${field({ name: "sites", label: "Number of sites", inputmode: "numeric" })}
            ${field({ name: "cameras", label: "Approx. number of cameras", inputmode: "numeric" })}
          </div>
          <div class="field">
            <label for="f-message">What would you like to see? <span class="field__opt">Optional</span></label>
            <textarea id="f-message" name="message" rows="4"></textarea>
          </div>
          <div class="demo-form__hp" aria-hidden="true">
            <label for="f-website">Leave this field empty</label>
            <input id="f-website" name="website" type="text" tabindex="-1" autocomplete="off" />
          </div>
          <button class="btn btn--primary btn--lg demo-form__submit" type="submit"><span>${site.primaryCta.label}</span>${icon("arrowRight", { size: 18 })}</button>
          <p class="demo-form__status" role="status" aria-live="polite" data-form-status></p>
        </form>
      </div>
    </section>`,
  });
}
