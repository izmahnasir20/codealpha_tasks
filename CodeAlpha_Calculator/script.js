const currentEl = document.getElementById("current");
const previousEl = document.getElementById("previous");

let currentValue = "0";
let previousValue = "";
let operator = null;

function updateDisplay() {
  currentEl.textContent = currentValue;
  previousEl.textContent = operator ? `${previousValue} ${operator}` : "";
}

function appendNumber(num) {
  if (num === "." && currentValue.includes(".")) return;
  currentValue = currentValue === "0" && num !== "." ? num : currentValue + num;
}

function chooseOperator(op) {
  if (currentValue === "") return;
  if (previousValue !== "") calculate();
  operator = op;
  previousValue = currentValue;
  currentValue = "";
}

function calculate() {
  const prev = parseFloat(previousValue);
  const curr = parseFloat(currentValue);
  if (isNaN(prev) || isNaN(curr)) return;

  let result;
  switch (operator) {
    case "+": result = prev + curr; break;
    case "-": result = prev - curr; break;
    case "*": result = prev * curr; break;
    case "/": result = curr === 0 ? "Error" : prev / curr; break;
    default: return;
  }

  currentValue = result.toString();
  operator = null;
  previousValue = "";
}

function clearAll() {
  currentValue = "0";
  previousValue = "";
  operator = null;
}

function deleteLast() {
  currentValue = currentValue.length === 1 ? "0" : currentValue.slice(0, -1);
}

document.querySelectorAll("[data-number]").forEach(btn => {
  btn.addEventListener("click", () => {
    appendNumber(btn.textContent);
    updateDisplay();
  });
});

document.querySelectorAll("[data-operator]").forEach(btn => {
  btn.addEventListener("click", () => {
    chooseOperator(btn.dataset.operator);
    updateDisplay();
  });
});

document.querySelector('[data-action="equals"]').addEventListener("click", () => {
  calculate();
  updateDisplay();
});

document.querySelector('[data-action="clear"]').addEventListener("click", () => {
  clearAll();
  updateDisplay();
});

document.querySelector('[data-action="delete"]').addEventListener("click", () => {
  deleteLast();
  updateDisplay();
});

window.addEventListener("keydown", e => {
  if ((e.key >= "0" && e.key <= "9") || e.key === ".") appendNumber(e.key);
  if (["+", "-", "*", "/"].includes(e.key)) chooseOperator(e.key);
  if (e.key === "Enter" || e.key === "=") calculate();
  if (e.key === "Backspace") deleteLast();
  if (e.key.toLowerCase() === "c") clearAll();
  updateDisplay();
});

updateDisplay();
