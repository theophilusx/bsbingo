import * as utils from "./utils";
import { words } from "./words";
import { DateTime } from "luxon";

it("partition empty array", () => {
  return expect(utils.partition(3, [])).toEqual([]);
});

it("partition single element array", () => {
  return expect(utils.partition(3, [1])).toEqual([[1]]);
});

it("partition array with equal group elements", () => {
  return expect(utils.partition(3, [1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
});

it("partition array with unequal groups", () => {
  return expect(utils.partition(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10],
  ]);
});

it("getRandomInt", () => {
  let values = [];
  let size = 5;

  for (let i = 0; i < size; i++) {
    values.push(utils.getRandomInt(0, 4));
  }
  expect(values.length).toEqual(5);
  let within = values.filter((v) => v >= 0 && v <= 4);
  expect(within.length).toEqual(5);
});

// it("test newGame", () => {
//   let game = utils.newGame(words, 20, 5);

//   console.dir(game);
//   expect(game.words.length).toEqual(20);
//   expect(game.size).toEqual(20);
//   expect(game.blanks).toEqual(5);
//   expect(game.seen).toEqual([]);
//   let nonBlank = game.words.filter((w) => w !== undefined);
//   return expect(nonBlank.length).toEqual(15);
// });

it("formatDuration", () => {
  let start, end;
  expect(utils.formatDuration(start, end)).toEqual("00:00:00");
  start = DateTime.now();
  expect(utils.formatDuration(start, end)).toEqual("00:00:00");
  expect(utils.formatDuration(start, start)).toEqual("00:00:00");
  start = DateTime.fromISO("2021-01-01T10:10:10");
  end = DateTime.fromISO("2021-01-01T11:11:11");
  expect(utils.formatDuration(start, end)).toEqual("01:01:01");
  end = DateTime.fromISO("2021-01-01T10:10:15");
  expect(utils.formatDuration(start, end)).toEqual("00:00:05");
  end = DateTime.fromISO("2021-01-01T10:11:10");
  expect(utils.formatDuration(start, end)).toEqual("00:01:00");
  end = DateTime.fromISO("2021-01-01T11:10:10");
  expect(utils.formatDuration(start, end)).toEqual("01:00:00");
  end = DateTime.fromISO("2021-01-02T10:10:10");
  return expect(utils.formatDuration(start, end)).toEqual("24:00:00");
});

it("strToKey", () => {
  expect(utils.strToKey("hello world")).toEqual("hello_world");
  expect(utils.strToKey("hello-world")).toEqual("hello-world");
  expect(utils.strToKey("helloWorld")).toEqual("helloWorld");
  expect(utils.strToKey(undefined)).toMatch(/bad_key_.*/);
});
