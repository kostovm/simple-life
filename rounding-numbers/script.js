"use strict";
const numberInput = document.getElementById('number-input');
const numberOutput = document.querySelector('.output-field');
const precisionDisplay = document.getElementById('precisionNumber');
const decrementButton = document.getElementById('decrement');
const incrementButton = document.getElementById('increment');
const MIN_PRECISION = 0;
const MAX_PRECISION = 15;
numberInput === null || numberInput === void 0 ? void 0 : numberInput.addEventListener('input', handleNumberInput);
decrementButton === null || decrementButton === void 0 ? void 0 : decrementButton.addEventListener('click', () => adjustPrecision(-1));
incrementButton === null || incrementButton === void 0 ? void 0 : incrementButton.addEventListener('click', () => adjustPrecision(1));
function handleNumberInput() {
    if (!numberInput || !numberOutput || !precisionDisplay)
        return;
    const inputValue = numberInput.value.trim();
    const precision = parseInt(precisionDisplay.textContent || "0", 10);
    if (inputValue !== '') {
        const formattedNumber = formatNumber(inputValue, precision);
        numberOutput.textContent = formattedNumber;
    }
    else {
        numberOutput.textContent = 'Enter valid number';
    }
}
function adjustPrecision(delta) {
    if (!precisionDisplay || !incrementButton || !decrementButton)
        return;
    let precision = parseInt(precisionDisplay.textContent || "0", 10);
    precision = Math.min(MAX_PRECISION, Math.max(MIN_PRECISION, precision + delta));
    precisionDisplay.textContent = precision.toString();
    decrementButton.disabled = precision === MIN_PRECISION;
    incrementButton.disabled = precision === MAX_PRECISION;
    handleNumberInput();
}
function formatNumber(value, precision) {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue))
        return 'Invalid number';
    return numericValue.toFixed(precision).replace(/\.?0+$/, '');
}
