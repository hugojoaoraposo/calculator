let display = document.getElementById("screen");

let firstNumber;
let secondNumber;
let operation;
let step = 0;
let result = 0;

let firstNumArray = [];
let secondNumArray = [];

function getNumber(number) {
  const isFirstNumberDecimal = firstNumArray.includes(".");
  const isSecondNumberDecimal = secondNumArray.includes(".");

  if (step === 0 || step === 1) {
    if (number === "." && !isFirstNumberDecimal) {
      firstNumArray.push(".");
    } else if (number !== ".") {
      firstNumArray.push(number);
    }

    step = 1;
    firstNumber = parseFloat(firstNumArray.join(""));
    display.value = firstNumArray.join("");
  } else if (step === 2) {
    if (number === "." && !isSecondNumberDecimal) {
      secondNumArray.push(".");
    } else if (number !== ".") {
      secondNumArray.push(number);
    }

    step = 2;
    secondNumber = parseFloat(secondNumArray.join(""));
    display.value = secondNumArray.join("");
  }
}

function getOperator(operator) {
  if (step === 1) {
    step = 2;
    operation = operator;
    display.value = operation;
    secondNumber = null;
    secondNumArray = [];
  } else if (step === 2) {
    showResult();
    firstNumArray = [result.toString()];
    firstNumber = result;
    secondNumber = null;
    secondNumArray = [];
    operation = operator;
    display.value = operation;
    step = 2;
  }
}

function clearAll() {
  display.value = 0;
  firstNumber = null;
  secondNumber = null;
  step = 0;
  firstNumArray = [];
  secondNumArray = [];
  result = 0;
  clearError();
}

function clearLastEntry() {
  if (step === 1) {
    firstNumArray.pop();
    firstNumber = parseFloat(firstNumArray.join(""));
    display.value = firstNumber;
  } else if (step === 2) {
    secondNumArray.pop();
    secondNumber = parseFloat(secondNumArray.join(""));
    display.value = secondNumber;
  } else {
    firstNumber = 0;
  }
  clearError();
}

function showResult() {
  if (operation === "+") {
    result = firstNumber + secondNumber;
    display.value = result;
  } else if (operation === "-") {
    result = firstNumber - secondNumber;
    display.value = result;
  } else if (operation === "*") {
    result = firstNumber * secondNumber;
    display.value = result;
  } else if (operation === "/") {
    if (secondNumber !== 0) {
      result = firstNumber / secondNumber;
      display.value = result;
    } else {
      display.value = "Error: Division by zero";
      display.classList.add("error");
    }
  }
}

function clearError() {
  display.value = 0;
  display.classList.remove("error");
}
