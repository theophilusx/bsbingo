const electron = require('electron');
const path = require('path');
const url = require('url');

// set environment
process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu, ipcMain} = electron;

var mainWindow;

// define menus
var mainMenuTemplate = [{
    label: 'File',
    submenu: [{
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
            app.quit();
        }
    }]
}];

// add empty entry to get OSX menus looking right
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

// add developer menu item if not prod version
if (process.env.NODE_ENV != 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [{
            role: 'reload'
        },
        {
            label: 'Toggle DevTools',
            accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();      
            }
        }]        
    });
}

function createMainWindow() {
    var mainMenu;

    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))
    mainWindow.on('close', function() {
        // For OSX UX consistency, don't quit
        // Set window handler to null
        mainWindow = null;
    });
    mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
}

app.on('ready', createMainWindow);

app.on('window-all-closed', function() {
    // OSX UX keeps app running even when all windows
    // are closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    // Handle OSX clicking on dock icon when app 
    // still running
    if (mainWindow === null) {
        createMainWindow();
    }
});

// Game 

const {getRandomInt} = require('./util.js');
const {createReadStream} = require('fs');

// Read file of bingo words. Return array of words
function getWordList(filename) {
    return new Promise(function(resolve, reject) {
        var tmp = "", wordArray = [];

        createReadStream(path.join(__dirname, filename), {encoding: 'UTF-8'})
            .on('data', chunk => tmp += chunk)
            .on('error', err => reject(err))
            .on('end', function() {
                wordArray = tmp.split('\n').filter(w => w.length > 0);
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
        gameWords.push(bingoWordArray[id]);
    }

    // We want some word slots to be blank
    while (blankSet.size < blanks) {
        blankSet.add(getRandomInt(min, blanks));
    }
    for (let id of blankSet) {
        gameWords[id] = 'blank';
    }

    return gameWords;
}

var bingoWords = [];

// Read in word list and indicate when we are ready to play
getWordList('bsbingo.words')
.then(function(words) {
    // got word list - store 
    bingoWords = words;
    console.log(`Read in ${bingoWords.length} bingo words`);
})
.then(function() {
    // ready to play - listen for request from renderer
    ipcMain.on('game-request', function(evt, msg) {
        var game = getGameWords(bingoWords, 15, 5);
        evt.sender.send('game-data', JSON.stringify(game));
    });
})
.catch(function(err) {
    console.log(`Error: ${err.message}`);
    ipcMain.on('game-request', function(evt, msg) {
        evt.sender.send(JSON.stringify(`Error: ${err.message}`));
    });
});
