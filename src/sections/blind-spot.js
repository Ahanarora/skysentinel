import { html, cx } from "../lib/html.js";
import { blindSpot } from "../content/home.js";
import { icon } from "../components/icons.js";
import { sectionHead } from "../components/ui.js";

// Static starting state (also the no-JS / reduced-motion state): management
// attention on the first site; events elsewhere go unseen.
const SEEDED_MISSED = { 1: [5, 17], 2: [9], 3: [2, 14, 21] };
const SEEDED_SEEN = { 0: [11] };

export function blindSpotSection() {
  const { visual } = blindSpot;
  const sites = Array.from({ length: visual.sites }, (_, s) => s);
  const cams = Array.from({ length: visual.camerasPerSite }, (_, c) => c);

  return html`<section class="section blindspot" id="${blindSpot.id}" aria-labelledby="${blindSpot.id}-title">
    <div class="container">
      <div class="blindspot__grid">
        <div class="blindspot__copy">
          ${sectionHead({ eyebrow: blindSpot.eyebrow, headline: blindSpot.headline, id: `${blindSpot.id}-title` })}
          <ol class="blindspot__points">
            ${blindSpot.points.map(
              (p, i) => html`<li><span class="blindspot__n">${String(i + 1).padStart(2, "0")}</span><p><strong>${p.lead}</strong> ${p.body}</p></li>`
            )}
          </ol>
        </div>

        <figure class="bs" data-blindspot>
          <div class="bs__sites">
            ${sites.map(
              (s) => html`<div class="${cx("bs__site", s === 0 && "is-attended")}" data-site="${s}">
                <p class="bs__site-label">${icon("building", { size: 14 })}<span>Site ${String(s + 1).padStart(2, "0")}</span></p>
                <ul class="bs__cams" aria-hidden="true">
                  ${cams.map((c) => {
                    const state = SEEDED_MISSED[s]?.includes(c) ? "is-missed" : SEEDED_SEEN[s]?.includes(c) ? "is-seen" : "";
                    return html`<li class="${cx("bs__cam", state)}"></li>`;
                  })}
                </ul>
                <span class="bs__attention" aria-hidden="true">Manager’s attention</span>
              </div>`
            )}
          </div>
          <div class="bs__footer">
            <ul class="bs__legend">
              <li><span class="bs__key bs__key--cam"></span>Camera recording</li>
              <li><span class="bs__key bs__key--seen"></span>Event seen</li>
              <li><span class="bs__key bs__key--missed"></span>Event nobody saw</li>
            </ul>
            <button class="bs__toggle" type="button" data-motion-toggle hidden>
              <span class="bs__toggle-pause">${icon("pause", { size: 14 })}Pause</span>
              <span class="bs__toggle-play">${icon("play", { size: 14 })}Play</span>
            </button>
          </div>
          <figcaption class="bs__caption">${visual.caption}</figcaption>
        </figure>
      </div>
      <p class="blindspot__conclusion">${blindSpot.conclusion}</p>
    </div>
  </section>`;
}
