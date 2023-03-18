import { SignInCognitoRepository } from "./sign-in.cognito.repository";
import AWS from "aws-sdk";

jest.mock("aws-sdk");

const initiateAuthFn = jest.fn();

describe("sign-in.cognito.repository unit test", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    AWS.CognitoIdentityServiceProvider = jest.fn().mockImplementation(() => {
      return {
        initiateAuth: initiateAuthFn.mockReturnValue({
          promise: jest.fn().mockResolvedValue({
            AuthenticationResult: {
              AccessToken: "token123",
            },
          }),
        }),
      };
    });
  });

  describe("authenticate method", () => {
    it("should return the token when user is authenticate", async () => {
      const instance = new SignInCognitoRepository({
        clientId: "1a2b3c",
        region: "us-east1",
      });

      const token = await instance.authenticate({
        email: "exemple@exemple.com",
        password: "123456v",
      });

      expect(token).toBe("token123");
    });

    it("shouldn't return the token when a user doesn't is authenticate", async () => {
      AWS.CognitoIdentityServiceProvider = jest.fn().mockImplementation(() => {
        return {
          initiateAuth: initiateAuthFn.mockReturnValue({
            promise: jest.fn().mockResolvedValue({}),
          }),
        };
      });

      const instance = new SignInCognitoRepository({
        clientId: "1a2b3c",
        region: "us-east1",
      });

      const token = await instance.authenticate({
        email: "exemple@exemple.com",
        password: "123456v",
      });

      expect(token).toBe("");
    });

    it("should call authenticate correctly", async () => {
      const instance = new SignInCognitoRepository({
        clientId: "1a2b3c",
        region: "us-east1",
        userPoolId: "us-east-123123",
      });

      const spyOnAddUser = jest.spyOn(
        SignInCognitoRepository.prototype,
        "authenticate"
      );

      await instance.authenticate({
        email: "exemple@exemple.com",
        password: "123456v",
      });

      expect(initiateAuthFn).toBeCalledWith({
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: "1a2b3c",
        AuthParameters: {
          USERNAME: "exemple@exemple.com",
          PASSWORD: "123456v",
        },
      });

      expect(spyOnAddUser).toBeCalledWith({
        email: "exemple@exemple.com",
        password: "123456v",
      });
    });
  });

  describe("exceptions", () => {
    it.each`
      field         | expresion            | args                                          | expected
      ${"clientId"} | ${"don't is string"} | ${'{"clientId": 1, "region": "us-east1"}'}    | ${"The values to need be a string"}
      ${"region"}   | ${"don't is string"} | ${'{"clientId": "1a2b3c", "region": 1}'}      | ${"The values to need be a string"}
      ${"clientId"} | ${"is null"}         | ${'{"clientId": null, "region": "us-east1"}'} | ${"The field clientId is required"}
      ${"region"}   | ${"is null"}         | ${'{"clientId": "1a2b3c", "region": null}'}   | ${"The field region is required"}
      ${"clientId"} | ${"is blank"}        | ${'{"clientId": "", "region": "us-east1"}'}   | ${"The field clientId is required"}
      ${"region"}   | ${"is blank"}        | ${'{"clientId": "1a2b3c", "region": ""}'}     | ${"The field region is required"}
    `(
      "should return exception when '$field' $expresion",
      ({ args, expected }) => {
        const input = JSON.parse(args);
        const region = input["region"];
        const clientId = input["clientId"];

        expect(() => {
          new SignInCognitoRepository({
            clientId,
            region,
          });
        }).toThrow(new Error(expected));
      }
    );
  });
});
