const buttons = document.getElementById('buttons');
const currentInput = document.querySelector('#current-input');
const totalDisplay = document.querySelector('#total-display')
const operators = ['+', '-', 'x', '/']
let operator = "";
let currentChoice = "";
let firstValue;
let secondValue;
let prevOperator;

buttons.addEventListener('click', (e) => {

    const isButton = e.target.nodeName === 'BUTTON';
    if (!isButton) {
      return;
    }

    currentChoice = e.target.value;

    if (currentChoice == "clr") {
        clear();
    }


    currentInput.textContent += currentChoice;
    console.log(currentChoice);

    if (currentChoice == "=") {
        equals();
    }


    if (operators.includes(currentChoice)) {
        if (firstValue == null) {
            firstValue = parseInt(currentInput.textContent);
            currentInput.textContent = '';
            prevOperator = currentChoice;
        } else {
            secondValue = parseInt(currentInput.textContent);
            runningTotal = operate(prevOperator, firstValue, secondValue);
            totalDisplay.textContent = runningTotal;
            currentInput.textContent = '';
            firstValue = secondValue;
            secondValue = null;
            prevOperator = currentChoice;
        };
    };
    

})


//Resets all values
function clear() {
    currentInput.textContent = '';
    totalDisplay.textContent = '';
    operator = "";
    currentChoice = "";
    firstValue = null;
    secondValue = null; 
}

function equals() {
    secondValue = parseInt(currentInput.textContent);
    finalTotal = operate(prevOperator, firstValue, secondValue);
    totalDisplay.textContent = finalTotal;
    currentInput.textContent = '';
    firstValue = finalTotal;
}











function add(a,b) {
    return a+b;
};

function subtract(a,b) {
    return a-b;
};

function multiply(a,b) {
    return a*b;
};

function divide(a,b) {
    return a/b;
};

function operate(operator, a, b) {
    if (operator === "+") {
        return add(a,b);
    } else if (operator === "-") {
        return subtract(a,b);
    } else if (operator === "x") {
        return multiply(a,b);
    } else if (operator === "/") {
        return divide(a,b);
    };
};


