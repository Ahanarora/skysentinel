// Client entry point. Every feature is progressive enhancement: the page is
// complete and readable without JavaScript.

import { initAnalytics } from "./analytics.js";
import { initNav } from "./nav.js";
import { initClocks } from "./clock.js";
import { initBlindSpot } from "./blind-spot.js";
import { initWall } from "./monitoring-wall.js";
import { initTabs } from "./tabs.js";
import { initDemoForm } from "./demo-form.js";

const each = (selector, init) => document.querySelectorAll(selector).forEach((el) => init(el));

initAnalytics();
initNav();
initClocks();
each("[data-blindspot]", initBlindSpot);
each("[data-wall]", initWall);
each("[data-tabs]", initTabs);
each("[data-demo-form]", initDemoForm);
