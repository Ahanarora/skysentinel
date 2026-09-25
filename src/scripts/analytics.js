// Provider-agnostic analytics hooks.
// TODO(integration): once a provider is chosen (see site.analytics in
// src/content/site.js), load its snippet in the layout. Events are already
// pushed to `window.dataLayer` (Google Tag Manager compatible) and dispatched
// as a `promind:track` DOM event for any other listener.

export function track(event, properties = {}) {
  const payload = { event, ...properties };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  document.dispatchEvent(new CustomEvent("promind:track", { detail: payload }));
}

export function initAnalytics() {
  // Any element with data-track="name:placement" reports its clicks.
  document.addEventListener("click", (event) => {
    const el = event.target.closest("[data-track]");
    if (!el) return;
    const [name, placement] = el.dataset.track.split(":");
    track("cta_click", { cta: name, placement, href: el.getAttribute("href") });
  });
}
