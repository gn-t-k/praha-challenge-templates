import { sumOfArray } from "../functions";

describe("sumOfArray", (): void => {
  test("[1, 1]を渡すと2が返ってくる", (): void => {
    const expected = 2;
    const actual = sumOfArray([1, 1]);

    expect(actual).toEqual(expected);
  });

  test("空の配列を渡すと例外が発生する", (): void => {
    expect((): number => sumOfArray([])).toThrow();
  });
});
