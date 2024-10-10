
function escapeHandler() {
    if (document.addEventListener) {
        document.addEventListener('webkitfullscreenchange', exitHandler, true);
        document.addEventListener('mozfullscreenchange', exitHandler, true);
        document.addEventListener('fullscreenchange', exitHandler, true);
        document.addEventListener('MSFullscreenChange', exitHandler, true);
    }
}

function rollGoogleDocument() {
    rollGoogleSheet();
}

function rollGoogleSheet() {
    try {
        const chrome_bar = document.getElementById("docs-chrome");
        if (!chrome_bar) {
            console.log("docs-chrome not found");
            return;
        }

        chrome_bar.setAttribute("data_backup", chrome_bar.style);
        chrome_bar.style.display = "none";

    }
    catch {
        console.log("Exception handled");
        alert(chrome.i18n.getMessage("Problem with going to Full Screen detected"));
    }

}

function rollbackGoogleDocument() {
    rollbackGoogleSheet();
}

function rollbackGoogleSheet() {
    try {
        const chrome_bar = document.getElementById("docs-chrome");
        if (!chrome_bar) {
            console.log("docs-chrome not found");
            return;
        }

        chrome_bar.style = chrome_bar.getAttribute("data_backup");
    }
    catch {
        console.log("Exception handled");
        alert(chrome.i18n.getMessage("Problem with going to Full Screen detected"));
    }

}

function rollGoogleSlides() {
    try {
        const menu_bars = document.getElementById("docs-menubars");
        if (!menu_bars) {
            console.log("docs-menubars not found");
            return;
        }

        const menu_bar = document.getElementById("docs-menubar");
        if (!menu_bar) {
            console.log("docs-menubar not found");
            return;
        }

        const chrome_bar = document.getElementById("docs-chrome");
        if (!chrome_bar) {
            console.log("docs-chrome not found");
            return;
        }

        const notes = document.getElementById("speakernotes-container");
        if (!notes) {
            console.log("speakernotes-container not found");
            return;
        }

        const filmstrip = document.querySelector(".filmstrip");
        if (!filmstrip) {
            console.log("filmstrip not found");
            return;
        }

        filmstrip.setAttribute("data-display", filmstrip.style.display || "block");
        filmstrip.style.display = "none";

        chrome_bar.setAttribute("data_backup", chrome_bar.style);

        menu_bar.setAttribute("data_backup", menu_bar.style);

        menu_bars.setAttribute("data_backup", menu_bars.style);

        chrome_bar.style.display = "none";

        notes.setAttribute("data_backup", notes.style.display);
        notes.setAttribute("display", "block");
        notes.style.display = "none";
    }
    catch {
        console.log("Exception handled");
        alert(chrome.i18n.getMessage("Problem with going to Full Screen detected"));
    }

}

function rollbackGoogleSlide() {

    try {
        const menu_bars = document.getElementById("docs-menubars");
        if (!menu_bars) {
            console.log("docs-menubars not found");
            return;
        }

        const menu_bar = document.getElementById("docs-menubar");
        if (!menu_bar) {
            console.log("docs-menubar not found");
            return;
        }

        const chrome_bar = document.getElementById("docs-chrome");
        if (!chrome_bar) {
            console.log("docs-chrome not found");
            return;
        }

        const notes = document.getElementById("speakernotes-container");
        if (!notes) {
            console.log("speakernotes-container not found");
            return;
        }

        const filmstrip = document.querySelector(".filmstrip");
        if (!filmstrip) {
            console.log("filmstrip not found");
            return;
        }

        notes.style.display = notes.getAttribute("data_backup") || "block";

        filmstrip.style.display = filmstrip.getAttribute("data-display") || "block";
        chrome_bar.style = chrome_bar.getAttribute("data_backup");
        menu_bar.style = menu_bar.getAttribute("data_backup");
        menu_bars.style = menu_bars.getAttribute("data_backup");
    }
    catch {
        console.log("Exception handled");
        alert(chrome.i18n.getMessage("Problem with going to Full Screen detected"));
    }
}

function exitHandler() {
    if (!document.webkitIsFullScreen) {
        console.log("ESC handler start");

        if (!document.fullscreenElement) {

            let appType = getDocumentType();
            switch (appType) {
                case "Document":
                    {
                        rollbackGoogleDocument();
                        break;
                    }
                case "Sheet":
                    {
                        rollbackGoogleSheet();
                        break;
                    }
                case "Slides":
                    {
                        rollbackGoogleSlide();
                        break;
                    }
            }
            console.log("ESC handler end");
        }
    }
}

function getDocumentType() {
    let Slides = "docs.google.com/presentation/";
    let Sheet = "docs.google.com/spreadsheets";
    let Document = "docs.google.com/document";
    let Meet = "meet.google.com";

    let appType = "unknown";

    console.log("runing script injected");

    if (location.href.match(Slides)) {
        console.log("Slides detected");
        appType = "Slides";
    } else if ((location.href.match(Sheet))) {
        console.log("Spreadsheets detected");
        appType = "Sheet";
    } else if ((location.href.match(Document))) {
        console.log("Document detected");
        appType = "Document";
    } else if ((location.href.match(Meet))) {
        console.log("Meet detected");
        appType = "Meet";
    } else {
        console.log("Unknown type of google app");
        appType = "unknown";
    }
    return appType;
}

function StartFullScreen() {

    let appType = getDocumentType();

    console.log("runing script injected");

    switch (appType) {
        case "Document":
            {
                try {
                    if (document.fullscreenElement) {
                        console.log("Leaving full screen");

                        document.exitFullscreen();
                        rollbackGoogleDocument();
                    }
                    else {
                        console.log("Entering full screen");
                        escapeHandler();
                        rollGoogleDocument();
                        document.body.requestFullscreen();
                    }
                } catch {
                    console.log("Exception handled in google sheet");
                    alert(chrome.i18n.getMessage("Problem with going to Full Screen detected"));
                }
                break;
            }
        case "Sheet":
            {
                try {
                    if (document.fullscreenElement) {
                        console.log("Leaving full screen");

                        document.exitFullscreen();
                        rollbackGoogleSheet();
                    }
                    else {
                        console.log("Entering full screen");
                        escapeHandler();
                        rollGoogleSheet();
                        document.body.requestFullscreen();
                    }
                } catch {
                    console.log("Exception handled in google sheet");
                    alert(chrome.i18n.getMessage("Problem with going to Full Screen detected"));
                }
                break;
            }
        case "Slides":
            try {
                if (document.fullscreenElement) {
                    console.log("Leaving full screen");

                    document.exitFullscreen();
                    rollbackGoogleSlide();
                }
                else {
                    console.log("Entering full screen");

                    escapeHandler();
                    rollGoogleSlides();
                    document.body.requestFullscreen();
                }
            } catch {
                console.log("Exception handled in google slides");
                alert(chrome.i18n.getMessage("Problem with going to Full Screen detected"));
            }
            break;
    }
}

StartFullScreen();
