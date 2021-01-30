import {
  sumOfArray,
  asyncSumOfArray,
  asyncSumOfArraySometimesZero,
} from "../functions";
import { DatabaseMock } from "../util";

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

describe("asyncSumOfArray", (): void => {
  test("[1, 1]を渡すと2が返ってくる", (): void => {
    const expected = 2;
    asyncSumOfArray([1, 1]).then((actual): void => {
      expect(actual).toEqual(expected);
    });
  });

  test("空の配列を渡すと例外が発生する", (): void => {
    asyncSumOfArray([]).then((actual): void => {
      expect(actual).toThrow();
    });
  });
});

describe("asyncSumOfArraySometimesZero", (): void => {
  test("[1, 1]を渡すと2が返ってくる", (done): void => {
    const myDatabaseMock = jest
      .fn<DatabaseMock, []>()
      .mockImplementation(() => {
        return {
          save: (_arg: number[]) => {},
        };
      });
    const database = new myDatabaseMock();

    const expected = 2;
    asyncSumOfArraySometimesZero([1, 1], database).then((actual): void => {
      expect(actual).toEqual(expected);
      done();
    });
  });

  test("例外が発生した場合0が返ってくる", (done): void => {
    const myDatabaseMock = jest
      .fn<DatabaseMock, []>()
      .mockImplementation(() => {
        return {
          save: (_arg: number[]) => {
            throw new Error("fail!");
          },
        };
      });
    const database = new myDatabaseMock();

    const expected = 0;
    asyncSumOfArraySometimesZero([1, 1], database).then((actual): void => {
      expect(actual).toEqual(expected);
      done();
    });
  });
});
