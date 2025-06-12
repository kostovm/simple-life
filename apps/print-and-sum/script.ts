import { displayAppInfo } from "../../shared/utils.js";

const startInput = document.getElementById('start') as HTMLInputElement | null;
const endInput = document.getElementById('end') as HTMLInputElement | null;

displayAppInfo('print-and-sum');

startInput?.addEventListener('change', setMinEndNum);

function setMinEndNum (){
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