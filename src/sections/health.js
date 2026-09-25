import { html, cx } from "../lib/html.js";
import { health as h, security as sec } from "../content/home.js";
import { deviceHealth } from "../content/demo-data.js";
import { icon } from "../components/icons.js";
import { sectionHead } from "../components/ui.js";

// Health check & alerts: camera/DVR uptime panel (demo data) with an
// automated-alert card, beside three short points. Followed by a compact
// data security & privacy band.

const DAY_STATE = { 1: "up", 0.5: "partial", 0: "down" };

function uptimeBars(days, label) {
  return html`<span class="uptime" role="img" aria-label="${label}">
    ${days.map((d) => html`<span class="uptime__day uptime__day--${DAY_STATE[d]}"></span>`)}
  </span>`;
}

function panel() {
  const { kpis, devices, alert } = deviceHealth;
  return html`<figure class="hc">
    <figcaption class="visually-hidden">
      Illustrative device health panel with demo data: uptime for cameras and DVRs, with an automated alert for a
      DVR that has gone offline.
    </figcaption>
    <div class="hc__panel">
      <div class="hc__bar">
        <p>${icon("pulse", { size: 16 })}Device health</p>
        <span class="hc__demo">Demo data</span>
      </div>
      <dl class="hc__kpis">
        ${kpis.map((k) => html`<div class="${cx("hc__kpi", k.tone && `hc__kpi--${k.tone}`)}"><dt>${k.label}</dt><dd>${k.value}</dd></div>`)}
      </dl>
      <ul class="hc__list">
        ${devices.map(
          (d) => html`<li class="${cx("hc__row", `hc__row--${d.status}`)}">
            <span class="hc__device">${icon(d.kind, { size: 16 })}<span><strong>${d.name}</strong><small>${d.site}</small></span></span>
            ${uptimeBars(d.days, `${d.name}, last 14 days`)}
            <span class="hc__uptime">${d.uptime}</span>
            <span class="hc__status">${d.status === "online" ? "Online" : "Offline"}</span>
          </li>`
        )}
      </ul>
      <p class="hc__legend" aria-hidden="true">Last 14 days <span class="uptime__day uptime__day--up"></span>Up <span class="uptime__day uptime__day--partial"></span>Partial <span class="uptime__day uptime__day--down"></span>Down</p>
    </div>
    <div class="hc__alert" aria-hidden="true">
      <span class="hc__alert-icon">${icon("bell", { size: 18 })}</span>
      <div>
        <p class="hc__alert-kicker">Automated alert</p>
        <p class="hc__alert-title">${alert.title}</p>
        <p class="hc__alert-meta">${alert.meta}</p>
        <p class="hc__alert-action">${icon("check", { size: 14 })}${alert.action}</p>
      </div>
    </div>
  </figure>`;
}

export function healthSection() {
  return html`<section class="section health-section" id="${h.id}" aria-labelledby="${h.id}-title">
    <div class="container health-section__grid">
      <div>
        ${sectionHead({ eyebrow: h.eyebrow, headline: h.headline, body: h.body, id: `${h.id}-title` })}
        <ul class="feature-list">
          ${h.points.map(
            (p) => html`<li><span class="feature-list__icon">${icon(p.icon, { size: 20 })}</span><div><h3>${p.title}</h3><p>${p.body}</p></div></li>`
          )}
        </ul>
      </div>
      <div>
        ${panel()}
        <p class="section-note">${h.note}</p>
      </div>
    </div>
  </section>`;
}

export function securitySection() {
  return html`<section class="security section--tint" id="${sec.id}" aria-labelledby="${sec.id}-title">
    <div class="container security__inner">
      <div class="security__head">
        <span class="security__badge">${icon("shield", { size: 28 })}</span>
        <div>
          <p class="eyebrow">${sec.eyebrow}</p>
          <h2 class="security__title" id="${sec.id}-title">${sec.headline}</h2>
        </div>
      </div>
      <ul class="security__points">
        ${sec.points.map((p) => html`<li>${icon(p.icon, { size: 20 })}<div><h3>${p.title}</h3><p>${p.body}</p></div></li>`)}
      </ul>
    </div>
  </section>`;
}
