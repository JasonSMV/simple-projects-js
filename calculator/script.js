import { Calculator } from "./Calculator.js";

const calc = new Calculator();

const calculatorGrid = document.querySelector(".calculator-grid");
const primaryOutput = document.querySelector(".primary-operand");
const secondaryOutput = document.querySelector(".secondary-operand");
const secondaryOutputOperation = document.querySelector("[data-operation]");

calculatorGrid.addEventListener("click", (e) => {
  if (e.target.matches("[data-number]")) {
    // handle .
    if (e.target.textContent === ".") {
      if (primaryOutput.textContent.includes(".")) return;
      if (calc.number) {
        calc.appendNumber(".");
        primaryOutput.textContent = calc.number;
      } else {
        calc.appendNumber("0.");
        primaryOutput.textContent = "0.";
      }

      return;
    }
    const number = e.target.textContent;
    calc.appendNumber(number);
    primaryOutput.textContent = formatNumber(calc.number);
  }

  // Handle delete button.

  if (e.target.matches("[data-delete]")) {
    calc.delete();
    primaryOutput.textContent = formatNumber(calc.number);
  }

  // Handle operation buttons

  if (e.target.matches("[data-operation]")) {
    const operation = e.target.textContent;
    calc.chooseOperation(operation);
    secondaryOutput.textContent = calc.number1;
    secondaryOutputOperation.textContent = calc.operation;
    primaryOutput.textContent = "0";
  }

  // Handle all clear button

  if (e.target.matches("[data-all-clear]")) {
    calc.allClear();
    primaryOutput.textContent = "";
    secondaryOutput.textContent = "";
  }

  if (e.target.matches("[data-equals]")) {
    const result = calc.equals();
    secondaryOutput.textContent = "";
    secondaryOutputOperation.textContent = "";
    primaryOutput.textContent = result;
  }
});

function formatNumber(number) {
  return Intl.NumberFormat(undefined).format(number);
}
