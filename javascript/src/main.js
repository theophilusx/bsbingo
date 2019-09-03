"use strict";

const {app, BrowserWindow, Menu, ipcMain} = require("electron");
const {readFile} = require("fs");
const {getRandomInt} = require("./utils");
const {join} = require("path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// list of words used to generate games
let words = [];

/**
 * Menu definition
 */
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  },
  {
    label: "View",
    submenu: [
      {
        label: "Toggle DevTools",
        click() {
          mainWindow.webContents.toggleDevTools();
        }
      }
    ]
  }
];

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(mainMenuTemplate));
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

/**
 * Get the word list used to create games
 *
 * @param {string} filename - path to the words file
 * @returns {Array}
 */
const getWordList = filename => {
  return new Promise((resolve, reject) => {
    let words = [];

    try {
      let wordFile = join(__dirname, filename);
      readFile(wordFile, {encoding: "utf-8"}, (err, data) => {
        if (err) {
          reject(err);
        } else if (!data || !data.length) {
          reject(new Error("No word list found"));
        } else {
          words = data.split("\n").filter(w => w.length > 0);
          resolve(words);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Generate the words for a game
 *
 * @param {Array} words - list of available words
 * @param {number} size - number of words in a game
 * @param {number} blanks - number of blank slots
 * @returns {Array} list of game words
 */
const getGameWords = (words, size, blanks) => {
  let min = 0;
  let max = words.length;
  let gameSet = new Set();
  let blankSet = new Set();
  let gameWords = [];

  while (gameSet.size < size) {
    gameSet.add(getRandomInt(min, max));
  }
  for (let id of gameSet) {
    gameWords.push(words[id]);
  }

  // We want some word slots to be blank
  while (blankSet.size < blanks) {
    blankSet.add(getRandomInt(min, size));
  }
  for (let id of blankSet) {
    gameWords[id] = undefined;
  }

  console.log(`Returning list of ${gameWords.length}`);

  return gameWords;
};

getWordList("bsbingo.dict")
  .then(gameWords => {
    words = gameWords;
    ipcMain.on("game-request", (evt, msg) => {
      console.log(`Event: game-request Msg: ${msg}`);
      let game = getGameWords(words, 15, 7);
      evt.sender.send("game-data", JSON.stringify(game));
    });
    return true;
  })
  .catch(err => {
    console.error(`Error: ${err.message}`);
    app.quit();
  });
