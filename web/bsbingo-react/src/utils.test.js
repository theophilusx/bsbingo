import * as utils from "./utils";
import { words } from "./words";

it("test partition 1", () => {
  return expect(utils.partition(3, [])).toEqual([]);
});

it("test partition 2", () => {
  return expect(utils.partition(3, [1])).toEqual([[1]]);
});

it("Test partition 3", () => {
  return expect(utils.partition(3, [1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
});

it("Test partition 4", () => {
  return expect(utils.partition(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10],
  ]);
});

it("test randomInt", () => {
  let values = [];
  let size = 5;

  for (let i = 0; i < size; i++) {
    values.push(utils.getRandomInt(0, 4));
    console.log(values);
  }
  expect(values.length).toEqual(5);
  let within = values.filter((v) => v >= 0 && v <= 4);
  expect(within.length).toEqual(5);
});

it("test newGame", () => {
  let game = utils.newGame(words, 20, 5);

  console.dir(game);
  expect(game.words.length).toEqual(20);
  expect(game.size).toEqual(20);
  expect(game.blanks).toEqual(5);
  expect(game.seen).toEqual([]);
  let nonBlank = game.words.filter((w) => w !== undefined);
  return expect(nonBlank.length).toEqual(15);
});
