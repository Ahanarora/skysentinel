// Management blind spot illustration: events keep happening across every
// site's cameras while management attention moves from one site to the next.
// Events inside the attended site are seen; everything else goes unseen.
// Reduced motion: the server-rendered static state is kept as is.

const EVENT_EVERY = 1100; // ms between new events
const MOVE_EVERY = 4; // attention moves every N events
const REVEAL_AFTER = 900; // ms an event stays "live" before it resolves
const MAX_MARKED = 14; // cap on marked cameras so the grid stays legible

export function initBlindSpot(root) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const sites = [...root.querySelectorAll(".bs__site")];
  const toggle = root.querySelector("[data-motion-toggle]");
  if (!sites.length) return;

  let attended = sites.findIndex((s) => s.classList.contains("is-attended"));
  let count = 0;
  let timer = null;
  let inView = false;
  let paused = false;
  const marked = [...root.querySelectorAll(".bs__cam.is-seen, .bs__cam.is-missed")];

  const moveAttention = () => {
    sites[attended].classList.remove("is-attended");
    attended = (attended + 1) % sites.length;
    sites[attended].classList.add("is-attended");
  };

  const raiseEvent = () => {
    const siteIndex = Math.floor(Math.random() * sites.length);
    const free = sites[siteIndex].querySelectorAll(".bs__cam:not(.is-event):not(.is-seen):not(.is-missed)");
    if (!free.length) return;
    const cam = free[Math.floor(Math.random() * free.length)];
    cam.classList.add("is-event");
    setTimeout(() => {
      cam.classList.remove("is-event");
      cam.classList.add(siteIndex === attended ? "is-seen" : "is-missed");
      marked.push(cam);
      while (marked.length > MAX_MARKED) marked.shift().classList.remove("is-seen", "is-missed");
    }, REVEAL_AFTER);
  };

  const step = () => {
    count += 1;
    if (count % MOVE_EVERY === 0) moveAttention();
    raiseEvent();
  };

  const sync = () => {
    const shouldRun = inView && !paused && !document.hidden;
    if (shouldRun && !timer) timer = setInterval(step, EVENT_EVERY);
    if (!shouldRun && timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  if (toggle) {
    toggle.hidden = false;
    toggle.addEventListener("click", () => {
      paused = !paused;
      root.classList.toggle("is-paused", paused);
      sync();
    });
  }

  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    sync();
  }, { threshold: 0.25 }).observe(root);
  document.addEventListener("visibilitychange", sync);
}
