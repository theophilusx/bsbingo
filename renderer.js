// Javascript to run in the renderer process
const {ipcRenderer} = require('electron');

var btn = document.querySelector('button.new-game');
btn.addEventListener('click', function(e) {
    e.preventDefault();
    ipcRenderer.send('game-request', 'new-game');
});

ipcRenderer.on('game-data', function(evt, msg) {
    var game = JSON.parse(msg);
    var gameParent = document.querySelector('div.game-data');
    gameParent.innerHTML = null;
    var gameRow;
    for (let i=0; i<game.length; i++) {
        if (i % 5 === 0) {
            gameRow = document.createElement('div');
            gameRow.className = 'game-row';
            gameParent.appendChild(gameRow);
        }
        let cell = document.createElement('div');
        let cellText = document.createTextNode(game[i]);
        cell.className = 'game-cell';
        cell.appendChild(cellText);
        gameRow.appendChild(cell);
    }
});
