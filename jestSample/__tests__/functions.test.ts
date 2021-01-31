import {
  sumOfArray,
  asyncSumOfArray,
  asyncSumOfArraySometimesZero,
  getFirstNameThrowIfLong,
} from "../functions";
import { DatabaseMock } from "../util";

describe("sumOfArray", (): void => {
  test("[1, 1]を渡すと2が返ってくる", (): void => {
    const expected = 2;
    const actual = sumOfArray([1, 1]);

    expect(actual).toEqual(expected);
  });

  test("空の配列を渡すと0が返ってくる", (): void => {
    const expected = 0;
    const actual = sumOfArray([]);

    expect(actual).toEqual(expected);
  });
});

describe("asyncSumOfArray", (): void => {
  test("[1, 1]を渡すと2が返ってくる", (): void => {
    const expected = 2;
    asyncSumOfArray([1, 1]).then((actual): void => {
      expect(actual).toEqual(expected);
    });
  });

  test("空の配列を渡すと0が返ってくる", (): void => {
    asyncSumOfArray([]).then((actual): void => {
      const expected = 0;
      asyncSumOfArray([]).then((actual): void => {
        expect(actual).toEqual(expected);
      });
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

describe("getFirstNameThrowIfLong", () => {
  test("設定した制限以下の字数の名前がAPIから返ってきた場合、名前の文字列が返ってくる", (done) => {
    const myNameApiService = jest.fn().mockImplementation(() => {
      return {
        MAX_LENGTH: 4,
        getFirstName: () => "firstName",
      };
    });

    const expected = "firstName";

    getFirstNameThrowIfLong(10, new myNameApiService()).then((actual): void => {
      expect(actual).toEqual(expected);
      done();
    });
  });

  test("設定した制限より多い字数の名前がAPIから返ってきた場合、例外が発生する", (done) => {
    const myNameApiService = jest.fn().mockImplementation(() => {
      return {
        MAX_LENGTH: 4,
        getFirstName: () => "firstNamefirstName",
      };
    });

    getFirstNameThrowIfLong(10, new myNameApiService()).catch((error) => {
      expect(error).toEqual(new Error("first_name too long"));
      done();
    });
  });
});
