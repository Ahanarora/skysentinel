// Site-wide configuration: brand, navigation, primary CTA, contact details,
// SEO defaults and integrations. Edit here; every page picks it up.

export const site = {
  name: "Promind 360",
  company: "ProMind Solutions Private Limited",
  companyShort: "ProMind Solutions",
  tagline: "Beyond Guards. Beyond Gaps. 360° Vigilance",

  // TODO(launch): set the production domain. Enables canonical URLs, absolute
  // Open Graph URLs and sitemap.xml generation.
  url: "",

  seo: {
    title: "Promind 360 | Turn your CCTV into a 24×7 operational control system",
    description:
      "Promind 360 pairs a 24×7 Surveillance Centre of trained operators with an incident platform and operational analytics, giving management visibility, earlier detection and accountability across every site.",
    // TODO(brand): add a 1200×630 social share image to public/assets and set
    // its path here, e.g. "/assets/og-promind-360.png".
    ogImage: "",
    themeColor: "#0b1519",
  },

  // Logo: the supplied artwork (reference/brand/vectorink-vectorizer-result.svg)
  // used as is, colours and white background unchanged. Only the outer
  // viewBox is cropped to trim empty margins. On dark surfaces it sits on its
  // own white tile. Clear `src` to fall back to a text wordmark.
  logo: {
    src: "/assets/promind-360-logo.svg",
    alt: "ProMind 360",
    ratio: 251 / 118.2, // width / height of the artwork
  },

  // The one commercial CTA used everywhere.
  primaryCta: {
    label: "Book a Demo",
    href: "/book-a-demo",
  },

  // Nav items point at homepage sections today. When dedicated pages exist,
  // change `href` (e.g. "/platform"); nothing else needs editing.
  nav: [
    { label: "Promind 360", href: "/#what-it-sees" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Platform", href: "/#platform" },
    { label: "Solutions", href: "/#solutions" },
    { label: "Case Studies", href: "/#proof" },
    { label: "About Promind", href: "/#about" },
  ],

  // Sales contact details, carried over from the previous website.
  contact: {
    person: "Zinia Mukherjee",
    role: "Senior Business Coordinator",
    email: "ziniamukherjee@promind.org.in",
    phones: [
      { label: "+91 98713 93213", href: "tel:+919871393213" },
      { label: "0120-4052552", href: "tel:+911204052552" },
    ],
    address: "E-38, First Floor, Sector-63, Noida, Uttar Pradesh 201301",
    website: { label: "promindsolutions.com", href: "https://www.promindsolutions.com" },
  },

  demoForm: {
    // TODO(integration): set to a form backend / CRM endpoint that accepts a
    // POST of form data (e.g. HubSpot, Formspree, a serverless function).
    // While empty, submitting opens a pre-filled email to `contact.email`
    // so no enquiry is lost.
    endpoint: "",
  },

  analytics: {
    // TODO(integration): no analytics existed on the previous site. CTA clicks
    // and demo-form submissions are already emitted as events (see
    // src/scripts/analytics.js); add the provider snippet ID here.
    provider: "",
    id: "",
  },
};
