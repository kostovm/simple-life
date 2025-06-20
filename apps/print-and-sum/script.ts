import { displayAppInfo } from "../../shared/utils.js";

const startInput = document.getElementById('start') as HTMLInputElement | null;
const endInput = document.getElementById('end') as HTMLInputElement | null;
const sumOutput = document.getElementById('sum') as HTMLSpanElement | null;
const stringOutputField = document.querySelector('.output-field p') as HTMLElement |null;
const printButton = document.getElementById('send') as HTMLButtonElement | null;
const clearButton = document.getElementById('clear') as HTMLButtonElement | null;

displayAppInfo('print-and-sum');

startInput?.addEventListener('change', setMinEndNum);
startInput?.addEventListener('change', enablePrint);
endInput?.addEventListener('change', enablePrint);
printButton?.addEventListener('click', printNumbers);
clearButton?.addEventListener('click', clearAll);

function clearAll(){
    startInput!.value = "";
    endInput!.value = "";
    sumOutput!.textContent = "";
    stringOutputField!.textContent = "";
}

function setMinEndNum (): void{
    if (!startInput?.value){
        endInput!.disabled = true;
        endInput!.value = '';
        endInput!.removeAttribute('min');
    } else {
        const startValue = Number(startInput.value);
        endInput!.disabled = false;
        endInput!.setAttribute('min', (startValue + 1).toString());
        if (!endInput!.value || Number(endInput!.value) <= startValue){
            endInput!.value = (startValue + 1).toString();
        }
    }
}

function enablePrint (){
    const startValue = startInput?.value;
    const endValue = endInput?.value;
    if (startValue && endValue){
        printButton!.disabled = false;
    }else{
        printButton!.disabled = true;
    }
}

function printNumbers(){
    const startValue = Number(startInput?.value);
    const endValue = Number(endInput?.value);

    let sum = 0;
    let stringOutput = '';

    for (let num = startValue; num <= endValue; num++){
        sum += num;
        if(num == startValue){
            stringOutput += num;
        } else {
            stringOutput += `, ${num}`;
        }
    }

    console.log('Sum: ' + sum + ', Output: ' + stringOutput);
}