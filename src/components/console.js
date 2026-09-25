import { html, cx } from "../lib/html.js";
import { heroConsole } from "../content/demo-data.js";
import { cctvView } from "./cctv.js";
import { detectionBadge, severityBadge, statusLabel, resolveEvent, wordmark } from "./ui.js";

// "Signals in, control out": camera feeds from several sites flow into the
// Promind 360 incident feed. Used in the hero and the final CTA.
// Purely illustrative, so it is hidden from assistive tech and described by
// a visually hidden caption instead.

export function consoleVisual({ variant = "hero" } = {}) {
  const { feeds, incidents, summary } = heroConsole;
  return html`<figure class="${cx("flow", `flow--${variant}`)}" data-flow>
    <figcaption class="visually-hidden">
      Illustration: camera feeds from several sites flow into the Promind 360 incident feed, where each issue is
      logged with its site, camera, severity and status.
    </figcaption>
    <div class="flow__inner" aria-hidden="true">
      <ul class="flow__feeds">
        ${feeds.map(
          (f, i) => html`<li class="${cx("flow__feed", f.alert && `flow__feed--${f.alert}`)}" style="--i:${i}">
            ${cctvView({ ...f, compact: true, detection: f.alert })}
            <span class="flow__wire"><span class="flow__pulse"></span></span>
          </li>`
        )}
      </ul>
      <div class="flow__bus"><span class="flow__pulse flow__pulse--down"></span></div>
      <div class="console">
        <div class="console__bar">
          ${wordmark({ onDark: true, height: 26 })}
          <span class="console__title">Incident feed</span>
          <span class="console__demo">Demo data</span>
        </div>
        <ol class="console__list">
          ${incidents.map((raw, i) => {
            const e = resolveEvent(raw);
            return html`<li class="console__row" style="--i:${i}">
              <div class="console__row-main">
                ${detectionBadge(e.detection, { short: true })}
                <p class="console__row-title">${e.title}</p>
                <p class="console__row-meta">${e.site} · ${e.camera} · ${e.time}</p>
              </div>
              <div class="console__row-side">${severityBadge(e.severity)} ${statusLabel(e.status)}</div>
            </li>`;
          })}
        </ol>
        <dl class="console__summary">
          ${summary.map((s) => html`<div><dt>${s.label}</dt><dd>${s.value}</dd></div>`)}
        </dl>
      </div>
    </div>
  </figure>`;
}
