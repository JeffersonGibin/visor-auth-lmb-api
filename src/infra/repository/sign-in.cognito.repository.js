import AWS from "aws-sdk";

export class SignInCognitoRepository {
  #cognito;
  #cognitoClientId;

  /**
   * @param {Object} inputArgs
   */
  constructor(inputArgs) {
    const { clientId, region } = inputArgs;

    this.#validateInputs({ clientId, region });

    this.#cognitoClientId = clientId;
    this.#cognito = new AWS.CognitoIdentityServiceProvider({
      region: region,
    });
  }

  #validateInputs(args) {
    const { clientId, region } = args;

    if (!region) {
      throw new Error("The field region is required");
    }

    if (!clientId) {
      throw new Error("The field clientId is required");
    }

    if (typeof region !== "string" || typeof clientId !== "string") {
      throw new Error("The values to need be a string");
    }
  }

  /**
   * Authenticate user in the AWS Cognito
   * @param {Object} dataUser
   * @return {Promise<token>}
   */
  async authenticate(dataUser) {
    const params = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: this.#cognitoClientId,
      AuthParameters: {
        USERNAME: dataUser.email,
        PASSWORD: dataUser.password,
      },
    };

    const token = await this.#cognito
      .initiateAuth(params)
      .promise()
      .then((response) => {
        return response?.AuthenticationResult?.AccessToken;
      });

    const data = await this.#cognito
      .getUser({
        AccessToken: token,
      })
      .promise();

    console.log(data);

    const { email, name } = data.UserAttributes.reduce((newList, item) => {
      newList[item.Name] = item.Value;
      return newList;
    }, {});

    if (token) {
      return {
        name,
        email,
        token,
      };
    }

    return "";
  }
}
