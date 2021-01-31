/* eslint-disable @typescript-eslint/camelcase */
import { NameApiService } from "../nameApiService";
import axios from "axios";

describe("getFirstName", (): void => {
  const myAxios: jest.SpyInstance = jest.spyOn(axios, "get");
  const nameApiSerivce = new NameApiService();

  test("制限以下の字数の名前がAPIから返ってきた場合、名前の文字列が返ってくる", (done): void => {
    myAxios.mockResolvedValue({ data: { first_name: "name" } });
    nameApiSerivce.getFirstName().then((actual): void => {
      expect(actual).toEqual("name");
      done();
    });
  });

  test("制限より多い字数の名前がAPIから返ってきた場合、例外が発生する", (done): void => {
    myAxios.mockResolvedValue({ data: { first_name: "firstName" } });
    nameApiSerivce.getFirstName().catch((error): void => {
      expect(error).toEqual(new Error("firstName is too long!"));
      done();
    });
  });
});
