/* eslint-disable quotes */
import { SignInUseCase } from "./sign-in.usecase.js";
import { CustomException } from "../exceptions/custom.exception.js";

describe("sign-in.usecase unit test", () => {
  describe("scenario success", () => {
    it("should to return success when authenticate", async () => {
      const mockRepository = {
        authenticate: jest.fn().mockResolvedValue({
          token: "token123",
          name: "Josh",
          email: "josh@gmail.com",
        }),
      };

      const userDto = {
        email: "exemple@exemple.com",
        password: "123456m",
      };

      const instanceUseCase = new SignInUseCase(mockRepository, userDto);
      const result = await instanceUseCase.execute();

      expect(result).toEqual({
        status: "SUCCESS",
        data: {
          token: "token123",
          name: "Josh",
          email: "josh@gmail.com",
        },
      });
    });
  });

  describe("scenario error", () => {
    it.each`
      exceptionCode                  | expected
      ${"NotAuthorizedException"}    | ${'{ "status": "ERROR",  "code": "NotAuthorizedException", "message": "mock message" }'}
      ${"InvalidParameterType"}      | ${'{ "status": "ERROR",  "code": "InvalidParameterType", "message": "mock message" }'}
      ${"InvalidParameterException"} | ${'{ "status": "ERROR",  "code": "InvalidParameterException", "message": "mock message" }'}
      ${"Other"}                     | ${'{ "status": "ERROR",  "code": "GenericValidationError", "message": "Validation Error" }'}
    `(
      "should to return error when exception code is $exceptionCode",
      async ({ exceptionCode, expected }) => {
        const mockRepository = {
          authenticate: jest.fn().mockImplementation(() => {
            throw new CustomException("mock message", exceptionCode);
          }),
        };

        const userDto = {
          email: "exemple@exemple.com",
          password: "123456m",
        };

        const instanceUseCase = new SignInUseCase(mockRepository, userDto);
        const result = await instanceUseCase.execute();

        const parseExpectedResult = JSON.parse(expected);
        expect(result).toEqual(parseExpectedResult);
      }
    );
  });
});
