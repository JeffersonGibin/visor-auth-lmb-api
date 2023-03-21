const exceptions = [
  "NotAuthorizedException",
  "InvalidParameterType",
  "InvalidParameterException",
];

export class SignInUseCase {
  #signInRepository;
  #userDTO;

  constructor(repository, userDTO) {
    this.#signInRepository = repository;
    this.#userDTO = userDTO;
  }

  async execute() {
    try {
      const response = await this.#signInRepository.authenticate({
        email: this.#userDTO.email,
        password: this.#userDTO.password,
      });

      console.log(response);

      return {
        status: "SUCCESS",
        data: response,
      };
    } catch (error) {
      const messageError = error.message;
      const exceptionCode = error.code;

      if (exceptions.includes(exceptionCode)) {
        return {
          status: "ERROR",
          code: exceptionCode,
          message: messageError,
        };
      }

      return {
        status: "ERROR",
        code: "GenericValidationError",
        message: "Validation Error",
      };
    }
  }
}
