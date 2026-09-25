// Homepage copy and section content, in page order.
//
// Conventions
// - Keep it short: headlines under ~8 words, body copy one sentence where
//   possible. Prefer a visual over another paragraph.
// - No em dashes in copy.
// - `placeholder: true` marks a slot awaiting approved content (shown with a
//   TODO tag in draft builds, hidden in production builds).
// - `verified: false` marks a claim carried over from the previous website
//   that must be re-approved before launch (same draft/production behaviour).
// - Never add statistics, customers, capabilities or results that have not
//   been supplied and approved.
// - Positioning: the Surveillance Centre (trained operators watching live
//   feeds) is the core service and the most accurate, cost-effective way to
//   monitor. AI is a value-added service for measurement and metrics. Keep AI
//   mentions light, and say "Surveillance Centre" rather than "people" or
//   "human" for the operator-led service.

export const hero = {
  eyebrow: "24×7 Surveillance Centre · Incident platform · Operational analytics",
  headline: "Turn your CCTV into a 24×7 operational control system.",
  subheadline:
    "Our Surveillance Centre watches your sites around the clock. Every issue becomes a tracked incident management can act on.",
  secondaryCta: { label: "See how it works", href: "#what-it-sees" },
  // TODO(product): confirm compatibility specifics (NVR/VMS brands, bandwidth,
  // AI camera requirements) before strengthening this line.
  reassurance: "Can be integrated with your existing CCTV infrastructure.",
};

export const blindSpot = {
  id: "blind-spot",
  eyebrow: "The management blind spot",
  headline: ["Your managers can’t be everywhere.", "Your cameras already are."],
  points: [
    { lead: "Cameras cover every site,", body: "day and night." },
    { lead: "Managers cover one place at a time.", body: "" },
    { lead: "So footage is reviewed after the fact,", body: "once something has already gone wrong." },
  ],
  conclusion: "The information is already in your cameras. Nobody is turning it into management visibility.",
  visual: {
    // Illustration only, not a claim about any customer's estate.
    sites: 4,
    camerasPerSite: 24,
    caption: "Illustration: 4 sites, 96 cameras, one manager’s attention.",
  },
};

// Who does what. The Surveillance Centre is the core service; AI is a
// value-added layer for measurement. Keep this split prominent.
export const whatItSees = {
  id: "what-it-sees",
  eyebrow: "What Promind 360 sees",
  headline: "Trained eyes on every feed.",
  body: "Our operators know what normal looks like at your sites, so they spot what isn’t.",
  roles: [
    {
      key: "human",
      label: "Surveillance Centre",
      tag: "Core service",
      does: "Contextual observation, judgment and interpretation.",
      useCases: [
        { title: "Unauthorised access", detail: "Restricted-zone entry and access violations" },
        { title: "Uniform & PPE non-compliance", detail: "Missing uniform or required safety gear" },
        { title: "Guard negligence", detail: "Sleeping, unattended posts, phone use and inattentiveness" },
        { title: "Suspicious or inappropriate behaviour", detail: "Unusual conduct, altercations or misconduct" },
        { title: "Loitering", detail: "Unnecessary or prolonged presence in an area" },
        { title: "SOP & safety violations", detail: "Unsafe practices or deviations from procedures" },
        { title: "Operational & maintenance issues", detail: "Housekeeping, obstruction, damage, leaks and other site irregularities" },
      ],
    },
    {
      key: "ai",
      label: "AI video analytics",
      tag: "Value-added service",
      does: "Measurement, counting, tracking and pattern detection.",
      useCases: [
        { title: "People analytics", detail: "Headcount, footfall, occupancy and heatmaps" },
        { title: "Vehicle analytics", detail: "ANPR, vehicle counting and overspeeding detection" },
        { title: "Zone analytics", detail: "Active-zone mapping, dwell time and utilisation" },
      ],
    },
  ],
  casesNote: "Examples only, not an exhaustive list.",
  note: "Simulated monitoring wall. Events, sites and times are illustrative.",
};

export const operatingModel = {
  id: "operating-model",
  eyebrow: "How the service is built",
  headline: "Trained operators at the core.",
  body: "The Surveillance Centre is the service. The platform records every incident. AI analytics is an optional add-on.",
  source: { label: "Your CCTV", body: "Live feeds from every site" },
  core: [
    {
      key: "centre",
      label: "Core service",
      role: "Surveillance Centre",
      body: "Trained operators watch live feeds and judge what needs action.",
    },
    {
      key: "platform",
      label: "Accountability",
      role: "Incident platform",
      body: "Every observation is logged, assigned, escalated and tracked.",
    },
  ],
  addOn: {
    key: "ai",
    label: "AI analytics",
    role: "Value-added service",
    body: "Counts, tracking and pattern reports on top of the core service.",
  },
  outcome: {
    label: "Management",
    items: ["Visibility", "Detection", "Accountability", "Control"],
  },
};

// Operating workflow. The component renders any number of stages. Stages may
// optionally declare `lane` ("centre" | "ai" | "platform" | "client") and
// `optional: true` for steps that only apply in some deployments.
export const workflow = {
  id: "how-it-works",
  eyebrow: "How it works",
  headline: "From camera feed to closed incident.",
  body: "One process, every site, every shift.",
  stages: [
    { title: "Camera onboarding", body: "We connect to your existing cameras and agree what to watch at each site.", lane: "client" },
    { title: "Monitoring", body: "Our Surveillance Centre watches your feeds 24×7.", lane: "centre" },
    { title: "Verification & incident", body: "Every issue is verified and logged with the evidence frame.", lane: "centre" },
    { title: "Escalation & assignment", body: "The right person is alerted and owns the incident.", lane: "platform" },
    { title: "Resolution & reporting", body: "Closed incidents feed your site reports and dashboards.", lane: "platform" },
  ],
};

export const platform = {
  id: "platform",
  eyebrow: "The platform",
  headline: "Your operational command center.",
  body: "Every incident in one place, with the evidence.",
  callouts: [
    { n: 1, title: "Know what happened.", body: "Site, camera, time, severity and the evidence frame." },
    { n: 2, title: "Know who acted.", body: "Who it was assigned and escalated to, and when." },
  ],
  // TODO(product): supply real Promind 360 platform screenshots. When present
  // (e.g. { src: "/assets/platform-incident.webp", width, height, alt }), they
  // replace the coded mockup below. The dashboard mockups from the previous
  // site (reference/legacy-assets) show a "complaints" app and were not used.
  screenshots: [],
  note: "Illustrative interface with demo data.",
};

export const health = {
  id: "health-check",
  eyebrow: "Health check & alerts",
  headline: "Know the moment a camera goes dark.",
  body: "We track camera and DVR uptime around the clock and tell you when anything goes down.",
  points: [
    { icon: "pulse", title: "Health check", body: "Camera and DVR uptime, monitored 24×7." },
    { icon: "bell", title: "Automated alerts", body: "Sent the moment a device goes down or an incident is raised." },
    { icon: "chart", title: "Uptime reports", body: "Uptime stats for every camera, DVR and site." },
  ],
  note: "Demo data.",
};

// TODO(product): confirm specifics (encryption, retention, where data is
// stored, certifications) before adding them here.
export const security = {
  id: "security",
  eyebrow: "Data security & privacy",
  headline: "Your footage stays yours.",
  points: [
    { icon: "lock", title: "Restricted access", body: "Feeds and records visible only to authorised users." },
    { icon: "shieldCheck", title: "Confidential by default", body: "Operators work under strict confidentiality." },
    { icon: "file", title: "Full audit trail", body: "Every action on an incident is logged." },
  ],
};

export const multiSiteSection = {
  id: "multi-site",
  eyebrow: "Multi-site control",
  headline: "One view across every location.",
  body: "Incidents, open issues and trends from every site, in one place.",
  points: [
    { title: "Same standard everywhere", body: "One process across all locations." },
    { title: "See where issues cluster", body: "Spot the sites and categories that recur." },
    { title: "Oversight without travel", body: "Visibility that doesn’t need site visits." },
  ],
  note: "Demo data. Not customer performance.",
};

export const businessCase = {
  id: "business-case",
  eyebrow: "The benefits",
  headline: "Tighter operations. More reach for every manager.",
  comparison: {
    columns: ["Typical oversight", "With Promind 360"],
    rows: [
      { aspect: "Coverage", icon: "eye", before: "Footage checked after the fact", after: "Live feeds watched 24×7" },
      { aspect: "Detection", icon: "alert", before: "Via complaints and site visits", after: "Spotted as it happens" },
      { aspect: "Record", icon: "file", before: "Scattered calls and registers", after: "One record per incident" },
      { aspect: "Supervision", icon: "building", before: "One site at a time", after: "Every site in one view" },
    ],
  },
  outcomes: [
    { icon: "eye", title: "Fewer monitoring gaps", body: "Continuous oversight of your feeds." },
    { icon: "target", title: "Tighter operations", body: "SOP failures become visible." },
    { icon: "userCheck", title: "Greater accountability", body: "Every issue has an owner." },
    { icon: "chart", title: "Management leverage", body: "Oversee more sites, same team." },
  ],
  cost: {
    title: "Cost efficiency",
    body: "One Surveillance Centre covers many sites, so oversight grows without a supervisor at each.",
    before: "A supervisor per site",
    after: "One Surveillance Centre, every site",
    sites: 6,
  },
  // No ROI figures until supported by real data.
  costNote: "We’ll build the business case for your sites in the demo.",
};

// Industries and their use cases. Each industry:
//   { key, name, icon, scene, summary?, useCases: [string | { text, source }] }
// `icon`: a name from src/components/icons.js.
// `scene`: a simulated camera view from src/components/cctv.js (gate,
//   perimeter, dock, lobby, corridor, parking, aisle, stairs, yard).
// `source` (optional): "human" (Surveillance Centre) or "ai" (AI analytics).
export const solutions = {
  id: "solutions",
  eyebrow: "Industries",
  headline: "Use cases for your industry.",
  body: "Choose an industry to see what we watch for.",
  disclaimer: "These industries and use cases are examples, not an exhaustive list. Tell us about your sites and we’ll map what applies.",
  industries: [
    {
      key: "warehouses",
      name: "Warehouses",
      icon: "warehouse",
      scene: "dock",
      useCases: [
        "Loading & unloading SOP violations",
        "Improper stacking or storage",
        "Unsafe material handling",
        "Unattended inventory or high-value goods",
        "Loading-bay congestion",
        "Forklift & vehicle movement violations",
        "PPE & safety non-compliance",
        "Dispatch & receiving process deviations",
      ],
    },
    {
      key: "retail",
      name: "Multi-branch retail",
      icon: "store",
      scene: "lobby",
      useCases: [
        "Store opening & closing compliance",
        "Staff absence or unattended counters",
        "Checkout queue build-up",
        "Uniform & grooming non-compliance",
        "Suspicious activity or pilferage",
        "Store cleanliness & housekeeping",
        "Customer-service lapses",
        "Branch-level SOP compliance",
      ],
    },
    {
      key: "manufacturing",
      name: "Manufacturing plants",
      icon: "factory",
      scene: "aisle",
      useCases: [
        "PPE & safety non-compliance",
        "Restricted-zone entry",
        "Unsafe machine practices",
        "Production SOP deviations",
        "Material handling violations",
        "Emergency exit or pathway obstruction",
        "Worker inactivity or unattended stations",
        "Shift-change & operational compliance",
      ],
    },
    {
      key: "campuses",
      name: "University campuses",
      icon: "school",
      scene: "gate",
      useCases: [
        "Unauthorised or restricted-area access",
        "Security guard negligence",
        "Crowd build-up",
        "Fights, vandalism & inappropriate behaviour",
        "After-hours activity",
        "Parking & vehicle violations",
        "Gate & visitor-management compliance",
        "Campus safety hazards",
      ],
    },
    {
      key: "construction",
      name: "Construction sites",
      icon: "hardhat",
      scene: "yard",
      useCases: [
        "PPE non-compliance",
        "Unsafe work-at-height practices",
        "Restricted-zone entry",
        "Material theft or pilferage",
        "Unsafe equipment operation",
        "Material storage & housekeeping issues",
        "After-hours unauthorised activity",
        "Site safety SOP violations",
      ],
    },
  ],
};

export const proof = {
  id: "proof",
  eyebrow: "Case studies",
  headline: "Proof from live operations.",
  // Used for the heading and nav link while no case study is published.
  withoutCaseStudy: { eyebrow: "Clients", headline: "Trusted in live operations.", navLabel: "Clients" },
  // TODO(content): approved customer logos (SVG preferred) with written
  // permission to display. Shape: { name, src, width, height }.
  logos: Array.from({ length: 6 }, (_, i) => ({ placeholder: true, name: `Customer logo ${i + 1}` })),
  // TODO(content): approved figures only.
  metrics: [
    { placeholder: true, value: "TBC", label: "Sites monitored" },
    { placeholder: true, value: "TBC", label: "Cameras monitored" },
    { placeholder: true, value: "TBC", label: "Incidents recorded" },
    { placeholder: true, value: "TBC", label: "TODO: approved metric" },
  ],
  // Quote carried over from the previous website, approved for reuse. It
  // refers to Promind's security operations generally.
  testimonial: {
    quote: "ProMind has significantly improved our security operations. Their team is responsive and professional.",
    name: "Subhranshu Pattnaik",
    role: "CHRO, Muthoot Microfin",
  },
  caseStudy: {
    placeholder: true,
    customer: "TODO: customer name or anonymised descriptor",
    context: "TODO: sites, cameras, industry",
    stages: [
      { label: "Challenge", body: "TODO: the oversight problem the customer faced." },
      { label: "Promind 360 deployment", body: "TODO: scope (sites, cameras, monitoring model)." },
      { label: "Observations & action", body: "TODO: what was observed and how it was followed up." },
      { label: "Measurable result", body: "TODO: approved, evidenced result. Never estimated." },
    ],
  },
};

export const about = {
  id: "about",
  eyebrow: "About Promind",
  headline: "Built on real operational experience.",
  body: "Backed by ProMind Solutions: 15+ years running facilities, manpower and warehousing operations for private and public sector clients.",
  // Figures from promindsolutions.com (About page) and the previous website.
  // Placeholder items are slots for credentials not yet supplied.
  credentials: [
    { value: "15+ years", label: "Experience" },
    { value: "5,000+", label: "Employees" },
    { value: "200+", label: "Sites" },
    { value: "90+", label: "Cities across India" },
    { value: "ISO 27001 & ISO 22301", label: "Certified" },
    { value: "Zero-debt", label: "Group" },
  ],
  visual: { placeholder: true, label: "Promind credibility visual (operations, workforce, footprint)" },
};

export const finalCta = {
  id: "book-demo",
  headline: "Your cameras are already watching. Put them to work.",
  body: "See how Promind 360 would run across your sites.",
};
