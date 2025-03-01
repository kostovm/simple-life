import { displayAppInfo } from "../../shared/utils.js";

const yearInputField = document.getElementById('year') as HTMLInputElement;
const checkYearButton = document.getElementById('check') as HTMLButtonElement;
const randomYearButton = document.getElementById('random') as HTMLButtonElement;
const yearResultField = document.getElementById('result-field') as HTMLElement;
const yearResultTextField = document.querySelector('p.result') as HTMLParagraphElement;

if (yearInputField) yearInputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') checkYear();
});
if (checkYearButton) checkYearButton.addEventListener('click', checkYear);
if (randomYearButton) randomYearButton.addEventListener('click', randomYearGenerator);

displayAppInfo('leap-year');

function checkYear(): void {
    const yearValue = Number(yearInputField.value);
    let result = '';

    if (!yearValue || yearValue === 0 || !Number.isInteger(yearValue)) {
        result = 'invalid'
    } else if ((yearValue % 4 === 0 && yearValue % 100 !== 0) || yearValue % 400 === 0) {
        result = 'yes';
    } else {
        result = 'no';
    }

    yearResultField.classList.value = `result-field ${result}`;

    if (result === 'invalid') {
        yearResultTextField.textContent = 'Not a valid year!';
    } else {
        yearResultTextField.textContent = String(Math.abs(yearValue)) +
            (yearValue < 0 ? ' BCE' : ' CE') +
            (result === 'yes' ? ' is' : " isn't") +
            ' a leap year';
    };
}

function randomYearGenerator(): void {

    let randomYear = 0;
    while (randomYear === 0) {
        randomYear = Math.floor(Math.random() * (2100 - (-6000) + 1)) + (-6000);
    }

    yearInputField.value = String(randomYear);

    checkYear();
}