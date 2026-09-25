import { html, cx } from "../lib/html.js";
import { multiSiteSection as m } from "../content/home.js";
import { multiSite } from "../content/demo-data.js";
import { icon } from "../components/icons.js";
import { sectionHead, wordmark } from "../components/ui.js";

// Sites → Promind 360 → one management view. All figures are demo data.

function sparkline(values, label) {
  const w = 84;
  const h = 24;
  const pad = 3;
  const max = Math.max(...values, 1);
  const step = (w - pad * 2) / (values.length - 1);
  const pts = values.map((v, i) => [pad + i * step, h - pad - (v / max) * (h - pad * 2)]);
  const [lx, ly] = pts[pts.length - 1];
  return html`<svg class="spark" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${label}">
    <polyline points="${pts.map((pt) => pt.join(",")).join(" ")}" />
    <circle cx="${lx}" cy="${ly}" r="3" />
  </svg>`;
}

function dashboard() {
  return html`<div class="ms-dash">
    <div class="ms-dash__bar">
      ${wordmark({ onDark: true, height: 26 })}
      <span class="ms-dash__title">All sites</span>
      <span class="ms-dash__demo">Demo data</span>
    </div>
    <dl class="ms-kpis">
      ${multiSite.kpis.map((k) => html`<div class="${cx("ms-kpi", k.tone && `ms-kpi--${k.tone}`)}"><dt>${k.label}</dt><dd>${k.value}</dd></div>`)}
    </dl>
    <table class="ms-table">
      <caption class="visually-hidden">Demo data: open and critical issues by site, with incidents per day over the last 7 days</caption>
      <thead>
        <tr><th scope="col">Site</th><th scope="col" class="ms-table__cams">Cameras</th><th scope="col">Open</th><th scope="col">Critical</th><th scope="col">Last 7 days</th></tr>
      </thead>
      <tbody>
        ${multiSite.sites.map(
          (s) => html`<tr>
            <th scope="row">${s.name}</th>
            <td class="ms-table__cams">${s.cameras}</td>
            <td>${s.open}</td>
            <td>${s.critical > 0 ? html`<span class="ms-crit">${icon("alert", { size: 13 })}${s.critical}</span>` : "0"}</td>
            <td>${sparkline(s.week, `${s.name} incidents per day: ${s.week.join(", ")}`)}</td>
          </tr>`
        )}
      </tbody>
    </table>
  </div>`;
}

export function multiSiteSectionView() {
  const n = multiSite.sites.length;
  return html`<section class="section section--dark ms-section" id="${m.id}" aria-labelledby="${m.id}-title">
    <div class="container">
      <div class="ms-section__head">
        ${sectionHead({ eyebrow: m.eyebrow, headline: m.headline, body: m.body, id: `${m.id}-title` })}
        <ul class="ms-points">
          ${m.points.map((pt) => html`<li><h3>${pt.title}</h3><p>${pt.body}</p></li>`)}
        </ul>
      </div>

      <div class="ms-diagram">
        <div class="ms-feed">
        <ul class="ms-sites" aria-label="Sites (demo)">
          ${multiSite.sites.map(
            (s) => html`<li class="ms-site">${icon("building", { size: 18 })}<span class="ms-site__name">${s.name}</span><span class="ms-site__cams">${s.cameras} cams</span></li>`
          )}
        </ul>
        <svg class="ms-wires" viewBox="0 0 100 ${n * 100}" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          ${multiSite.sites.map((_, i) => {
            const y = i * 100 + 50;
            const mid = (n * 100) / 2;
            return html`<path d="M0 ${y} C 55 ${y}, 45 ${mid}, 100 ${mid}" />`;
          })}
        </svg>
        </div>
        <div class="ms-hub" aria-hidden="true">
          <span class="ms-hub__ring"></span>
          ${wordmark({ onDark: true, height: 34 })}
          <span class="ms-hub__sub">Surveillance Centre · Platform</span>
        </div>
        <span class="ms-link" aria-hidden="true"></span>
        ${dashboard()}
      </div>
      <p class="section-note">${m.note}</p>
    </div>
  </section>`;
}
