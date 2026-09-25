// Draft/production switches for unapproved content.
//
// Content items can carry two markers:
//   placeholder: true  – a designed slot waiting for real, approved content
//   verified: false    – a claim carried over from the previous website that
//                        has not yet been re-approved for Promind 360
//
// While the site is in draft (the default), both render with a visible
// "TODO" / "Verify" tag so stakeholders can review every slot in context.
// Production builds hide them:
//   SHOW_PLACEHOLDERS=false SHOW_UNVERIFIED=false npm run build
// or simply:  npm run build:production

const envFlag = (name, fallback) => {
  const value = process.env[name];
  if (value === undefined || value === "") return fallback;
  return !["0", "false", "no", "off"].includes(value.toLowerCase());
};

export const flags = {
  showPlaceholders: envFlag("SHOW_PLACEHOLDERS", true),
  showUnverified: envFlag("SHOW_UNVERIFIED", true),
};

/** Whether a content item should be rendered under the current flags. */
export function isVisible(item) {
  if (!item) return false;
  if (item.placeholder && !flags.showPlaceholders) return false;
  if (item.verified === false && !flags.showUnverified) return false;
  return true;
}

/** Filter a list of content items down to those that should render. */
export const visible = (items = []) => items.filter(isVisible);
