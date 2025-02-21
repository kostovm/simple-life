type AppInfo = {
    name: string,
    folder: string,
    note: string,
    howToUse: string
}

async function getAppInfo(appName: string): Promise<AppInfo | null> {
    try {
        const response = await fetch('../app-info.json');
        const data: AppInfo[] = await response.json();
        const appInfo = data.find(app => app.folder === appName);

        return appInfo || null;

    } catch (error) {
        console.log('Error: ', error);
        return null;
    }
}

export async function displayAppInfo(appName: string) {

    const info = await getAppInfo(appName);

    if(!info){
        console.log('App not found');
        return;
    }

    updateTextContent(document.querySelector(".title"), info.name, 'Title');
    updateTextContent(document.querySelector(".note-text"), info.note, 'Note');
    updateTextContent(document.querySelector(".description-text"), info.howToUse, 'Description');
}

function updateTextContent(element: HTMLElement | null, text: string, name: string){

    if(element){
        element.textContent = text;
    } else {
        console.log(`Error ${name} not found`)
    }
}