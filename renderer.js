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

// function makeParentCell(data, idx) {
//     let cell = document.createElement('div');
//     if (data === null) {
//         cell.className = 'game-cell blank-cell';
//     } else {
//         if (idx % 2 === 0) {
//             cell.className = `game-cell dark cell-${idx}`;
//         } else {
//             cell.className = `game-cell darkest cell-${idx}`;
//         }
//         cell.id = `cell-${idx}`;
//     }
//     return cell;
// }

// function makeDataCell(data, idx) {
//     let cell = document.createElement('div');
//     let cellText = document.createTextNode(data);

//     cell.className = `game-data cell-${idx}`;
//     cell.appendChild(cellText);
//     return cell;
// }

// function makeGameCell(data, idx) {
//     let cell = makeParentCell(data, idx);
//     if (data !== null) {
//         let cellData = makeDataCell(data, idx);
//         cell.appendChild(cellData);    
//     }
//     return cell;
// }

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

ipcRenderer.on('game-data', function (evt, msg) {
  var game = JSON.parse(msg);
  var gameParent = document.querySelector('div.game-card');
  gameParent.innerHTML = null;
  var row;
  for (let i = 0; i < game.length; i++) {
    if (i % 5 === 0) {
      if (row !== undefined) {
        gameParent.appendChild(row);
      }
      row = document.createElement('div'); 
      row.className = 'row';
    }
    row.appendChild(makeGameCell(game[i], i));
  }
  gameParent.appendChild(row);
});

// function getCellId(evt) {
//     if (evt.target && evt.target.nodeName == 'DIV') {
//         let cellId = evt.target.className
//                      .split(' ')
//                      .filter(w => w.startsWith('cell-'))[0];
//         return cellId;
//     }
// }

// function getCell(evt) {
//     var cellId = getCellId(evt);

//     if (cellId !== undefined) {
//         return document.getElementById(cellId);
//     }
// }

function getCell(evt) {
  var cellId = evt.target.id;

  if (cellId !== undefined) {
    return document.getElementById(cellId);
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
    cellElement.style = 'background-image:url(check-mark.svg);' +
      'background-position:right bottom;' +
      'background-size:20px;' +
      'background-repeat: no-repeat';
  }
});