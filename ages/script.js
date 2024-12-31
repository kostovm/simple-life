"use strict";
console.log('Still works!');
const outputs = {
    baby: { text: 'Baby', icon: 'fa-solid fa-baby' },
    child: { text: 'Child', icon: 'fa-solid fa-child' },
    teenager: { text: 'Teenager', icon: 'fa-solid fa-pizza-slice' },
    adult: { text: 'Adult', icon: 'fa-solid fa-user' },
    elderly: { text: 'Elderly', icon: 'fa-regular fa-user' },
    outOfBound: "Age is out of bound!",
    emptyInput: "Enter age!"
};
const ageInput = document.getElementById('age');
const sendButton = document.getElementById('send');
const clearButton = document.getElementById('clear');
const outputField = document.querySelector('.output-field');
clearButton === null || clearButton === void 0 ? void 0 : clearButton.addEventListener('click', clearOutput);
sendButton === null || sendButton === void 0 ? void 0 : sendButton.addEventListener('click', showOutput);
function showOutput() {
    if (!ageInput || !outputField)
        return;
    outputField.replaceChildren();
    const ageValue = ageInput.value.trim();
    if (!ageValue) {
        displayOutput(outputs.emptyInput);
        return;
    }
    const age = Number(ageValue);
    if (isNaN(age)) {
        displayOutput('Invalid age value');
        return;
    }
    const { text, icon } = determineOutput(age);
    displayOutput(text, icon);
    ageInput.value = '';
}
function clearOutput() {
    if (!outputField)
        return;
    outputField.replaceChildren();
    if (ageInput)
        ageInput.value = '';
    displayOutput(outputs.emptyInput);
}
function determineOutput(age) {
    if (age < 0 || age > 120) {
        return { text: outputs.outOfBound };
    }
    else if (age < 3) {
        return outputs.baby;
    }
    else if (age < 14) {
        return outputs.child;
    }
    else if (age < 20) {
        return outputs.teenager;
    }
    else if (age < 66) {
        return outputs.adult;
    }
    else {
        return outputs.elderly;
    }
}
function displayOutput(text, iconClass) {
    const outputP = document.createElement('p');
    if (iconClass) {
        const icon = document.createElement('i');
        icon.className = iconClass;
        outputP.appendChild(icon);
    }
    outputP.appendChild(document.createTextNode(text));
    outputField === null || outputField === void 0 ? void 0 : outputField.appendChild(outputP);
}
