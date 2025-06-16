import { displayAppInfo } from "../../shared/utils.js";

const startInput = document.getElementById('start') as HTMLInputElement | null;
const endInput = document.getElementById('end') as HTMLInputElement | null;
const printButton = document.getElementById('send') as HTMLButtonElement | null;

displayAppInfo('print-and-sum');

startInput?.addEventListener('change', setMinEndNum);
startInput?.addEventListener('change', enablePrint);
endInput?.addEventListener('change', enablePrint)
printButton?.addEventListener('click', () => console.log('Printing!'))

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