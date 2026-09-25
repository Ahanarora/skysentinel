// Ticks simulated camera clocks (elements with data-clock, "HH:MM:SS")
// while they are on screen. A changing timestamp is text, not motion, so it
// runs under reduced-motion preferences too.

export function initClocks() {
  const clocks = [...document.querySelectorAll("[data-clock]")];
  if (!clocks.length) return;

  const toSeconds = (text) => text.split(":").reduce((total, part) => total * 60 + Number(part), 0);
  const format = (s) =>
    [Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60].map((n) => String(n).padStart(2, "0")).join(":");

  const state = clocks.map((el) => ({ el, seconds: toSeconds(el.textContent.trim()), visible: false }));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const item = state.find((s) => s.el === entry.target);
      if (item) item.visible = entry.isIntersecting;
    });
  });
  state.forEach((s) => observer.observe(s.el));

  setInterval(() => {
    state.forEach((s) => {
      s.seconds += 1;
      if (s.visible) s.el.textContent = format(s.seconds);
    });
  }, 1000);
}
