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

  test("[1.1, 1]を渡すと2.1が返ってくる", (): void => {
    const expected = 2.1;
    const actual = sumOfArray([1.1, 1]);

    expect(actual).toBeCloseTo(expected);
  });

  test("[-2, 1]を渡すと-1が返ってくる", (): void => {
    const expected = -1;
    const actual = sumOfArray([-2, 1]);

    expect(actual).toBeCloseTo(expected);
  });
});

describe("asyncSumOfArray", (): void => {
  test("[1, 1]を渡すと2が返ってくる", (done): void => {
    const expected = 2;
    asyncSumOfArray([1, 1]).then((actual): void => {
      expect(actual).toEqual(expected);
      done();
    });
  });

  test("空の配列を渡すと0が返ってくる", (done): void => {
    const expected = 0;
    asyncSumOfArray([]).then((actual): void => {
      expect(actual).toEqual(expected);
      done();
    });
  });
});

describe("asyncSumOfArraySometimesZero", (): void => {
  const makeDataBase = (save: (_arg: number[]) => void) => {
    const databaseMock = jest.fn<DatabaseMock, []>().mockImplementation(() => {
      return {
        save,
      };
    });

    return new databaseMock();
  };

  test("[1, 1]を渡すと2が返ってくる", (done): void => {
    const database = makeDataBase((_arg: number[]) => {});

    const expected = 2;
    asyncSumOfArraySometimesZero([1, 1], database).then((actual): void => {
      expect(actual).toEqual(expected);
      done();
    });
  });

  test("例外が発生した場合0が返ってくる", (done): void => {
    const database = makeDataBase((_arg: number[]) => {
      throw new Error("fail!");
    });
    const expected = 0;
    asyncSumOfArraySometimesZero([1, 1], database).then((actual): void => {
      expect(actual).toEqual(expected);
      done();
    });
  });
});

describe("getFirstNameThrowIfLong", () => {
  const makeNameApiService = (firstName: string) => {
    const nameApiSerivce = jest.fn().mockImplementation(() => {
      return {
        MAX_LENGTH: 4,
        getFirstName: () => firstName,
      };
    });

    return new nameApiSerivce();
  };

  test("設定した制限以下の字数の名前がAPIから返ってきた場合、名前の文字列が返ってくる", (done) => {
    const nameApiSerivce = makeNameApiService("firstName");
    const expected = "firstName";
    getFirstNameThrowIfLong(10, nameApiSerivce).then((actual): void => {
      expect(actual).toEqual(expected);
      done();
    });
  });

  test("設定した制限より多い字数の名前がAPIから返ってきた場合、例外が発生する", (done) => {
    const nameApiSerivce = makeNameApiService("firstNamefirstName");

    getFirstNameThrowIfLong(10, nameApiSerivce).catch((error) => {
      expect(error).toEqual(new Error("first_name too long"));
      done();
    });
  });
});
