// Static site build: renders every page in src/pages to dist/, concatenates
// the stylesheets, copies client scripts and public assets, and fingerprints
// CSS/JS so they can be cached indefinitely.
//
// Usage: node scripts/build.mjs

import { createHash } from "node:crypto";
import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "src");
const out = join(root, "dist");

// Order matters: tokens first, then base, components, sections.
const STYLESHEETS = ["tokens.css", "base.css", "components.css", "sections.css", "pages.css"];

const hash = (content) => createHash("sha256").update(content).digest("hex").slice(0, 10);

export async function build() {
  const started = Date.now();
  await rm(out, { recursive: true, force: true });
  await mkdir(join(out, "assets", "js"), { recursive: true });

  // Public files (favicon, robots.txt, images) are copied verbatim.
  await cp(join(root, "public"), out, { recursive: true });

  // Stylesheets -> one fingerprinted file.
  const css = (
    await Promise.all(STYLESHEETS.map((name) => readFile(join(src, "styles", name), "utf8")))
  ).join("\n");
  const cssFile = `assets/site.${hash(css)}.css`;
  await writeFile(join(out, cssFile), css);

  // Client scripts are native ES modules. The folder is versioned by content
  // hash so relative imports between modules stay cache-safe.
  const scriptNames = (await readdir(join(src, "scripts"))).filter((f) => f.endsWith(".js"));
  const scripts = await Promise.all(
    scriptNames.map(async (name) => [name, await readFile(join(src, "scripts", name), "utf8")])
  );
  const jsVersion = hash(scripts.map(([n, c]) => n + c).join(""));
  const jsDir = `assets/js/${jsVersion}`;
  await mkdir(join(out, jsDir), { recursive: true });
  await Promise.all(scripts.map(([name, content]) => writeFile(join(out, jsDir, name), content)));

  const assets = { css: `/${cssFile}`, js: `/${jsDir}/main.js` };

  // Pages. Each module in src/pages exports { path, render(assets) }.
  // A cache-busting query keeps `node --watch`-style rebuilds fresh.
  const pageFiles = (await readdir(join(src, "pages"))).filter((f) => f.endsWith(".js"));
  for (const file of pageFiles) {
    const url = `${pathToFileURL(join(src, "pages", file)).href}?t=${Date.now()}`;
    const page = await import(url);
    const target = page.path === "/" ? "index.html" : join(page.path.replace(/^\//, ""), "index.html");
    await mkdir(dirname(join(out, target)), { recursive: true });
    await writeFile(join(out, target), String(page.render(assets)));
  }

  // Sitemap only when a canonical site URL has been configured.
  const { site } = await import(`${pathToFileURL(join(src, "content", "site.js")).href}?t=${Date.now()}`);
  if (site.url) {
    const pages = await Promise.all(
      pageFiles.map(async (f) => (await import(pathToFileURL(join(src, "pages", f)).href)).path)
    );
    const urls = pages.map((p) => `  <url><loc>${new URL(p, site.url).href}</loc></url>`).join("\n");
    await writeFile(
      join(out, "sitemap.xml"),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
    );
  }

  console.log(`Built ${pageFiles.length} pages to dist/ in ${Date.now() - started}ms`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  build().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
