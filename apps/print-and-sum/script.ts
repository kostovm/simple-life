import { displayAppInfo } from "../../shared/utils.js";

const startInput = document.getElementById('start') as HTMLInputElement;
const endInput = document.getElementById('end') as HTMLInputElement;
const sumOutput = document.getElementById('sum') as HTMLSpanElement;
const numbersOutput = document.querySelector('.output-field p') as HTMLElement;
const printButton = document.getElementById('send') as HTMLButtonElement;
const clearButton = document.getElementById('clear') as HTMLButtonElement;

displayAppInfo('print-and-sum');

startInput.addEventListener('change', updateEndInputMinAndValue);
startInput.addEventListener('change', updatePrintButtonState);
endInput.addEventListener('change', updatePrintButtonState);
printButton.addEventListener('click', printNumbersAndSum);
clearButton.addEventListener('click', clearInputsAndOutput);

function clearInputsAndOutput(): void {
    startInput.value = "";
    endInput.value = "";
    sumOutput.textContent = "";
    numbersOutput.textContent = "";

    updateEndInputMinAndValue();
    updatePrintButtonState();
}

function updateEndInputMinAndValue(): void {
    const startValue = Number(startInput.value);

    if (!startInput.value) {
        endInput.disabled = true;
        endInput.removeAttribute('min');
        endInput.value = '';
        return;
    }

    endInput.disabled = false;
    endInput.min = (startValue + 1).toString();

    if (!endInput.value || Number(endInput.value) <= startValue) {
        printButton.disabled = !(startInput.value && endInput.value);
    }
}

function updatePrintButtonState(): void {
    printButton.disabled = !(startInput.value && endInput.value);
}

function printNumbersAndSum(): void {
    const startValue = Number(startInput.value);
    const endValue = Number(endInput.value);

    let sum = 0;
    const numbers: number[] = [];

    for (let num = startValue; num <= endValue; num++) {
        sum += num;
        numbers.push(num);
    }

    sumOutput.textContent = sum.toString();
    numbersOutput.textContent = numbers.join(', ');
}