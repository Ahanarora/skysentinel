// Minimal, dependency-free HTML templating.
// `html` escapes every interpolated value unless it is wrapped in `raw()` or
// is itself the result of another `html` call. Arrays are joined; null,
// undefined and false render nothing, so conditionals read naturally:
//   html`<ul>${items.map((i) => html`<li>${i}</li>`)}</ul>`
//   html`${flag && html`<p>Shown when flag is truthy</p>`}`

class Raw {
  constructor(value) {
    this.value = String(value);
  }
  toString() {
    return this.value;
  }
}

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ESCAPES[c]);

export const raw = (value) => new Raw(value);

function renderValue(value) {
  if (value === null || value === undefined || value === false) return "";
  if (Array.isArray(value)) return value.map(renderValue).join("");
  if (value instanceof Raw) return value.value;
  return escape(value);
}

export function html(strings, ...values) {
  let out = strings[0];
  values.forEach((value, i) => {
    out += renderValue(value) + strings[i + 1];
  });
  return new Raw(out);
}

/** Join class names, skipping falsy entries. */
export const cx = (...names) => names.filter(Boolean).join(" ");

/** Render an attribute only when it has a value. */
export const attr = (name, value) =>
  value === null || value === undefined || value === false
    ? ""
    : raw(value === true ? ` ${name}` : ` ${name}="${escape(value)}"`);
