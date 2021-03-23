//import { DateTime } from "luxon";

export function partition(size, data) {
  let result = [];
  let group = [];
  for (let i = 0; i < data.length; i++) {
    group.push(data[i]);
    if (group.length % size === 0) {
      result.push(group);
      group = [];
    }
  }
  if (group.length) {
    result.push(group);
  }
  return result;
}

export function getRandomInt(min, max) {
  let minimum = Math.ceil(min);
  let maximum = Math.floor(max);

  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

export function newGame(wordList, size, blanks) {
  let wordSet = new Set();
  let blankIdxSet = new Set();

  while (wordSet.size < size) {
    wordSet.add(wordList[getRandomInt(0, wordList.length - 1)]);
  }
  while (blankIdxSet.size < blanks) {
    blankIdxSet.add(getRandomInt(0, size - 1));
  }
  let words = [...wordSet];
  for (let i of blankIdxSet) {
    words[i] = undefined;
  }
  return words;
}

export function formatDuration(start, end) {
  if (end) {
    let { hours, minutes, seconds } = end
      .diff(start, ["hours", "minutes", "seconds"])
      .toObject();
    seconds = Math.round(seconds);
    console.log(`Hours: ${hours} Minutes: ${minutes} Seconds: ${seconds}`);
    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  }
  return "00:00:00";
}
