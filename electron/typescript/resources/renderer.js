"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const moment = require("moment");
const sprintf_js_1 = require("sprintf-js");
const newGameBtn = document.querySelector("button.new-game");
const startGameBtn = document.querySelector("button.start-game");
const elapsedTimeDiv = document.querySelector("div#elapsed-time");
const gameDiv = document.querySelector("div.game-card");
let gameTimer;
let currentGame = {
    start: undefined,
    end: undefined,
    words: [],
    seen: []
};
function startGame() {
    currentGame.start = moment();
    currentGame.end = undefined;
    gameTimer = setInterval(updateTimer, 1000);
}
function endGame() {
    clearInterval(gameTimer);
    setTimeout(function () {
        alert("Game Over");
    }, 500);
}
function updateTimer() {
    currentGame.end = moment();
    let duration = moment.duration(currentGame.end.diff(currentGame.start));
    let elapsed = sprintf_js_1.vsprintf("%1$02d:%2$02d:%3$02d", [
        duration.hours(),
        duration.minutes(),
        duration.seconds()
    ]);
    elapsedTimeDiv.innerHTML = elapsed;
}
function makeGameCell(word, idx) {
    let cell = document.createElement("div");
    if (word === null) {
        cell.className = "cell-data blank-cell";
        cell.id = `blank-${idx}`;
        cell.appendChild(document.createTextNode(""));
    }
    else {
        cell.className = "cell-data";
        cell.id = `cell-${idx}`;
        cell.appendChild(document.createTextNode(word));
    }
    return cell;
}
function makeGameCard(card, words) {
    var row;
    card.innerHTML = null;
    for (let i = 0; i < words.length; i++) {
        if (i % 5 === 0) {
            if (row !== undefined) {
                card.appendChild(row);
            }
            row = document.createElement("div");
            row.className = "row";
        }
        row.appendChild(makeGameCell(words[i], i));
    }
    card.appendChild(row);
}
function getCell(evt) {
    let cellId = evt.target.id;
    if (cellId !== undefined) {
        return document.getElementById(cellId);
    }
    return undefined;
}
function toggleSeen(cell) {
    if (cell.className.includes("cell-data") &&
        !cell.className.includes("blank-cell")) {
        let idx = parseInt(cell.id.match(/cell-(.*)/)[1]);
        if (cell.className.includes("seen-word")) {
            cell.className = "cell-data";
            currentGame.seen[idx] = false;
        }
        else {
            cell.className = "cell-data seen-word";
            currentGame.seen[idx] = true;
            if (currentGame.seen.every(e => e === true)) {
                endGame();
            }
        }
    }
}
electron_1.ipcRenderer.on("game-data", function (evt, msg) {
    let gameWords = JSON.parse(msg);
    gameDiv.innerHTML = null;
    makeGameCard(gameDiv, gameWords);
    currentGame.words = gameWords;
    currentGame.seen = gameWords.map((w) => (w ? false : true));
});
gameDiv.addEventListener("click", function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    let cellElement = getCell(evt);
    if (cellElement !== undefined) {
        toggleSeen(cellElement);
    }
});
newGameBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    electron_1.ipcRenderer.send("game-request", "new-game");
});
startGameBtn.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    startGame();
});
//# sourceMappingURL=renderer.js.map