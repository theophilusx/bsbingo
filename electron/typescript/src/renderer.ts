"use strict";

import { ipcRenderer } from "electron";
import moment = require("moment");
import { vsprintf } from "sprintf-js";

const newGameBtn: HTMLButtonElement = document.querySelector("button.new-game");
const startGameBtn: HTMLButtonElement = document.querySelector("button.start-game");
const elapsedTimeDiv: HTMLDivElement = document.querySelector("div#elapsed-time");
const gameDiv: HTMLDivElement = document.querySelector("div.game-card");

let gameTimer: NodeJS.Timeout;

interface Game {
  start: undefined | moment.Moment,
  end: undefined | moment.Moment,
  words: string[],
  seen: boolean[]
}

let currentGame: Game = {
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
  let elapsed = vsprintf("%1$02d:%2$02d:%3$02d", [
    duration.hours(),
    duration.minutes(),
    duration.seconds()
  ]);
  elapsedTimeDiv.innerHTML = elapsed;
}


function makeGameCell(word: string, idx: number): HTMLDivElement {
  let cell = document.createElement("div");
  if (word === null) {
    cell.className = "cell-data blank-cell";
    cell.id = `blank-${idx}`;
    cell.appendChild(document.createTextNode(""));
  } else {
    cell.className = "cell-data";
    cell.id = `cell-${idx}`;
    cell.appendChild(document.createTextNode(word));
  }
  return cell;
}

function makeGameCard(card: HTMLDivElement, words: string[]) {
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

function getCell(evt: any) : HTMLElement {
  let cellId = evt.target.id;
  if (cellId !== undefined) {
    return document.getElementById(cellId);
  }
  return undefined;
}

function toggleSeen(cell: HTMLElement) {
  if (
    cell.className.includes("cell-data") &&
    !cell.className.includes("blank-cell")
  ) {
    let idx = parseInt(cell.id.match(/cell-(.*)/)[1]);
    if (cell.className.includes("seen-word")) {
      cell.className = "cell-data";
      currentGame.seen[idx] = false;
    } else {
      cell.className = "cell-data seen-word";
      currentGame.seen[idx] = true;
      if (currentGame.seen.every(e => e === true)) {
        endGame();
      }
    }
  }
}



ipcRenderer.on("game-data", function(evt: Event, msg: string) {
  let gameWords = JSON.parse(msg);
  gameDiv.innerHTML = null;
  makeGameCard(gameDiv, gameWords);
  currentGame.words = gameWords;
  currentGame.seen = gameWords.map((w: string | null) => (w ? false : true));
});

gameDiv.addEventListener("click", function(evt: Event) {
  evt.preventDefault();
  evt.stopPropagation();
  let cellElement = getCell(evt);
  if (cellElement !== undefined) {
    toggleSeen(cellElement);
  }
});

newGameBtn.addEventListener("click", function (e: Event) {
  e.preventDefault();
  e.stopPropagation();
  ipcRenderer.send("game-request", "new-game");
});

startGameBtn.addEventListener("click", e => {
  e.preventDefault();
  e.stopPropagation();
  startGame();
});


