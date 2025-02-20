import { getAppInfo } from "../utils.js";

const numberInput = document.getElementById('number-input') as HTMLInputElement | null;
const numberOutput = document.querySelector('.output-field') as HTMLElement | null;
const precisionDisplay = document.getElementById('precisionNumber') as HTMLSpanElement | null;
const decrementButton = document.getElementById('decrement') as HTMLButtonElement | null;
const incrementButton = document.getElementById('increment') as HTMLButtonElement | null;
const title = document.querySelector('.title') as HTMLElement | null;

const MIN_PRECISION = 0;
const MAX_PRECISION = 15;

numberInput?.addEventListener('input', handleNumberInput);
decrementButton?.addEventListener('click', () => adjustPrecision(-1));
incrementButton?.addEventListener('click', () => adjustPrecision(1));

getAppInfo('rounding-numbers').then(info => {
    if(info){
        title? title.textContent = info.name : console.log('Error: Title not found');
        console.log(info.note);
        console.log(info.howToUse);
    } else {
        console.log('App not found!')
    }
});

function handleNumberInput(): void {
    if (!numberInput || !numberOutput || !precisionDisplay) return

    const inputValue = numberInput.value.trim();
    const precision = parseInt(precisionDisplay.textContent || "0", 10);

    if (inputValue !== '') {

        const formattedNumber = formatNumber(inputValue, precision);
        numberOutput.textContent = formattedNumber;
    } else {
        numberOutput.textContent = 'Enter valid number';
    }
}

function adjustPrecision(delta: number): void {

    if (!precisionDisplay || !incrementButton || !decrementButton) return;

    let precision = parseInt(precisionDisplay.textContent || "0", 10);
    precision = Math.min(MAX_PRECISION, Math.max(MIN_PRECISION, precision + delta));

    precisionDisplay.textContent = precision.toString();

    decrementButton.disabled = precision === MIN_PRECISION;
    incrementButton.disabled = precision === MAX_PRECISION;

    handleNumberInput();
}

function formatNumber(value: string, precision: number): string {

    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return 'Invalid number';

    return numericValue.toFixed(precision).replace(/\.?0+$/, '');

}