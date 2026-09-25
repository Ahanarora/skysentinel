// Monitoring wall: detection-source filter, event log ↔ tile linking, and a
// one-time sequenced reveal of events when the wall scrolls into view.

const STEP = 750; // ms between events appearing

export function initWall(layout) {
  const section = layout.closest("section");
  const filter = section?.querySelector("[data-wall-filter]");
  const tiles = [...layout.querySelectorAll("[data-event]")];
  const logItems = [...layout.querySelectorAll("[data-log-for]")];

  // Filter by detection source.
  filter?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;
    filter.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    const value = button.dataset.filter;
    if (value === "all") delete layout.dataset.filter;
    else layout.dataset.filter = value;
  });

  // Hovering a log entry highlights its camera.
  logItems.forEach((item) => {
    const tile = document.getElementById(item.dataset.logFor);
    if (!tile) return;
    item.addEventListener("mouseenter", () => tile.classList.add("is-linked"));
    item.addEventListener("mouseleave", () => tile.classList.remove("is-linked"));
  });

  // Sequenced reveal (skipped for reduced motion: everything is shown).
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !tiles.length) return;
  layout.classList.add("is-armed");

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      logItems.forEach((item, i) => {
        setTimeout(() => {
          document.getElementById(item.dataset.logFor)?.classList.add("is-alert");
          item.classList.add("is-in");
          if (i === logItems.length - 1) setTimeout(() => layout.classList.remove("is-armed"), 600);
        }, 400 + i * STEP);
      });
    },
    { threshold: 0.35 }
  );
  observer.observe(layout);
}
