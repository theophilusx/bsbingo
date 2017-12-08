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

