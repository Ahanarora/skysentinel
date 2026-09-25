// Demo request form: inline validation, then submission.
// - With data-endpoint: POSTs the form data (FormData) to that URL.
// - Without: opens a pre-filled email to data-fallback-email, so enquiries
//   are never lost while a form backend is being set up.

import { track } from "./analytics.js";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LABELS = {
  name: "Full name",
  company: "Company",
  email: "Work email",
  phone: "Phone",
  sites: "Number of sites",
  cameras: "Approx. number of cameras",
  message: "Message",
};

function validate(form) {
  const errors = [];
  form.querySelectorAll("input[name], textarea[name]").forEach((input) => {
    if (input.name === "website") return;
    const error = document.getElementById(`f-${input.name}-error`);
    let message = "";
    const value = input.value.trim();
    if (input.required && !value) message = `Enter your ${LABELS[input.name].toLowerCase()}.`;
    else if (input.type === "email" && value && !EMAIL.test(value)) message = "Enter a valid email address.";
    else if (input.type === "tel" && value && value.replace(/\D/g, "").length < 7) message = "Enter a valid phone number.";

    if (message) {
      input.setAttribute("aria-invalid", "true");
      errors.push(input);
    } else {
      input.removeAttribute("aria-invalid");
    }
    if (error) {
      error.textContent = message;
      error.hidden = !message;
      if (message) input.setAttribute("aria-describedby", error.id);
      else if (input.getAttribute("aria-describedby") === error.id) input.removeAttribute("aria-describedby");
    }
  });
  return errors;
}

function mailtoHref(form, to) {
  const data = new FormData(form);
  const lines = Object.keys(LABELS)
    .map((key) => [LABELS[key], String(data.get(key) || "").trim()])
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`);
  const subject = `Promind 360 demo request: ${data.get("company") || data.get("name")}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export function initDemoForm(form) {
  const status = form.querySelector("[data-form-status]");
  const submit = form.querySelector('button[type="submit"]');
  const endpoint = form.dataset.endpoint;
  const fallback = form.dataset.fallbackEmail;

  const setStatus = (html, kind) => {
    status.className = `demo-form__status is-${kind}`;
    status.innerHTML = html;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const errors = validate(form);
    if (errors.length) {
      errors[0].focus();
      setStatus(`Please check ${errors.length === 1 ? "the highlighted field" : `the ${errors.length} highlighted fields`}.`, "error");
      return;
    }

    // Honeypot filled: quietly treat as done.
    if (form.elements.website?.value) {
      setStatus("Thank you. We’ll be in touch to arrange your demo.", "success");
      return;
    }

    if (!endpoint) {
      window.location.href = mailtoHref(form, fallback);
      track("demo_request", { method: "mailto" });
      setStatus(
        `Your email app should open with your request ready to send. If it doesn’t, email <a href="mailto:${fallback}">${fallback}</a>.`,
        "success"
      );
      return;
    }

    submit.disabled = true;
    setStatus("Sending…", "success");
    try {
      const response = await fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      track("demo_request", { method: "endpoint" });
      form.reset();
      setStatus("Thank you. We’ve received your request and will be in touch to arrange your demo.", "success");
    } catch {
      setStatus(
        `Something went wrong sending your request. Please email <a href="${mailtoHref(form, fallback)}">${fallback}</a> instead.`,
        "error"
      );
    } finally {
      submit.disabled = false;
    }
  });

  // Clear a field's error as soon as it is corrected.
  form.addEventListener("input", (event) => {
    const input = event.target;
    if (input.getAttribute("aria-invalid") === "true") validate(form);
  });
}
