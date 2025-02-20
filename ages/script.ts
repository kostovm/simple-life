import { getAppInfo } from "../utils.js";

type Output = {
    text: string,
    icon: string
};

const outputs = {
    baby: {text: 'Baby', icon: 'fa-solid fa-baby'},
    child: {text: 'Child', icon: 'fa-solid fa-child'},
    teenager: {text: 'Teenager', icon: 'fa-solid fa-pizza-slice'},
    adult: {text: 'Adult', icon: 'fa-solid fa-user'},
    elderly: {text: 'Elderly', icon: 'fa-regular fa-user'},
    outOfBound: "Age is out of bound!",
    emptyInput: "Enter age!"
}

const ageInput = document.getElementById('age') as HTMLInputElement | null;
const sendButton = document.getElementById('send') as HTMLInputElement | null;
const clearButton = document.getElementById('clear') as HTMLElement | null;
const outputField = document.querySelector('.output-field') as HTMLElement | null;
const title = document.querySelector('.title') as HTMLElement | null;

getAppInfo('ages').then(info => {
    if(info){
        title? title.textContent = info.name : console.log('Error: Title not found');
        console.log(info.note);
        console.log(info.howToUse);
    } else {
        console.log('App not found!')
    }
});

clearButton?.addEventListener('click', clearOutput);
sendButton?.addEventListener('click', showOutput);
ageInput?.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        showOutput();
    }
});


function showOutput(): void{

    if(!ageInput || !outputField) return;

    outputField.replaceChildren();

    const ageValue = ageInput.value.trim();
    if(!ageValue){
        displayOutput(outputs.emptyInput);
        return;
    }

    const age = Number(ageValue);
    if(isNaN(age)){
        displayOutput('Invalid age value');
        return;
    }
    
    const {text, icon} = determineOutput(age);
    displayOutput(text, icon);
    ageInput.value = '';

}

function clearOutput(): void{

    if(!outputField) return;

    outputField.replaceChildren();
    if (ageInput) ageInput.value = '';

    displayOutput(outputs.emptyInput);
}

function determineOutput(age: number): {text: string; icon?: string}{

    if(age < 0 || age > 120){
        return {text: outputs.outOfBound};
    } else if(age < 3){
        return outputs.baby;
    } else if(age < 14){
        return outputs.child;
    } else if(age < 20){
        return outputs.teenager;
    } else if(age < 66){
        return outputs.adult;
    }else {
        return outputs.elderly;
    }

}

function displayOutput(text: string, iconClass?: string){

    const outputP: HTMLElement = document.createElement('p');

    if(iconClass){
        const icon = document.createElement('i');
        icon.className = iconClass;
        outputP.appendChild(icon);
    }

    outputP.appendChild(document.createTextNode(text));
    outputField?.appendChild(outputP);

}