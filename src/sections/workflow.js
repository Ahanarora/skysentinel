import { html, cx } from "../lib/html.js";
import { isVisible } from "../lib/flags.js";
import { workflow as w } from "../content/home.js";
import { demoButton, sectionHead, todoTag } from "../components/ui.js";

// Flexible workflow track. Renders any number of stages from content; lanes
// and optional steps are supported so the approved process can drop in
// without code changes. While the workflow is unapproved and placeholders
// are hidden (production builds), the section falls back to a short prompt
// to see the process in a demo.

const LANES = { client: "Your team", centre: "Surveillance Centre", ai: "AI", platform: "Platform" };

export function workflowSection() {
  const ready = isVisible(w);
  return html`<section class="section workflow-section" id="${w.id}" aria-labelledby="${w.id}-title">
    <div class="container">
      ${sectionHead({
        headline: w.headline,
        body: ready ? w.body : "We’ll walk you through the operating process for your sites in a demo.",
        id: `${w.id}-title`,
      })}
      ${ready
        ? html`${w.placeholder && html`<p class="draft-notice">${todoTag("Pending approval")} ${w.draftNotice}</p>`}
            <ol class="${cx("workflow", w.placeholder && "workflow--placeholder")}" style="--steps:${w.stages.length}">
              ${w.stages.map(
                (s, i) => html`<li class="${cx("workflow__step", s.optional && "workflow__step--optional")}">
                  <span class="workflow__index">${String(i + 1).padStart(2, "0")}</span>
                  ${s.lane && html`<span class="workflow__lane workflow__lane--${s.lane}">${LANES[s.lane] ?? s.lane}</span>`}
                  <h3 class="workflow__title">${s.title}</h3>
                  ${s.body && html`<p class="workflow__body">${s.body}</p>`}
                  ${s.optional && html`<p class="workflow__optional">Where applicable</p>`}
                </li>`
              )}
            </ol>`
        : html`<div class="workflow-fallback">${demoButton({ track: "workflow" })}</div>`}
    </div>
  </section>`;
}
