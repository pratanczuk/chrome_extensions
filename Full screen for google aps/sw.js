
class MyBackgroundWorker {
    init() {

        chrome.commands.onCommand.addListener((command, tab) => {
            console.log("Command received");
            if (command == "keys_combination_pressed") {
                void this.#goFullscreen(tab);
            }
        });
        
        console.log("Init done");
    }

    async getActiveTabIdAsync() {
        return (await this.getActiveTabAsync())?.id;
    }

    async injectScriptsAsync(tabId, files, allFrames = false) {
        if (!tabId) {
            tabId = await this.getActiveTabIdAsync();
            if (!tabId) {
                return;
            }
        }
        for (const file of files) {
            await chrome.scripting.executeScript({
                target: {
                    tabId,
                    allFrames,
                },
                files: [file],
            });
        }
    }

    async #goFullscreen(tab) {
        try {

            console.log("Command received");

            const id = tab.id;
            if (!id) {
                return;
            }
            await this.injectScriptsAsync(id, ["utils.js"]);
        }
        catch
        {
            console.log("Problem with script injection");
        }
    }
}

new MyBackgroundWorker().init();
