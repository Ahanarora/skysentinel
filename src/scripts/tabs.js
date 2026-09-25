// Accessible tabs (WAI-ARIA Tabs pattern, automatic activation).
// Server-rendered markup shows every panel; this upgrades it to tabs.

export function initTabs(root) {
  const list = root.querySelector("[data-tab-list]");
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const panels = [...root.querySelectorAll("[data-tab-panel]")];
  if (!list || tabs.length < 2) return;

  list.hidden = false;
  root.classList.add("is-enhanced");
  panels.forEach((panel) => panel.setAttribute("tabindex", "0"));

  const select = (index, focus = false) => {
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
    });
    if (focus) {
      tabs[index].focus();
      tabs[index].scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(i));
    tab.addEventListener("keydown", (event) => {
      const last = tabs.length - 1;
      const next = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[event.key];
      if (next === undefined) return;
      event.preventDefault();
      select(next, true);
    });
  });

  select(Math.max(0, tabs.findIndex((t) => t.getAttribute("aria-selected") === "true")));
}
