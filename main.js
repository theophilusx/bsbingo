/* jshint esversion: 6, node: true */
"use strict";

const electron = require("electron");
const { join } = require("path");
const { format } = require("url");
const { getRandomInt } = require("./util");
const { createReadStream } = require("fs");

// set environment
process.env.NODE_ENV = "development";

const { app, BrowserWindow, Menu, ipcMain } = electron;

var mainWindow;

// define menus
var mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];

// add empty entry to get OSX menus looking right
if (process.platform == "darwin") {
  mainMenuTemplate.unshift({});
}

// add developer menu item if not prod version
if (process.env.NODE_ENV != "production") {
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        role: "reload"
      },
      {
        label: "Toggle DevTools",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}

function createMainWindow() {
  var mainMenu;

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
  mainWindow.on("close", function() {
    // For OSX UX consistency, don't quit
    // Set window handler to null
    mainWindow = null;
  });
  mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

app.on("ready", createMainWindow);

app.on("window-all-closed", function() {
  // OSX UX keeps app running even when all windows
  // are closed
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
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
function getWordList(filename) {
  return new Promise(function(resolve, reject) {
    var tmp = "",
      wordArray = [];

    createReadStream(join(__dirname, filename), { encoding: "UTF-8" })
      .on("data", chunk => (tmp += chunk))
      .on("error", err => reject(err))
      .on("end", function() {
        wordArray = tmp.split("\n").filter(w => w.length > 0);
        resolve(wordArray);
      });
  });
}

// Generate a game of 'size' words with 'blanks' being
// blank from the list of available words in wordArray
function getGameWords(wordArray, size, blanks) {
  var min = 0;
  var max = wordArray.length;
  var gameSet = new Set();
  var blankSet = new Set();
  var gameWords = [];

  // build up list of random words
  while (gameSet.size < size) {
    gameSet.add(getRandomInt(min, max));
  }
  for (let id of gameSet) {
    gameWords.push(wordArray[id]);
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
}

var bingoWords = [];

// Read in word list and indicate when we are ready to play
getWordList("bsbingo.words")
  .then(function(words) {
    // got word list - store
    bingoWords = words;
    ipcMain.on("game-request", function(evt, msg) {
      var game = getGameWords(bingoWords, 15, 7);
      evt.sender.send("game-data", JSON.stringify(game));
    });
  })
  .catch(function(err) {
    console.log(`Error: ${err.message}`);
    ipcMain.on("game-request", function(evt, msg) {
      evt.sender.send(JSON.stringify(`Error: ${err.message}`));
    });
  });
