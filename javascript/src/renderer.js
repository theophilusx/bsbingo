"use strict";

// renderer module

const {ipcRenderer} = require("electron");
const moment = require("moment");
const vsprintf = require("sprintf-js").vsprintf;

let newGameBtn = document.querySelector("button.new-game");
let startGameBtn = document.querySelector("button.start-game");
let elapsedTimeDiv = document.querySelector("div#elapsed-time");
let gameDiv = document.querySelector("div.game-card");

let gameTimer;

// Current game state
let currentGame = {
  start: undefined,
  end: undefined,
  words: [],
  seen: []
};

/**
 * Starts the game timer
 */
const startGame = () => {
  currentGame.start = moment();
  currentGame.end = undefined;
  gameTimer = setInterval(updateTimer, 1000);
};

/**
 * Ends the update of elapased time and runs a function to popup game over 
 * notification etc. 
 */
const endGame = () => {
  clearInterval(gameTimer);
  setTimeout(() => {
    alert("Game Over");
  }, 500);
};

/**
 * Updates the elapsed time display with the time elapsed since the game 
 * was started.
 */
const updateTimer = () => {
  currentGame.end = moment();
  let duration = moment.duration(currentGame.end.diff(currentGame.start));
  let elapsed = vsprintf("%1$02d:%2$02d:%3$02d", [
    duration.hours(),
    duration.minutes(),
    duration.seconds()
  ]);
  elapsedTimeDiv.innerHTML = elapsed;
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

/**
 * Generates a new game card. The card argument is the parent element which 
 * will hold the card. The words argument is an array of strings representing 
 * the words to use in generating the card cells.
 * 
 * @param {Object} card - the HTML DIV element representing the game card
 * @param {Array} words - an array of word strings 
 */
const makeGameCard = (card, words) => {
  let row;
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
};

/**
 * Checks the click event to see if the user clicked on a game cell. If the 
 * target of the event has a cell ID, get the element and return it.
 * 
 * @param {event} evt 
 */
const getCell = evt => {
  let cellId = evt.target.id;
  if (cellId !== undefined) {
    return document.getElementById(cellId);
  }
  return undefined;
};

/**
 * Adds or removes the CSS class seen-words to the DIV representing a cell 
 * in the game card. 
 * 
 * @param {object} cell - an HTML DIV element 
 */
const toggleSeen = cell => {
  if (
    cell.className.includes("cell-data") &&
    !cell.className.includes("blank-cell")
  ) {
    let idx = cell.id.match(/cell-(.*)/)[1];
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
 };

 // process list of words recieved via IPC
ipcRenderer.on("game-data", (evt, msg) => {
  let gameWords = JSON.parse(msg);
  gameDiv.innerHTML = null;
  makeGameCard(gameDiv, gameWords);
  currentGame = {
    words: gameWords,
    seen: gameWords.map(w => (w ? false : true))
  };
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

// action taken when new game button clicked
newGameBtn.addEventListener("click", e => {
  e.preventDefault();
  e.stopPropagation();
  ipcRenderer.send("game-request", "new-game");
});

// action for start game button
startGameBtn.addEventListener("click", e => {
  e.preventDefault();
  e.stopPropagation();
  startGame();
});
