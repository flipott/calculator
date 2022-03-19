const buttons = document.getElementById('buttons');
const display = document.querySelector('#display')
const operators = ['+', '-', 'x', '/']
let currentInput = null;
let firstValue = null;
let operator = null;


buttons.addEventListener('click', buttonClick)

function buttonClick(e) {

    const isButton = e.target.nodeName === 'BUTTON';
    if (!isButton) {
      return;
    }

    currentInput = e.target.value;
    if (operator != null) {
        display.textContent == ""}
    
    display.textContent += currentInput;
    
    if (currentInput == "=") {
        equals()
    }


    if (currentInput == "clr") {
        clear();
    } else if (currentInput == "del") {
        display.textContent = display.textContent.slice(0,-4);
    } else if (operators.includes(currentInput)) {
        if (firstValue == null) {
            operator = currentInput;
            display.textContent = display.textContent.slice(0, -1);
            firstValue = parseInt(display.textContent);
        } else {
            equals();
        }
    } 





};


function equals() {
    secondValue = parseInt(display.textContent.slice(0, -1));
    let total = operate(operator, firstValue, secondValue);
    display.textContent = total;
    firstValue = total;
    secondValue = null;
}


function clear() {
    currentInput = null;
    display.textContent = '';
    firstValue = null;
    secondValue = null;
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


//     if (currentChoice == "clr") {
//         clear();
//     }

//     if (firstValue == null) {
//         currentInput.textContent += currentChoice;
//     } else {
//         currentInput.textContent == '';
//     }

//     if (totalDisplay.textContent !== "" && (operators.includes(currentChoice) == false)) {
//         if (prevOperator == null) {
//             clearOnTotal();
//             console.log("Alert")
//         };
//     };


//     if (currentChoice == "=") {
//         equals();
//     }


//     if (operators.includes(currentChoice)) {
//         if (firstValue == null) {
//             firstValue = parseInt(currentInput.textContent);
//             currentInput.textContent = firstValue;
//             prevOperator = currentChoice;
//         } else {
//             secondValue = parseInt(currentInput.textContent);
//             runningTotal = operate(prevOperator, firstValue, secondValue);
//             totalDisplay.textContent = runningTotal;
//             currentInput.textContent = '';
//             firstValue = runningTotal;
//             secondValue = null;
//             prevOperator = currentChoice;
//         };
//     };
    

// })


// function equals() {
//     secondValue = parseInt(currentInput.textContent);
//     finalTotal = operate(prevOperator, firstValue, secondValue);
//     totalDisplay.textContent = finalTotal;
//     currentInput.textContent = '';
//     firstValue = finalTotal;
//     secondValue = null;
//     prevOperator = null;
// }




// let operator = "";
// let currentChoice = "";
// let firstValue;
// let secondValue;
// let prevOperator;









// //Clears values minus current input
// function clearOnTotal() {
//     totalDisplay.textContent = '';
//     operator = "";
//     currentChoice = "";
//     firstValue = null;
//     secondValue = null; 
// }


// //Resets all values
// function clear() {
//     currentInput.textContent = '';
//     totalDisplay.textContent = '';
//     operator = "";
//     currentChoice = "";
//     firstValue = null;
//     secondValue = null; 
// 