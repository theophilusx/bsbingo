/* jslint esversion:6, node: true */
/* jshint -W117 */
'use strict';

const {
  ipcRenderer
} = require('electron');

var btn = document.querySelector('button.new-game');
btn.addEventListener('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
  ipcRenderer.send('game-request', 'new-game');
});

function makeGameCell(data, idx) {
  let cell = document.createElement('div');
  if (data === null) {
    cell.className = 'cell-data blank-cell';
    cell.appendChild(document.createTextNode(''));
  } else {
    cell.className = 'cell-data';
    cell.id = `cell-${idx}`;
    cell.appendChild(document.createTextNode(data));
  }
  return cell;
}

function makeGameCard(parent, words) {
  var row;
  parent.innerHTML = null;
  for (let i = 0; i < words.length; i++) {
    if (i % 5 === 0) {
      if (row !== undefined) {
        parent.appendChild(row);
      }
      row = document.createElement('div');
      row.className = 'row';
    }
    row.appendChild(makeGameCell(words[i], i));
  }
  parent.appendChild(row);
}

ipcRenderer.on('game-data', function (evt, msg) {
  var gameWords = JSON.parse(msg);
  var gameParent = document.querySelector('div.game-card');
  gameParent.innerHTML = null;
  makeGameCard(gameParent, gameWords);
});

function getCell(evt) {
  var cellId = evt.target.id;

  if (cellId !== undefined) {
    return document.getElementById(cellId);
  }
}

function toggleSeen(cell) {
  if (cell.className.includes('seen-word')) {
    cell.className = 'cell-data';
  } else {
    cell.className = 'cell-data seen-word';
  }
}

// deal with completed words
var gameDiv = document.querySelector('div.game-card');
gameDiv.addEventListener('click', function (evt) {
  var cellElement;

  evt.preventDefault();
  evt.stopPropagation();
  cellElement = getCell(evt);
  if (cellElement !== undefined) {
    toggleSeen(cellElement);
  }
});