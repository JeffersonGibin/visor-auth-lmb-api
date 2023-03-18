import { UserDTO } from "../dto/user.dto.js";
import { SignInUseCase } from "../../core/usecases/sign-in.usecase.js";
import { SignInCognitoRepository } from "../../infra/repository/sign-in.cognito.repository.js";

export const signInRoute = (applications) => {
  return applications.post("/sign-in", async (req, res) => {
    const userDTO = new UserDTO(req.body);

    const signInRepository = new SignInCognitoRepository({
      // eslint-disable-next-line no-undef
      region: process.env.AWS_COGNITO_REGION,
      // eslint-disable-next-line no-undef
      clientId: process.env.AWS_COGNITO_CLIENT_ID,
    });

    const instanceUseCase = new SignInUseCase(signInRepository, userDTO);
    const response = await instanceUseCase.execute();

    const httpStatusCode = response.status === "SUCCESS" ? 200 : 400;

    return res.status(httpStatusCode).json(response);
  });
};
