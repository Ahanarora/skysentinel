// Illustrative data for the simulated product visuals (hero console,
// monitoring wall, command center, multi-site dashboard).
//
// NOTHING IN THIS FILE IS CUSTOMER DATA OR PERFORMANCE. Every visual that uses
// it is labelled "Demo data" or "Simulated" on the page.
//
// EVENT TYPES: only events drawn from the approved use cases may appear
// (see whatItSees.roles and solutions.industries in src/content/home.js).

export const detectionSources = {
  human: {
    label: "Surveillance Centre detected",
    short: "Surveillance Centre",
  },
  ai: {
    label: "AI detected",
    short: "AI",
  },
};

// Severity levels as used in the existing Promind app and previous website.
export const severities = {
  critical: { label: "Critical" },
  semi: { label: "Semi-critical" },
  general: { label: "General" },
};

export const eventTypes = {
  guardAbsent: {
    title: "Guard absent from designated post",
    detection: "human",
    category: "SOP compliance", // demo category label
  },
  restrictedIntrusion: {
    title: "Restricted-area intrusion",
    detection: "ai",
    category: "Security", // demo category label
  },
  ppeMissing: {
    title: "Worker without required PPE",
    detection: "human",
    category: "Safety",
  },
  loitering: {
    title: "Loitering near loading bay",
    detection: "human",
    category: "Security",
  },
  exitObstructed: {
    title: "Emergency exit obstructed",
    detection: "human",
    category: "Operational",
  },
  overspeeding: {
    title: "Vehicle overspeeding in yard",
    detection: "ai",
    category: "Vehicle analytics",
  },
};

// --- Monitoring wall -------------------------------------------------------
// `scene` picks a simulated CCTV view from src/components/cctv.js.
// `overlay.box` is [x, y, width, height] in the scene's 320×180 viewBox.
// Tiles whose event is a placeholder render as quiet feeds in production.

export const monitoringWall = {
  cameras: [
    {
      id: "CAM 04",
      location: "Main gate",
      site: "Site 02",
      scene: "gate",
      event: {
        type: "guardAbsent",
        time: "02:14:07",
        severity: "semi",
        status: "Escalated",
        overlay: { box: [196, 58, 70, 88], note: "Post unattended" },
      },
    },
    {
      id: "CAM 11",
      location: "Perimeter north",
      site: "Site 05",
      scene: "perimeter",
      event: {
        type: "restrictedIntrusion",
        time: "02:09:51",
        severity: "critical",
        status: "Assigned",
        overlay: {
          box: [168, 74, 30, 66],
          zone: "120,150 300,150 300,96 150,96",
          note: "Person · restricted zone",
        },
      },
    },
    { id: "CAM 07", location: "Loading dock", site: "Site 01", scene: "dock" },
    { id: "CAM 02", location: "Reception", site: "Site 03", scene: "lobby" },
    {
      id: "CAM 15",
      location: "Corridor B2",
      site: "Site 04",
      scene: "corridor",
      event: {
        type: "exitObstructed",
        time: "02:05:33",
        severity: "semi",
        status: "Open",
      },
    },
    { id: "CAM 19", location: "Parking P1", site: "Site 02", scene: "parking" },
    {
      id: "CAM 23",
      location: "Warehouse aisle 3",
      site: "Site 01",
      scene: "aisle",
      event: {
        type: "ppeMissing",
        time: "01:58:12",
        severity: "general",
        status: "Open",
      },
    },
    { id: "CAM 08", location: "Stairwell east", site: "Site 06", scene: "stairs" },
    { id: "CAM 12", location: "Service yard", site: "Site 04", scene: "yard" },
  ],
};

// --- Hero console ------------------------------------------------------------

export const heroConsole = {
  feeds: [
    { id: "CAM 04", location: "Main gate", site: "Site 02", scene: "gate", alert: "human" },
    { id: "CAM 11", location: "Perimeter", site: "Site 05", scene: "perimeter", alert: "ai" },
    { id: "CAM 07", location: "Loading dock", site: "Site 01", scene: "dock" },
    { id: "CAM 02", location: "Reception", site: "Site 03", scene: "lobby" },
  ],
  incidents: [
    { type: "guardAbsent", site: "Site 02", camera: "CAM 04", time: "02:14", severity: "semi", status: "Escalated" },
    { type: "restrictedIntrusion", site: "Site 05", camera: "CAM 11", time: "02:09", severity: "critical", status: "Assigned" },
    { type: "exitObstructed", site: "Site 07", camera: "CAM 03", time: "01:47", severity: "critical", status: "Resolved" },
  ],
  summary: [
    { label: "Sites", value: "7" },
    { label: "Open", value: "2" },
    { label: "Resolved today", value: "1" },
  ],
};

// --- Command center ----------------------------------------------------------
// TODO(product): confirm every field shown here exists in the live platform
// (notably evidence snapshots), or supply real screenshots via
// `platform.screenshots` in src/content/home.js.

export const commandCenter = {
  incidents: [
    { id: "INC-2041", type: "guardAbsent", site: "Site 02", camera: "CAM 04", time: "02:14", severity: "semi", status: "Resolved", selected: true },
    { id: "INC-2040", type: "ppeMissing", site: "Site 05", camera: "CAM 11", time: "02:09", severity: "critical", status: "Assigned" },
    { id: "INC-2038", type: "loitering", site: "Site 07", camera: "CAM 03", time: "01:47", severity: "semi", status: "Escalated" },
    { id: "INC-2035", type: "exitObstructed", site: "Site 01", camera: "CAM 21", time: "00:52", severity: "critical", status: "Resolved" },
    { id: "INC-2031", type: "overspeeding", site: "Site 04", camera: "CAM 09", time: "23:36", severity: "general", status: "Resolved" },
  ],
  detail: {
    id: "INC-2041",
    type: "guardAbsent",
    site: "Site 02 · Main gate",
    camera: "CAM 04",
    scene: "gate",
    overlay: { box: [196, 58, 70, 88], note: "Post unattended" },
    detectedAt: "02:14:07",
    severity: "semi",
    status: "Resolved",
    assignee: "Site security supervisor",
    escalatedAt: "02:16",
  },
};

// --- Health check -------------------------------------------------------------
// Device uptime. `days` is the last 14 days: 1 = up all day, 0.5 = partial
// outage, 0 = down.

export const deviceHealth = {
  kpis: [
    { label: "Uptime, 30 days", value: "99.2%" },
    { label: "Devices online", value: "142/144" },
    { label: "Open alerts", value: "2", tone: "critical" },
  ],
  devices: [
    { name: "DVR 01", site: "Site 01", kind: "server", status: "online", uptime: "99.9%", onTime: "13d 23h", days: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
    { name: "CAM 07", site: "Site 01", kind: "camera", status: "online", uptime: "99.6%", onTime: "13d 22h", days: [1, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 1, 1, 1, 1] },
    { name: "DVR 03", site: "Site 04", kind: "server", status: "offline", uptime: "97.8%", onTime: "13d 16h", days: [1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 0] },
    { name: "CAM 19", site: "Site 02", kind: "camera", status: "online", uptime: "98.9%", onTime: "13d 20h", days: [1, 1, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1, 1] },
    { name: "CAM 12", site: "Site 04", kind: "camera", status: "offline", uptime: "98.1%", onTime: "13d 17h", days: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0] },
  ],
  alert: {
    title: "DVR 03 offline",
    meta: "Site 04 · 4 cameras affected · 02:41",
    action: "Alert sent to site supervisor",
  },
};

// --- Multi-site dashboard -----------------------------------------------------

export const multiSite = {
  kpis: [
    { label: "Sites", value: "6" },
    { label: "Cameras", value: "196" },
    { label: "Open issues", value: "11" },
    { label: "Critical open", value: "2", tone: "critical" },
  ],
  sites: [
    { name: "Site 01", cameras: 48, open: 3, critical: 1, week: [2, 3, 1, 4, 2, 3, 3] },
    { name: "Site 02", cameras: 36, open: 1, critical: 0, week: [1, 0, 2, 1, 1, 0, 1] },
    { name: "Site 03", cameras: 24, open: 0, critical: 0, week: [0, 1, 0, 0, 1, 0, 0] },
    { name: "Site 04", cameras: 40, open: 4, critical: 1, week: [3, 2, 4, 3, 5, 4, 4] },
    { name: "Site 05", cameras: 18, open: 1, critical: 0, week: [1, 1, 0, 2, 1, 1, 1] },
    { name: "Site 06", cameras: 30, open: 2, critical: 0, week: [2, 1, 1, 2, 3, 2, 2] },
  ],
};
