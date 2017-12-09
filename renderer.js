// Javascript to run in the renderer process
const {ipcRenderer} = require('electron');

var btn = document.querySelector('button.new-game');
btn.addEventListener('click', function(e) {
    e.preventDefault();
    ipcRenderer.send('game-request', 'new-game');
});

function makeGameCell(data, idx) {
    let cell = document.createElement('div');
    if (data === null) {
        cell.className = 'game-cell blank-cell';
    } else {
        if (idx % 2 === 0) {
            cell.className = `game-cell dark cell-${idx}`;
        } else {
            cell.className = `game-cell darkest cell-${idx}`;
        }
        let cellData = document.createElement('div');
        cellData.className = 'cell-data';
        let cellText = document.createTextNode(data);
        cellData.appendChild(cellText);
        cell.appendChild(cellData);
    }
    return cell;
}

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
        gameRow.appendChild(makeGameCell(game[i], i));
    }
});
