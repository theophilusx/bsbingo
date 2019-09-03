"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = require("path");
const url_1 = require("url");
const util_1 = require("./util");
const fs_1 = require("fs");
var mainWindow;
// define menus
var mainMenuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: "Quit",
                accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
                click() {
                    electron_1.app.quit();
                }
            }
        ]
    }
];
const createMainWindow = () => {
    mainWindow = new electron_1.BrowserWindow({
        width: 900,
        height: 660,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(url_1.format({
        pathname: path_1.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
    }));
    mainWindow.on("close", function () {
        // For OSX UX consistency, don't quit
        // Set window handler to null
        mainWindow = null;
    });
    let mainMenu = electron_1.Menu.buildFromTemplate(mainMenuTemplate);
    electron_1.Menu.setApplicationMenu(mainMenu);
};
electron_1.app.on("ready", createMainWindow);
electron_1.app.on("window-all-closed", () => {
    // OSX UX keeps app running even when all windows
    // are closed
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", () => {
    // Handle OSX clicking on dock icon when app
    // still running
    if (mainWindow === null) {
        createMainWindow();
    }
});
// Game
// Read file of bingo words. Return array of words
// Using a Promise to do this is like hunting rabbits with
// a bazooka! However, this is deliberate as this functionality
// will likely be changed to an ajax call in the future.
const getWordList = (filename) => {
    return new Promise((resolve, reject) => {
        let wordArray = [];
        try {
            let wordFile = path_1.join(__dirname, filename);
            console.log(`Reading words from ${wordFile}`);
            fs_1.readFile(wordFile, { encoding: "utf-8" }, (err, data) => {
                console.log(err);
                if (err) {
                    console.log('Rejecting with file error');
                    return reject(err.message);
                }
                if (data === undefined || data.length === 0) {
                    return reject('No word list found');
                }
                console.log(`data: ${data}`);
                wordArray = data.split("\n").filter(w => w.length > 0);
                resolve(wordArray);
            });
        }
        catch (err) {
            reject(err.message);
        }
    });
};
// Generate a game of 'size' words with 'blanks' being
// blank from the list of available words in wordArray
function getGameWords(words, size, blanks) {
    let min = 0;
    let max = words.length;
    let gameSet = new Set();
    let blankSet = new Set();
    let gameWords = [];
    while (gameSet.size < size) {
        gameSet.add(util_1.default(min, max));
    }
    for (let id of gameSet) {
        gameWords.push(words[id]);
    }
    // We want some word slots to be blank
    while (blankSet.size < blanks) {
        blankSet.add(util_1.default(min, size));
    }
    for (let id of blankSet) {
        gameWords[id] = undefined;
    }
    console.log(`Returning list of ${gameWords.length}`);
    return gameWords;
}
;
let bingoWords = [];
// Read in word list and indicate when we are ready to play
getWordList("bsbingo.words")
    .then((words) => {
    // got word list - store
    bingoWords = words;
    electron_1.ipcMain.on("game-request", (evt, msg) => {
        console.log(`Event: game-request Msg: ${msg}`);
        let game = getGameWords(bingoWords, 15, 7);
        evt.sender.send("game-data", JSON.stringify(game));
    });
})
    .catch((err) => {
    console.log(`Error: ${err.message}`);
    electron_1.ipcMain.on("game-request", (evt, msg) => {
        console.log(`Event game-request" Msg: ${msg}`);
        evt.sender.send(JSON.stringify(`Error: ${err.message}`));
    });
});
