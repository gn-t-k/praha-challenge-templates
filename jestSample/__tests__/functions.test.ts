import { sumOfArray } from "../functions";

describe("sumOfArray", (): void => {
  it("[1, 2, 3]を渡すと6が返ってくる", (): void => {
    const expected = 6;
    const actual = sumOfArray([1, 2, 3]);

    expect(actual).toEqual(expected);
  });
});
