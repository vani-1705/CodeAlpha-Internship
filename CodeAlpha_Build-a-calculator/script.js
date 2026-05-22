// ===== STATE VARIABLES =====
var currentNumber = '';   // User currently typing number
var previousNumber = '';  // Previous number 
var operator = '';        // +, -, *, /
var justCalculated = false; // = output value

// ===== DOM ELEMENTS =====
var resultDisplay    = document.getElementById('result');
var expressionDisplay = document.getElementById('expression');

/* ==========================================================
   FUNCTION 1: Appending Number ( Button click add number )
 ============================================================ */
function appendNumber(num) {
  // = value
  if (justCalculated) {
    currentNumber = '';
    justCalculated = false;
  }
  // Only allow 10 digits 
  if (currentNumber.length >= 10) return;

  // if current value 0, if we press 0 ignore
  if (currentNumber === '0' && num === '0') return;

  currentNumber += num;
  updateDisplay();
}

/* =====================================
    FUNCTION 2: Appending Decimal points
  ====================================== */
function appendDot() {
  if (justCalculated) {
    currentNumber = '0';
    justCalculated = false;
  }

  // Allowing . value
  if (currentNumber.includes('.')) return;

  // Default value 0
  if (currentNumber === '') currentNumber = '0';

  currentNumber += '.';
  updateDisplay();
}

/* ========================================================
   FUNCTION 3: Set Operation ( +, -, *, / ) press value
  ========================================================= */
function setOperator(op) {
  justCalculated = false;

  // If number is already typed calculate it
  if (currentNumber !== '' && previousNumber !== '') {
    calculate();
  }
 // Make Current number move previous 
  if (currentNumber !== '') {
    previousNumber = currentNumber;
    currentNumber  = '';
  }

  operator = op;

  // Expression display update
  var opSymbol = op === '/' ? '÷' : op === '*' ? '×' : op === '-' ? '−' : '+';
  expressionDisplay.textContent = previousNumber + ' ' + opSymbol;
}

/* ===================================
   FUNCTION 4: Calculate  = button 
  =================================== */
function calculate() {
  // Without two numbers and operator don't calculate  
  if (previousNumber === '' || operator === '' || currentNumber === '') return;

  var num1   = parseFloat(previousNumber);
  var num2   = parseFloat(currentNumber);
  var answer = 0;

  // Expression display full calculation
  var opSymbol = operator === '/' ? '÷' : operator === '*' ? '×' : operator === '-' ? '−' : '+';
  expressionDisplay.textContent = previousNumber + ' ' + opSymbol + ' ' + currentNumber;

  // Performing Arithmetic operation
  if (operator === '+') answer = num1 + num2;
  if (operator === '-') answer = num1 - num2;
  if (operator === '*') answer = num1 * num2;
  if (operator === '/') {
    if (num2 === 0) {
 // Any number id divide with zero then show Error 
      resultDisplay.textContent = 'Error';
      expressionDisplay.textContent = '';
      currentNumber  = '';
      previousNumber = '';
      operator       = '';
      return;
    }
    answer = num1 / num2;
  }

  // Float precision fix — 10 decimal places limit
  answer = parseFloat(answer.toFixed(10));

  // Result display update
  currentNumber  = String(answer);
  previousNumber = '';
  operator       = '';
  justCalculated = true;

  updateDisplay();
}

/* ===================================
   FUNCTION 5: AC = All Clear
  =================================== */
function clearAll() {
  currentNumber  = '';
  previousNumber = '';
  operator       = '';
  justCalculated = false;

  resultDisplay.textContent    = '0';
  expressionDisplay.textContent = '';
}

/* ===================================
   FUNCTION 6: +/- Toggle sign
 =================================== */
function toggleSign() {
  if (currentNumber === '' || currentNumber === '0') return;

  if (currentNumber.startsWith('-')) {
    currentNumber = currentNumber.slice(1);  // Removing minus
  } else {
    currentNumber = '-' + currentNumber;     // Adding minus
  }
  updateDisplay();
}

/* ===================================
   FUNCTION 7: Percentage
  =================================== */
function percentage() {
  if (currentNumber === '') return;
  currentNumber = String(parseFloat(currentNumber) / 100);
  updateDisplay();
}

/* ==================================================================
   FUNCTION 8: Display update Showing output value in Result screen
   ================================================================== */
function updateDisplay() {
  var display = currentNumber === '' ? '0' : currentNumber;

  // Decreasing number length font size
  if (display.length > 9) {
    resultDisplay.classList.add('small');
  } else {
    resultDisplay.classList.remove('small');
  }

  resultDisplay.textContent = display;
}

/* ======================================================
   FUNCTION 9: Keyboard Support (Can type with Keyboard)
   ====================================================== */
document.addEventListener('keydown', function(event) {
  var key = event.key;

  if (key >= '0' && key <= '9')  appendNumber(key);
  if (key === '.')               appendDot();
  if (key === '+')               setOperator('+');
  if (key === '-')               setOperator('-');
  if (key === '*')               setOperator('*');
  if (key === '/')               { event.preventDefault(); setOperator('/'); }
  if (key === 'Enter' || key === '=') calculate();
  if (key === 'Escape')          clearAll();
  if (key === 'Backspace')       {
    currentNumber = currentNumber.slice(0, -1);
    updateDisplay();
  }
  if (key === '%')               percentage();
});
