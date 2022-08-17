let currentNumber = '';
let previousNumber = '';
let operator;
const display = document.querySelector('.display');
const temp = document.querySelector('.temp');

window.addEventListener('keydown', handleKeyPress);

const numbers = document.querySelectorAll('.number');
numbers.forEach(function (e) {
  e.onclick = () => {
    populateDisplay(e.textContent);
  };
});

const decimal = document.querySelector('.decimal');
decimal.onclick = () => {
  addDecimal();
};

const del = document.querySelector('.delete');
del.onclick = () => {
  deleteNumber();
};

const clear = document.querySelector('.clear');
clear.onclick = () => {
  clearCalculator();
};

const equal = document.querySelector('.equal');
equal.onclick = () => {
  if (currentNumber != '' && previousNumber != '') {
    operate(operator, currentNumber, previousNumber);
  }
};

const operators = document.querySelectorAll('.operator');
operators.forEach(function (e) {
  e.onclick = () => {
    if (currentNumber != '' && previousNumber != '') {
      operate(operator, currentNumber, previousNumber);
    }
    handleOperator(e.textContent);
  };
});

function handleOperator(e) {
  operator = e;
  if (previousNumber === '') {
    previousNumber = currentNumber;
    currentNumber = '';
    temp.textContent = previousNumber + ' ' + operator;
    display.textContent = '';
  }
  temp.textContent = previousNumber + ' ' + operator;
  display.textContent = '';
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator) {
  currentNumber = Number(currentNumber);
  previousNumber = Number(previousNumber);
  switch (operator) {
    case '+':
      currentNumber = add(previousNumber, currentNumber);
      break;
    case '-':
      currentNumber = subtract(previousNumber, currentNumber);
      break;
    case 'x':
      currentNumber = multiply(previousNumber, currentNumber);
      break;
    case '/':
      if (currentNumber <= 0) {
        currentNumber = 'Error';
        displayResult();
        return;
      }
      currentNumber = divide(previousNumber, currentNumber);
      break;
  }
  currentNumber = roundNumber(currentNumber);
  currentNumber = currentNumber.toString();
  displayResult();
}

function roundNumber(num) {
  return Math.round(num * 100000) / 100000;
}

function displayResult() {
  if (currentNumber.length <= 11) {
    display.textContent = currentNumber;
  } else {
    display.textContent = currentNumber.slice(0, 11) + '...';
  }
  temp.textContent = '';
  previousNumber = currentNumber;
  currentNumber = '';
}

function populateDisplay(e) {
  if (currentNumber.length <= 11) {
    currentNumber += e;
    display.textContent = currentNumber;
  }
}

function clearCalculator() {
  currentNumber = '';
  previousNumber = '';
  operator = '';
  display.textContent = '0';
  temp.textContent = '';
}

function addDecimal() {
  if (!currentNumber.includes('.')) {
    currentNumber += '.';
    display.textContent = currentNumber;
  }
}

function deleteNumber() {
  if (currentNumber.length > 0) {
    currentNumber = currentNumber.slice(0, currentNumber.length - 1);
    display.textContent = currentNumber;
  }
}

function handleKeyPress(e) {
  if (e.key >= 0 && e.key <= 9) {
    populateDisplay(e.key);
  }
  if (
    e.key === 'Enter' ||
    (e.key === '=' && currentNumber != '' && previousNumber != '')
  ) {
    operate(operator);
  }
  if (e.key === '+' || e.key === '-' || e.key === '/') {
    if (currentNumber != '' && previousNumber != '' && operator != '') {
      operate(operator);
    }
    handleOperator(e.key);
  }
  if (e.key === '*') {
    if (currentNumber != '' && previousNumber != '') {
      operate(operator);
    }
    handleOperator('x');
  }
  if (e.key === '.') {
    addDecimal();
  }
  if (e.key === 'Backspace') {
    deleteNumber();
  }
}
