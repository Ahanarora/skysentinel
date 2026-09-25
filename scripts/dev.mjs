// Local development: builds the site, serves dist/ and rebuilds on change.
// Usage: npm run dev  (PORT=4000 npm run dev to change the port)
//
// Rebuilds run in a child process so edited ES modules are always re-imported
// fresh. Refresh the browser to see changes.

import { spawn } from "node:child_process";
import { watch } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const port = Number(process.env.PORT) || 3000;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

let building = null;
let queued = false;

function rebuild() {
  if (building) {
    queued = true;
    return;
  }
  building = new Promise((resolve) => {
    const child = spawn(process.execPath, [join(root, "scripts", "build.mjs")], { stdio: "inherit" });
    child.on("exit", resolve);
  }).then(() => {
    building = null;
    if (queued) {
      queued = false;
      rebuild();
    }
  });
}

rebuild();

let timer;
for (const dir of ["src", "public"]) {
  watch(join(root, dir), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(rebuild, 80);
  });
}

createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  let file = normalize(join(dist, decodeURIComponent(url.pathname)));
  if (!file.startsWith(dist)) {
    res.writeHead(403).end();
    return;
  }
  try {
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
  } catch {
    // Fall through: clean URLs without trailing slash.
    if (!extname(file)) file = join(file, "index.html");
  }
  try {
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" }).end("Not found");
  }
}).listen(port, () => console.log(`Promind 360 dev server: http://localhost:${port}`));
