import { html } from "../lib/html.js";
import { layout } from "../components/layout.js";
import { heroSection } from "../sections/hero.js";
import { blindSpotSection } from "../sections/blind-spot.js";
import { monitoringWallSection } from "../sections/monitoring-wall.js";
import { operatingModelSection } from "../sections/operating-model.js";
import { workflowSection } from "../sections/workflow.js";
import { commandCenterSection } from "../sections/command-center.js";
import { healthSection, securitySection } from "../sections/health.js";
import { multiSiteSectionView } from "../sections/multi-site.js";
import { businessCaseSection } from "../sections/business-case.js";
import { solutionsSection } from "../sections/solutions.js";
import { proofSection } from "../sections/proof.js";
import { aboutSection } from "../sections/about.js";
import { finalCtaSection } from "../sections/final-cta.js";

export const path = "/";

// The homepage is the sales narrative, in order. Reorder or remove sections here.
const sections = [
  heroSection, // 1. What Promind 360 is
  blindSpotSection, // 2. The problem: management blind spot
  monitoringWallSection, // 3. What it sees: Surveillance Centre-led monitoring
  operatingModelSection, // 4. Surveillance Centre at the core, AI as add-on
  workflowSection, // 5. How it works (pending approval)
  commandCenterSection, // 6. The platform
  healthSection, // 7. Health check & automated alerts
  securitySection, // 8. Data security & privacy
  multiSiteSectionView, // 9. Multi-site control
  businessCaseSection, // 10. Benefits
  solutionsSection, // 11. Industries (pending approval)
  proofSection, // 12. Proof
  aboutSection, // 13. Why Promind
  finalCtaSection, // 14. Book a demo
];

export function render(assets) {
  return layout({
    path,
    assets,
    bodyClass: "page-home",
    content: html`${sections.map((section) => section())}`,
  });
}
