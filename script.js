//Select DOM elements
const buttons = document.getElementById('buttons');
const opButtons = document.querySelectorAll('#divide, #multiply, #subtract, #plus')
const display = document.querySelector('#display')
const operators = ['+', '-', 'x', '/']
const nonValues = ['+', '-', 'x', '/', '=', 'clr', 'del']

//Initalize variables
let currentInput = '';
let firstValue = null;
let secondValue = null;
let runningValue = false;
let operator = null;
let opFlag = false;
let inputHold = null;

buttons.addEventListener('click', buttonClick);
document.addEventListener('keydown', keyButton);

//Performs calculator functions when a button is clicked
function buttonClick(e) {
    if (!e.target) {
        currentInput = e.value;
    } else {
        const isButton = e.target.nodeName === 'BUTTON';
        if (!isButton) {
          return;
        };
        currentInput = e.target.value;
    };
    
    if (opFlag == true && currentInput != 'del' && currentInput != '=' && firstValue != null || display.textContent == 'DIV/0 ERROR') {
        operationClear();
    };

    if (currentInput == 'clr') {
        clear();
    } else if (currentInput == 'del' && runningValue == false && (display.textContent != 'NaN' && (operators.includes(inputHold) == false))) {
        display.textContent = display.textContent.slice(0, -1);
    } else {
        if (currentInput != 'del' && currentInput != '.' && (display.textContent.length < 12)) {
            display.textContent += currentInput;
            if (currentInput != '=') {
                inputHold = currentInput;
            };
        } else if (currentInput == '.') {
            if (display.textContent.includes('.') == false && (display.textContent.length < 12)) {
                display.textContent += currentInput;
            };
        };
    };

    displayLength(display.textContent);

    if (currentInput == '=') {
        equals();
    } else if (operators.includes(currentInput)) {
        inputHold = currentInput;
        if (operators.includes(display.textContent.slice(-1))) {
            display.textContent = display.textContent.slice(0, -1);
        };

        if (firstValue == null) {
            document.querySelectorAll(`[value = "${currentInput}"]`)[0].style.backgroundColor = 'darkgray';
            firstValue = display.textContent;
            displayLength(display.textContent);
        
            if (isNaN(firstValue) || firstValue == '') {
                document.querySelectorAll(`[value = "${currentInput}"]`)[0].style.backgroundColor = 'lightgray';
                return clear()
            };
            opFlag = true;
            operator = currentInput;

        } else {
                colorClear()
                document.querySelectorAll(`[value = "${currentInput}"]`)[0].style.backgroundColor = 'darkgray';
                runningTotal();
                displayLength(display.textContent);
        };
    };
}

//Calculates total when the equals button is pressed
function equals() {

    //Returns original input if operator then '=' is selected
    if (operators.includes(inputHold)) {
        displayLength(display.textContent);
        colorClear();
        return;
    };

    if (firstValue != null) {
        if (operator != null) {
            display.textContent = display.textContent;
            secondValue = display.textContent;
            if (parseInt(secondValue) === 0 && operator == '/') {
                return divZero();
            };
            total = operate(operator, firstValue, secondValue);
            display.textContent = total;
            displayLength(display.textContent);
            firstValue = total;
            runningValue = true;
            secondValue = null;
            opFlag = true;
            operator = null;
            colorClear(); 
        } else {
            displayLength(display.textContent);            
        };
    } else if (display.textContent.length > 0)  {
        opFlag = true;
        if (display.textContent == '=') {
            display.textContent = '';
        } else {
            displayLength(display.textContent);
        };
    };
}

//Creates a running total if operation is continued after a single pair
function runningTotal() {
    if (runningValue == false) {
        secondValue = display.textContent;

        if (parseInt(secondValue) === 0 && operator == '/') {
            return divZero();
        };

        if (isNaN(firstValue)) {
            clear()
            return;
        } else if (isNaN(secondValue) || secondValue == '') {
            operator = currentInput;
            display.textContent = firstValue;
            displayLength(display.textContent);
            opFlag = true;
            return;
        };
        total = operate(operator, firstValue, secondValue);
        display.textContent = total;
        displayLength(display.textContent);
        firstValue = total;
        operator = currentInput;
        secondValue = null;
        opFlag = true;
    } else {
        opFlag = true;
        operator = currentInput;
        runningValue = false;
        display.textContent = firstValue;
    };
}

//Returns an error if the user tries to divide by 0
function divZero() {
    display.textContent = 'DIV/0 ERROR'
    firstValue = null;
    secondValue = null;
    colorClear();
    return;
}

//Clears and resets values
function clear() {
    currentInput = '';
    display.textContent = '';
    firstValue = null;
    secondValue = null;
    opFlag = false;
    runningValue = false;
    operator = null;
    colorClear();
}

//Controls how the display and current input are handled if operator button is selected
function operationClear() {
    display.textContent = ''
    if (operator == null && (nonValues.includes(currentInput) == false) ) { 
        inputHold = currentInput;
        clear();
        currentInput = inputHold;
        inputHold = null;
    };
    opFlag = false;
}

//Stops display from exceeding screen length
function displayLength(string) {
    if (string.includes('=')) {
        display.textContent = string.slice(0, -1);
    } else if (string.length > 12) {
        display.textContent = string.substring(0,13);
    }; 
}

//Rounds number so screen doesn't overflow
function numRound(numStr) {
    roundNum = parseFloat(numStr);
    return parseFloat(roundNum.toFixed(7));
}

//Resets button colors to default value
function colorClear() {
    for (item of opButtons) {
        item.style.backgroundColor = 'lightgrey';
    };
}

//Basic math functions
function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (operator === '+') {
        return numRound(add(a,b));
    } else if (operator === '-') {
        return numRound(subtract(a,b));
    } else if (operator === 'x') {
        return numRound(multiply(a,b));
    } else if (operator === '/') {
        return numRound(divide(a,b));
    };
}

//Binds keypresses to button clicks
function keyButton(e) {
    switch (e.keyCode) {
        case 48:
        case 96:
            buttonClick(document.getElementById('zero'));
            break;
        case 49:
        case 97:
            buttonClick(document.getElementById('one'));
            break;
        case 50:
        case 98:
            buttonClick(document.getElementById('two'));
            break;
        case 51:
        case 99:
            buttonClick(document.getElementById('three'));
            break;
        case 52:
        case 100:
            buttonClick(document.getElementById('four'));
            break;
        case 53:
        case 101:
            buttonClick(document.getElementById('five'));
            break;
        case 54:
        case 102:
            buttonClick(document.getElementById('six'));
            break;
        case 55:
        case 103:
            buttonClick(document.getElementById('seven'));
            break;
        case 56:
        case 104:
            if (e.shiftKey === true) {
                buttonClick(document.getElementById('multiply'));
                break;
            } else {
                buttonClick(document.getElementById('eight'));
                break;
            };
        case 57:
        case 105:
            buttonClick(document.getElementById('nine'));
            break;
        case 27:
            buttonClick(document.getElementById('clear'));
            break;
        case 8:
        case 46:
            buttonClick(document.getElementById('del'));
            break;
        case 191:
        case 111:
            buttonClick(document.getElementById('divide'));
            break;
        case 56:
            if (e.shiftKey === true) {
                buttonClick(document.getElementById('multiply'));
                break;
            } else {
                buttonClick(document.getElementById('eight'));
                break;
            };
        case 88:
        case 106:
            buttonClick(document.getElementById('multiply'));
            break;
        case 173:
        case 109:
        case 189:
            buttonClick(document.getElementById('subtract'));
            break;
        case 61:
        case 187:
            if (e.shiftKey === true) {
                buttonClick(document.getElementById('plus'));
                break;
            } else {
                buttonClick(document.getElementById('equals'));
                break;
            };
        case 107:
            buttonClick(document.getElementById('plus'));
            break;
        case 13:
            buttonClick(document.getElementById('equals'));
            break;
        case 190:
        case 110:
            buttonClick(document.getElementById('decimal'));
            break;
    };
}