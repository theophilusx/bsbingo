"use strict";

import { app, BrowserWindow, Menu, ipcMain, IpcMessageEvent } from "electron";
import { join } from "path";
import { format } from "url";
import getRandomInt from "./util";
import { readFile } from "fs";

var mainWindow: BrowserWindow;

// define menus
var mainMenuTemplate = [
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
  }
];

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 660,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(
    format({
      pathname: join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );
  mainWindow.on("close", function () {
    // For OSX UX consistency, don't quit
    // Set window handler to null
    mainWindow = null;
  });
  let mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
};

app.on("ready", createMainWindow);

app.on("window-all-closed", () => {
  // OSX UX keeps app running even when all windows
  // are closed
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
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
const getWordList = (filename: string) => {
  return new Promise((resolve, reject) => {
    let wordArray: string[] = [];

    try {
      readFile(
        join(__dirname, filename),
        { encoding: "utf8" },
        (err: Error, data: string) => {
          if (err) {
            reject(err.message);
          }
          wordArray = data.split("\n").filter(w => w.length > 0);
          resolve(wordArray);
        }
      );
    } catch (err) {
      reject(err.message);
    }
  });
};

// Generate a game of 'size' words with 'blanks' being
// blank from the list of available words in wordArray
function getGameWords(words: string[], size: number, blanks: number): string[] {
  let min: number = 0;
  let max: number = words.length;
  let gameSet: Set<number> = new Set();
  let blankSet: Set<number> = new Set();
  let gameWords: string[] = [];

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

let bingoWords: string[] = [];

// Read in word list and indicate when we are ready to play
getWordList("bsbingo.words")
  .then((words: string[]) => {
    // got word list - store
    bingoWords = words;
    ipcMain.on("game-request", (evt: IpcMessageEvent, msg: string) => {
      console.log(`Event game-request Msg: ${msg}`);
      let game: string[] = getGameWords(bingoWords, 15, 7);
      evt.sender.send("game-data", JSON.stringify(game));
    });
  })
  .catch((err) => {
    console.log(`Error: ${err.message}`);
    ipcMain.on("game-request", (evt: IpcMessageEvent, msg: string) => {
      console.log(`Event game-request" Msg: ${msg}`);
      evt.sender.send(JSON.stringify(`Error: ${err.message}`));
    });
  });
