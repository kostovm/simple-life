import { displayAppInfo } from "./shared/utils.js";

const selectedApp = document.getElementById('app-select') as HTMLSelectElement | null;
const tryItButton = document.getElementById('try') as HTMLButtonElement | null;

if(selectedApp) selectedApp.addEventListener('input', testFunction);
if(tryItButton) tryItButton.addEventListener('click', redirectToApp);

let appName: string = '';

function testFunction(): void{
    appName = selectedApp!.value;

    if(tryItButton){
        tryItButton.disabled = appName === '';
        displayAppInfo(appName || 'default');
    }


}

function redirectToApp(){
    window.location.href = `/apps/${appName}/`;
}