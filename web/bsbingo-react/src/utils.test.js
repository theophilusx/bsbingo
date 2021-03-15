import * as utils from "./utils";

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
