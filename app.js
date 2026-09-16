const kjPer100Input = document.querySelector("#kjPer100");
const gramsInput = document.querySelector("#grams");
const totalKcalOutput = document.querySelector("#totalKcal");
const totalKjOutput = document.querySelector("#totalKj");
const clearButton = document.querySelector("#clearButton");

const KJ_PER_KCAL = 4.184;

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

kjPer100Input.addEventListener("input", calculate);
gramsInput.addEventListener("input", calculate);
clearButton.addEventListener("click", clearInputs);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}

calculate();
