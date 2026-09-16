const kjPer100Input = document.querySelector("#kjPer100");
const gramsInput = document.querySelector("#grams");
const totalKcalOutput = document.querySelector("#totalKcal");
const totalKjOutput = document.querySelector("#totalKj");
const clearButton = document.querySelector("#clearButton");
const themeButton = document.querySelector("#themeButton");
const themePanel = document.querySelector("#themePanel");
const themeOptions = document.querySelectorAll(".theme-option");
const themeColorMeta = document.querySelector("meta[name='theme-color']");

const KJ_PER_KCAL = 4.184;
const THEME_KEY = "heat-calculator-theme";
const THEME_COLORS = {
  original: "#15211d",
  rosepine: "#575279",
  berry: "#35222b",
  matcha: "#253020",
  sea: "#19313a",
  night: "#111421",
};

function formatNumber(value) {
  if (!Number.isFinite(value) || value <= 0) return "0";
  return new Intl.NumberFormat("zh-CN", {
    maximumFractionDigits: value >= 100 ? 0 : 1,
  }).format(value);
}

function calculate() {
  const kjPer100 = Number(kjPer100Input.value);
  const grams = Number(gramsInput.value);
  const totalKj = (kjPer100 * grams) / 100;
  const totalKcal = totalKj / KJ_PER_KCAL;

  totalKjOutput.textContent = formatNumber(totalKj);
  totalKcalOutput.textContent = formatNumber(totalKcal);
}

function clearInputs() {
  kjPer100Input.value = "";
  gramsInput.value = "";
  calculate();
  kjPer100Input.focus();
}

function setTheme(theme) {
  const nextTheme = THEME_COLORS[theme] ? theme : "original";
  document.body.dataset.theme = nextTheme;
  themeColorMeta.setAttribute("content", THEME_COLORS[nextTheme]);
  localStorage.setItem(THEME_KEY, nextTheme);

  themeOptions.forEach((option) => {
    const isActive = option.dataset.theme === nextTheme;
    option.classList.toggle("is-active", isActive);
    option.setAttribute("aria-pressed", String(isActive));
  });
}

function closeThemePanel() {
  themePanel.hidden = true;
  themeButton.setAttribute("aria-expanded", "false");
}

kjPer100Input.addEventListener("input", calculate);
gramsInput.addEventListener("input", calculate);
clearButton.addEventListener("click", clearInputs);
themeButton.addEventListener("click", () => {
  const isOpen = !themePanel.hidden;
  themePanel.hidden = isOpen;
  themeButton.setAttribute("aria-expanded", String(!isOpen));
});

themeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    setTheme(option.dataset.theme);
    closeThemePanel();
  });
});

document.addEventListener("click", (event) => {
  if (themePanel.hidden) return;
  if (themePanel.contains(event.target) || themeButton.contains(event.target)) return;
  closeThemePanel();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}

setTheme(localStorage.getItem(THEME_KEY) || "original");
calculate();
