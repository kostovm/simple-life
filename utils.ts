type AppInfo = {
    name: string,
    folder: string,
    note: string,
    howToUse: string
}

export async function getAppInfo(appName: string): Promise<AppInfo | null> {
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