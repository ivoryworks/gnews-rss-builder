import { buildRssUrl, parseInput } from "./lib.js";

const form = document.querySelector("#builder-form");
const sourceInput = document.querySelector("#source-input");
const hlInput = document.querySelector("#hl-input");
const glInput = document.querySelector("#gl-input");
const ceidInput = document.querySelector("#ceid-input");
const settingsSummary = document.querySelector("#settings-summary");
const message = document.querySelector("#form-message");
const resultSection = document.querySelector("#result-section");
const resultUrl = document.querySelector("#result-url");
const copyButton = document.querySelector("#copy-button");
const openLink = document.querySelector("#open-link");

function currentSettings() {
  return {
    hl: hlInput.value,
    gl: glInput.value,
    ceid: ceidInput.value,
  };
}

function updateSettingsSummary() {
  settingsSummary.textContent = `${hlInput.value} / ${glInput.value} / ${ceidInput.value}`;
}

function showMessage(text, type = "error") {
  message.textContent = text;
  message.className = `message ${type}`;
}

function clearMessage() {
  message.textContent = "";
  message.className = "message";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearMessage();

  try {
    const values = parseInput(sourceInput.value, currentSettings());
    const url = buildRssUrl(values);

    hlInput.value = values.hl;
    glInput.value = values.gl;
    ceidInput.value = values.ceid;
    updateSettingsSummary();

    resultUrl.value = url;
    openLink.href = url;
    resultSection.hidden = false;
    copyButton.querySelector("span").textContent = "コピー";
    showMessage("RSS URLを生成しました。", "success");
    resultSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } catch (error) {
    resultSection.hidden = true;
    showMessage(error instanceof Error ? error.message : "URLを生成できませんでした。");
    sourceInput.focus();
  }
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(resultUrl.value);
    copyButton.querySelector("span").textContent = "コピーしました";
    showMessage("RSS URLをクリップボードにコピーしました。", "success");
  } catch {
    resultUrl.select();
    showMessage("コピーできませんでした。URLを選択したので、手動でコピーしてください。");
  }
});

document.querySelectorAll("[data-query]").forEach((button) => {
  button.addEventListener("click", () => {
    sourceInput.value = button.dataset.query;
    sourceInput.focus();
    clearMessage();
  });
});

[hlInput, glInput, ceidInput].forEach((input) => {
  input.addEventListener("input", updateSettingsSummary);
});
