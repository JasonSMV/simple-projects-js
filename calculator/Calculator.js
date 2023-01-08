export class Calculator {
  constructor() {}

  #currentNumber = "";
  #operation = "";

  #number1;
  #number2;

  resutl = 0;

  set previousNumber(value) {}

  get number() {
    return this.#currentNumber;
  }

  get number1() {
    return this.#number1;
  }

  get operation() {
    return this.#operation;
  }

  allClear() {
    this.#currentNumber = "";
    this.#operation = "";
    this.#number1 = "";
    this.#number2 = "";
    this.result = "";
  }

  delete() {
    const array = Array.from(this.#currentNumber);
    array.pop();
    console.log(array.join());
    this.#currentNumber = array.join("");
  }

  appendNumber(value) {
    this.#currentNumber = this.#currentNumber + String(value);
  }

  chooseOperation(operation) {
    this.#operation = operation;
    if (!this.#number1) {
      this.#number1 = this.#currentNumber;
    }
    this.#currentNumber = "";
  }

  equals() {
    switch (this.#operation) {
      case "+":
        this.result = Number(this.#number1) + Number(this.#currentNumber);
        this.#number1 = this.result;
        return this.result;

      case "-":
        this.result = Number(this.#number1) - Number(this.#currentNumber);
        this.#number1 = this.result;
        return this.result;

      case "/" || "÷":
        this.result = Number(this.#number1) / Number(this.#currentNumber);
        this.#number1 = this.result;
        return this.result;

      case "*":
        this.result = Number(this.#number1) * Number(this.#currentNumber);
        this.#number1 = this.result;
        return this.result;

      default:
        console.error("Error, operation not found");
        break;
    }
  }

  handlePeriod() {}
}
