/* Frontend-only Mockup: Routing + simulierte Buchungslogik */

const COURSE_DATA = {
  motivation: {
    id: "motivation",
    name: "Mitarbeitermotivation (hybrid)",
    price: 490,
    date: "16.01.2026",
    place: "Paulinenstraße 50 · Raum 208 · Stuttgart",
  },
  fuehrung: {
    id: "fuehrung",
    name: "Führung mit Wirkung",
    price: 520,
    date: "—",
    place: "—",
  },
  gestaltung: {
    id: "gestaltung",
    name: "Arbeitsgestaltung",
    price: 450,
    date: "—",
    place: "—",
  },
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function formatEUR(value) {
  const n = Number(value) || 0;
  return `${n.toLocaleString("de-DE")}€`;
}

function parseHash() {
  // Supports:
  //  - #/home
  //  - #/seminare
  //  - #/detail/motivation
  //  - #/buchung?course=motivation
  const raw = (location.hash || "#/home").slice(1);
  const [pathPart, queryPart] = raw.split("?");
  const path = pathPart.replace(/^\/+/, "");
  const params = new URLSearchParams(queryPart || "");
  return { path, params };
}

function setActiveNav(routeKey) {
  $$(".nav__link").forEach((a) => a.classList.remove("is-active"));
  const el = $(`.nav__link[data-route="${routeKey}"]`);
  if (el) el.classList.add("is-active");
}

function showView(viewKey) {
  $$(".view").forEach((v) => {
    const isTarget = v.dataset.view === viewKey;
    v.hidden = !isTarget;
  });
  // keyboard focus for accessibility
  const main = $("#main");
  if (main) main.focus({ preventScroll: true });
}

function route() {
  const { path, params } = parseHash();

  if (!path || path === "home") {
    setActiveNav("home");
    showView("home");
    return;
  }

  if (path === "seminare") {
    setActiveNav("seminare");
    showView("seminare");
    return;
  }

  if (path.startsWith("detail/")) {
    const slug = path.split("/")[1];
    if (slug === "motivation") {
      setActiveNav("seminare");
      showView("detail-motivation");
      return;
    }
    setActiveNav("");
    showView("notfound");
    return;
  }

  if (path.startsWith("buchung")) {
    setActiveNav("buchung");
    showView("buchung");
    initBookingFromParams(params);
    return;
  }

  setActiveNav("");
  showView("notfound");
}

// -----------------------
// Toasts (Feedback)
// -----------------------
let toastTimer = null;
function toast(message, title = "Hinweis") {
  const region = $("#toastRegion");
  if (!region) return;

  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = `
    <div class="toast__title">${escapeHtml(title)}</div>
    <div class="toast__msg">${escapeHtml(message)}</div>
  `;
  region.appendChild(t);

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    t.remove();
  }, 2600);
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// -----------------------
// Modal + Overlay
// -----------------------
function openModal(text) {
  const modal = $("#confirmModal");
  const confirmText = $("#confirmText");
  if (!modal || !confirmText) return;

  confirmText.textContent = text;
  modal.hidden = false;
  // Make it robust even if CSS accidentally overrides `[hidden]`
  modal.style.display = "grid";

  // focus first actionable
  const ok = $("#confirmOkBtn");
  if (ok) ok.focus();
}

function closeModal() {
  const modal = $("#confirmModal");
  if (!modal) return;
  modal.hidden = true;
  modal.style.display = "none";
}

function showLoading(show) {
  const overlay = $("#loadingOverlay");
  if (!overlay) return;
  overlay.hidden = !show;
  overlay.setAttribute("aria-hidden", show ? "false" : "true");
  overlay.style.display = show ? "grid" : "none";
}

// -----------------------
// Booking Flow
// -----------------------
const bookingState = {
  step: 1,
  courseId: "motivation",
};

function initBookingFromParams(params) {
  const course = params.get("course");
  if (course && COURSE_DATA[course]) {
    bookingState.courseId = course;
  }
  const sel = $("#courseSelect");
  if (sel) sel.value = bookingState.courseId;
  updatePricing();
  setStep(1);
  validateBooking();
}

function updatePricing() {
  const courseId = $("#courseSelect")?.value || bookingState.courseId;
  bookingState.courseId = COURSE_DATA[courseId] ? courseId : "motivation";

  const perPerson = COURSE_DATA[bookingState.courseId].price;
  const count = clampInt($("#participants")?.value, 1, 30, 1);
  const total = perPerson * count;

  const elPer = $("#pricePerPerson");
  const elTotal = $("#priceTotal");
  if (elPer) elPer.textContent = formatEUR(perPerson);
  if (elTotal) elTotal.textContent = formatEUR(total);

  // keep inputs normalized
  const p = $("#participants");
  if (p) p.value = String(count);
}

function clampInt(value, min, max, fallback) {
  const n = Number.parseInt(String(value), 10);
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function setStep(step) {
  bookingState.step = step;

  const panels = $$("[data-step-panel]");
  panels.forEach((p) => {
    const is = Number(p.dataset.stepPanel) === step;
    p.hidden = !is;
    p.classList.toggle("step--active", is);
  });

  const progressSteps = $$(".progress__step");
  progressSteps.forEach((s) => {
    const is = Number(s.dataset.step) === step;
    s.classList.toggle("progress__step--active", is);
  });
}

function validateBooking() {
  const name = ($("#name")?.value || "").trim();
  const email = ($("#email")?.value || "").trim();

  const nameError = $("#nameError");
  const emailError = $("#emailError");
  let ok = true;

  if (!name) {
    ok = false;
    if (nameError) {
      nameError.hidden = false;
      nameError.textContent = "Bitte geben Sie Ihren Namen ein, damit wir Sie korrekt ansprechen können.";
    }
  } else if (nameError) {
    nameError.hidden = true;
    nameError.textContent = "";
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    ok = false;
    if (emailError) {
      emailError.hidden = false;
      emailError.textContent = "Bitte geben Sie Ihre E‑Mail-Adresse ein, damit wir Ihnen die Unterlagen senden können.";
    }
  } else if (emailError) {
    emailError.hidden = true;
    emailError.textContent = "";
  }

  const toReviewBtn = $("#toReviewBtn");
  if (toReviewBtn) toReviewBtn.disabled = !ok;

  return ok;
}

function fillReview() {
  updatePricing();

  const courseId = bookingState.courseId;
  const course = COURSE_DATA[courseId];
  const participants = clampInt($("#participants")?.value, 1, 30, 1);
  const total = course.price * participants;

  const name = ($("#name")?.value || "").trim();
  const email = ($("#email")?.value || "").trim();

  $("#reviewCourse").textContent = `${course.name} (${formatEUR(course.price)} p. P.)`;
  $("#reviewParticipants").textContent = String(participants);
  $("#reviewName").textContent = name || "—";
  $("#reviewEmail").textContent = email || "—";
  $("#reviewTotal").textContent = formatEUR(total);
}

function bookingConfirmText() {
  const course = COURSE_DATA[bookingState.courseId];
  const participants = clampInt($("#participants")?.value, 1, 30, 1);
  const total = course.price * participants;
  const date = course.date !== "—" ? course.date : "Termin offen (Demo)";

  return `Sie buchen „${course.name}“ für ${date} zum Preis von ${formatEUR(total)} (${participants}× ${formatEUR(
    course.price
  )}).`;
}

async function simulateBooking() {
  closeModal();
  showLoading(true);

  // Feedback: very quick UI response (<100ms) is already via overlay + button press
  await wait(950 + Math.random() * 650);

  showLoading(false);
  toast("Demo-Buchung erfolgreich simuliert. Sie erhalten (simuliert) eine Bestätigung per E‑Mail.", "Erledigt");

  // reset to start
  setStep(1);
  $("#bookingForm")?.reset?.();
  $("#participants").value = "1";
  $("#courseSelect").value = bookingState.courseId;
  updatePricing();
  validateBooking();
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// -----------------------
// Wire events
// -----------------------
function wireGlobalEvents() {
  window.addEventListener("hashchange", route);

  // Defensive: ensure initial UI starts clean (no modal/overlay on load)
  closeModal();
  showLoading(false);

  route();

  // demo confirm on home
  $("#demoConfirmBtn")?.addEventListener("click", () => {
    openModal("Demo: Öffnet den Bestätigungsdialog wie im Unhappy-Path beschrieben.");
    // In diesem Demo-Fall löst OK keinen Booking-Flow aus
    const ok = $("#confirmOkBtn");
    ok.dataset.mode = "demo";
  });

  // toast buttons
  $$("[data-toast]").forEach((btn) => {
    btn.addEventListener("click", () => toast(btn.getAttribute("data-toast")));
  });

  // modal close
  $$("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  $("#confirmOkBtn")?.addEventListener("click", async () => {
    const ok = $("#confirmOkBtn");
    const mode = ok.dataset.mode || "booking";
    ok.dataset.mode = "booking";
    if (mode === "demo") {
      closeModal();
      toast("Bestätigt (Demo). Für den echten Flow bitte in die Buchung wechseln.", "OK");
      return;
    }
    await simulateBooking();
  });
}

function wireBookingEvents() {
  $("#courseSelect")?.addEventListener("change", () => {
    updatePricing();
    fillReview();
  });

  $("#participants")?.addEventListener("input", () => {
    updatePricing();
    fillReview();
  });
  $("#incParticipants")?.addEventListener("click", () => {
    const p = $("#participants");
    p.value = String(clampInt(p.value, 1, 30, 1) + 1);
    updatePricing();
    fillReview();
  });
  $("#decParticipants")?.addEventListener("click", () => {
    const p = $("#participants");
    p.value = String(clampInt(p.value, 1, 30, 1) - 1);
    updatePricing();
    fillReview();
  });

  $("#name")?.addEventListener("input", validateBooking);
  $("#email")?.addEventListener("input", validateBooking);

  $("#toReviewBtn")?.addEventListener("click", () => {
    if (!validateBooking()) return;
    fillReview();
    setStep(2);
  });
  $("#backToDataBtn")?.addEventListener("click", () => setStep(1));

  $("#payBtn")?.addEventListener("click", () => {
    fillReview();
    openModal(bookingConfirmText());
    const ok = $("#confirmOkBtn");
    ok.dataset.mode = "booking";
  });
}

wireGlobalEvents();
wireBookingEvents();


