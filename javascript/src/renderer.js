"use strict";

// renderer module

const {ipcRenderer} = require("electron");

let btn = document.querySelector("button.new-game");
let gameDiv = document.querySelector("div.game-card");

// Current game state
let currentGame = {
  start: undefined,
  end: undefined,
  words: [],
  seen: []
};

/**
 * Crweate a word cell in the game board
 *
 * @param {string} data - the words for the cell
 * @param {number} idx - position in list of game words
 * @returns {Element} The new HTML element
 */
const makeGameCell = (data, idx) => {
  let cell = document.createElement("div");
  if (data === null) {
    cell.className = "cell-data blank-cell";
    cell.id = `blank-${idx}`;
    cell.appendChild(document.createTextNode(""));
  } else {
    cell.className = "cell-data";
    cell.id = `cell-${idx}`;
    cell.appendChild(document.createTextNode(data));
  }
  return cell;
};

const makeGameCard = (parent, words) => {
  let row;
  parent.innerHTML = null;
  for (let i = 0; i < words.length; i++) {
    if (i % 5 === 0) {
      if (row !== undefined) {
        parent.appendChild(row);
      }
      row = document.createElement("div");
      row.className = "row";
    }
    row.appendChild(makeGameCell(words[i], i));
  }
  parent.appendChild(row);
};

const getCell = evt => {
  let cellId = evt.target.id;

  if (cellId !== undefined) {
    return document.getElementById(cellId);
  }
  return undefined;
};

const toggleSeen = cell => {
  if (
    cell.className.includes("cell-data") &&
    !cell.className.includes("blank-cell")
  ) {
    console.log(`Cell Classname ${cell.className}`);
    console.log(`Cell ID: ${cell.id}`);
    let idx = cell.id.match(/cell-(.*)/)[1];
    console.log(`IDX: ${idx}`);
    if (cell.className.includes("seen-word")) {
      cell.className = "cell-data";
      currentGame.seen[idx] = false;
    } else {
      cell.className = "cell-data seen-word";
      currentGame.seen[idx] = true;
    }
    console.log(currentGame);
  }
};

ipcRenderer.on("game-data", (evt, msg) => {
  let gameWords = JSON.parse(msg);
  gameDiv.innerHTML = null;
  makeGameCard(gameDiv, gameWords);
  currentGame = {
    start: undefined,
    end: undefined,
    words: gameWords,
    seen: gameWords.map(w => (w ? false : true))
  };
  console.log(currentGame);
});

btn.addEventListener("click", e => {
  e.preventDefault();
  e.stopPropagation();
  ipcRenderer.send("game-request", "new-game");
});

// deal with completed words
gameDiv.addEventListener("click", evt => {
  let cellElement;

  evt.preventDefault();
  evt.stopPropagation();
  cellElement = getCell(evt);
  if (cellElement !== undefined) {
    toggleSeen(cellElement);
  }
});
