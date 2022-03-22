const buttons = document.getElementById('buttons');
const opButtons = document.querySelectorAll('#divide, #multiply, #subtract, #plus')
const display = document.querySelector('#display')
const operators = ['+', '-', 'x', '/']
let nonValues = ['+', '-', 'x', '/', '=', 'clr', 'del']
let currentInput = '';
let firstValue = null;
let secondValue = null;
let runningValue = false;
let operator = null;
let opFlag = false;
let inputHold = null;

buttons.addEventListener('click', buttonClick)

function buttonClick(e) {

    const isButton = e.target.nodeName === 'BUTTON';
    
    if (!isButton) {
      return;
    }

    currentInput = e.target.value;

    if (opFlag == true && currentInput != "del" && currentInput != "=") {
        operationClear();
    }

    if (currentInput == 'clr') {
        clear();
    } else if (currentInput == 'del' && runningValue == false && (display.textContent != "NaN")) {
        display.textContent = display.textContent.slice(0, -1)
    } else {
        if (currentInput != "del" && currentInput != ".") {
            display.textContent += currentInput;
        } else if (currentInput == ".") {
            if (display.textContent.includes(".") == false) {
                display.textContent += currentInput;
            }
        }
    }

    displayLength(display.textContent);

    if (currentInput == '=') {
        equals();
    } else if (operators.includes(currentInput)) {
        
        
        
        if (operators.includes(display.textContent.slice(-1))) {
            display.textContent = display.textContent.slice(0, -1);
        }


        if (firstValue == null) {
            e.target.style.backgroundColor = 'lightblue'

            firstValue = display.textContent;
            
            if (isNaN(firstValue) || firstValue == '') {
                e.target.style.backgroundColor = 'lightgray'
                return clear()
            }

            opFlag = true;
            operator = currentInput;

        } else {
                colorClear()
                e.target.style.backgroundColor = 'lightblue'
                runningTotal();
        };
    } 
};


//Calculates total when the equals button is pressed
function equals() {
    if (firstValue != null) {
        if (operator != null) {
            display.textContent = display.textContent.slice(0, -1);
            secondValue = display.textContent;
            total = operate(operator, firstValue, secondValue);
            display.textContent = total;
            displayLength(total.toString());
            firstValue = total;
            runningValue = true;
            secondValue = null;
            opFlag = true;
            operator = null;
            colorClear(); 
            
        } else {
            display.textContent = numRound(display.textContent.slice(0, -1));
        }
    } else if (display.textContent.length > 0)  {
        opFlag = true;
        if (display.textContent == "=") {
            display.textContent = ''
        } else {
            display.textContent = numRound(display.textContent.slice(0, -1));
        }
    }
}

//Creates a running total if operation is continued after a single pair
function runningTotal() {

    if (runningValue == false) {
        secondValue = display.textContent;
 
        if (isNaN(firstValue)) {
             clear()
             return;
        } else if (isNaN(secondValue) || secondValue == '') {
            operator = currentInput;
            display.textContent = firstValue;
            opFlag = true;
            return;
        }

        total = operate(operator, firstValue, secondValue);
        display.textContent = total;
        firstValue = total;
        operator = currentInput;
        secondValue = null;
        opFlag = true;

    } else {
        opFlag = true;
        operator = currentInput;
        runningValue = false;
        display.textContent = firstValue;
    }
}

//Completely clears and resets values
function clear() {
    currentInput = '';
    display.textContent = '';
    firstValue = null;
    secondValue = null;
    opFlag = false;
    runningValue = false;
    colorClear();
}

//Controls how the display and current input are handled if operator button is selected
function operationClear() {
    display.textContent = ''
    if (operator == null && (nonValues.includes(currentInput) == false) ) { 
        inputHold = currentInput;
        clear();
        currentInput = inputHold;
    }
    opFlag = false;

}

//Stops display from exceeding 14 characters
function displayLength(string) {
    if (string.length > 14) {
        // display.textContent = string.slice(0, -1);
        display.textContent = string.substring(0,13);
    }
}

//Basic math functions
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
    a = parseFloat(a);
    b = parseFloat(b);
    if (operator === "+") {
        return numRound(add(a,b));
    } else if (operator === "-") {
        return numRound(subtract(a,b));
    } else if (operator === "x") {
        return numRound(multiply(a,b));
    } else if (operator === "/") {
        return numRound(divide(a,b));
    };
};

function colorClear() {

    for (item of opButtons) {
        item.style.backgroundColor = 'lightgrey';
    }
}

function numRound(numStr) {
    roundNum = parseFloat(numStr)
    return parseFloat(roundNum.toFixed(7));
}


