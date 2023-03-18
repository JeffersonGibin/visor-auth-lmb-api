import request from "supertest";
import { signInRoute } from "./sign-in.route.js";
import express from "express";

import { SignInCognitoRepository } from "../../infra/repository/sign-in.cognito.repository.js";
import { CustomException } from "../../core/exceptions/custom.exception.js";

jest.mock("../../infra/repository/sign-in.cognito.repository.js");

let app;

describe("sign-in.route.spec unit test", () => {
  beforeAll(() => {
    app = express();
    app.use(express.json());
    signInRoute(app);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return status 200 when user are authenticate", async () => {
    SignInCognitoRepository.prototype.authenticate = jest
      .fn()
      .mockResolvedValue(true);

    const userData = {
      email: "john.doe@example.com",
      password: "123456",
    };
    const response = await request(app).post("/sign-in").send(userData);
    expect(response.status).toBe(200);
  });

  it("should return status 401 when user not authorized", async () => {
    SignInCognitoRepository.prototype.authenticate = jest
      .fn()
      .mockRejectedValue(
        new CustomException("mock message", "NotAuthorizedException")
      );

    const userData = {
      email: "john.doe@example.com",
      password: "123456",
    };

    const response = await request(app).post("/sign-in").send(userData);
    expect(response.status).toBe(401);
  });

  it("should return status 400 when user authenticate fails", async () => {
    SignInCognitoRepository.prototype.authenticate = jest
      .fn()
      .mockRejectedValue(new CustomException("mock message", "Other"));

    const userData = {
      email: "john.doe@example.com",
      password: "123456",
    };

    const response = await request(app).post("/sign-in").send(userData);
    expect(response.status).toBe(400);
  });
});
