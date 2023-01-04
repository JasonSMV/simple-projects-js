// This was solved using regular expressions.

console.log(Number("-" + 2) + 2);
calculate("2/2*2+2-(2-2)*4+1-17-2+12-2");

function calculate(equation) {
  const operator = findFirstOrderOfOperation(equation);

  const result = operatePortion(equation, operator);
  console.log("THE RESULT IS ", result);
}

function findFirstOrderOfOperation(equation) {
  let higherOperator = "";

  // checking if equation has parenthesis.
  const regexParenthesis = /(\(.+?\))/g;
  const areParenthesis = Boolean(equation.match(regexParenthesis));
  console.log("Are there parenthesis? ", areParenthesis);

  if (areParenthesis) {
    return (higherOperator = "(");
  }

  const regExFirstToOperate = /[-+/*]/g;
  const operators = equation.match(regExFirstToOperate);
  if (!operators) {
    return -1;
  }

  const isThereHigher = operators.some(
    (operator) => operator === "*" || operator === "/" || operator === "^"
  );

  let skip = false;

  for (const operator of operators) {
    if (isThereHigher) {
      if (operator == "*") {
        higherOperator = "*";
        break;
      }
      if (operator == "/") {
        higherOperator = "/";
        break;
      }
    } else {
      if (operator == "+") {
        higherOperator = "+";

        break;
      }

      if (operator == "-") {
        higherOperator = "-";

        break;
      }
    }
  }

  console.log("Is there higher", isThereHigher);
  console.log("Equation is higher", equation);
  console.log("First to operate", higherOperator);

  return higherOperator;
}

function operatePortion(equation, operator) {
  const regExNumber = /\d+/g;
  const numbers = equation.match(regExNumber);
  if (numbers.length == 1) {
    return equation;
  }

  if (numbers.length == 2) {
    console.log("Enter");
    return calculateResult(equation);
  }

  // checking if equation has parenthesis.
  const regexParenthesis = /(\(.+?\))/g;
  const areParenthesis = Boolean(equation.match(regexParenthesis));

  // Regular expression to get a portion of the equation based on operator e. g. 2+3+2  > it will select 2+3
  //passing flag "g" for global and need to use double \\ because of the way JS parses strings.
  const regex = new RegExp(`([+-] ?)?\\d+( +)?[${operator}]( +)?\\d+`);

  const portion = equation.match(regex);

  if (areParenthesis) {
    const regexParenthesis = /(\(.+?\))/;
    const portion = equation.match(regexParenthesis)[0];
    console.log(portion);
    const regexRemoveParenthesis = /((?<=\().+)(?<!\))/g;
    const newEquation = portion.match(regexRemoveParenthesis)[0];
    const operator = findFirstOrderOfOperation(newEquation);
    console.log("New equation", newEquation);
    console.log("OPERATADOR ", operator);

    const [first, second] = newEquation.split(operator);
    const result = calculateResult(newEquation);

    const equationRefactor = equation.replace(regexParenthesis, result);
    const newOperator = findFirstOrderOfOperation(equationRefactor);

    return operatePortion(equationRefactor, newOperator);
  }

  console.log("Equation", equation);
  console.log("Operator", operator);

  console.log(portion);

  let [first, second] = portion[0].split(operator);

  const result = calculateResult(portion[0]);
  console.log("REsult ", result);
  console.log("Regex after result ", equation.match(regex)[0]);

  const newEquation = equation.replace(regex, result);
  console.log("New equation", newEquation);

  operator = findFirstOrderOfOperation(newEquation);
  console.log("operartor1 ", operator);

  return operatePortion(newEquation, operator);
}

function calculateResult(equation) {
  const regExoperators = /[-+/*]/g;
  const regExNumber = /\d+/g;
  const operators = equation.match(regExoperators);
  const numbers = equation.match(regExNumber);
  let operatorBefore = "";
  let operator = operators[0];
  if (operators.length >= 2) {
    operatorBefore = operators[0];
    operator = operators[1];
  }
  let [first, second] = numbers;
  console.log("Numbers are: ", first, second);
  first = Number(first);
  second = Number(second);
  console.log("Operator before", operatorBefore);
  switch (operator) {
    case "+":
      return `${Number(operatorBefore + first) + second}`;

    case "-":
      return `${Number(operatorBefore + first) - second}`;

    case "*":
      return `${String(operatorBefore)}${
        Number(operatorBefore + first) * second
      }`;

    case "/":
      return `${String(operatorBefore)}${
        Number(operatorBefore + first) / second
      }`;

    default:
      console.log("default");
      break;
  }
}
