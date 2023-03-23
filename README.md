# Visor Auth Lambda API

[![Pipeline Workflow](https://github.com/JeffersonGibin/visor-auth-lmb-api/actions/workflows/pipeline.yml/badge.svg)](https://github.com/JeffersonGibin/visor-auth-lmb-api/actions/workflows/pipeline.yml). For more information about the project, [visit here](https://github.com/JeffersonGibin/visor-challenge)

## What is this project ?

This service is part of the project for the selective process of the Visor. The project is a service to authenticate a user in the AWS Cognito.

## Architecture

![image](https://user-images.githubusercontent.com/6215779/226136339-d38c7dfc-3bbc-48c5-ab0b-71eb44ba74c6.png)

## Pipeline flow

![image](https://user-images.githubusercontent.com/6215779/226135275-fd381b74-3fe4-498a-8bbe-2f0fac1aa6e7.png)

## What is this project ?

## How start the project in the localhost?

To execute docker-compose local using Cognito you need environments variables in the your System Operacional but this is not a proposity the
project. The proposity is delivery of the project deployed in the cloud.

```shell
# Credentials Gateway
export AWS_API_GATEWAY_ID=
export AWS_API_GATEWAY_RESOURCE_ID=

# Credentials Cognito
export AWS_COGNITO_CLIENT_ID=
export AWS_COGNITO_REGION=us-east-1

# Credentials with access programatic
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=

```

## Routes

The 'endpoint' access local is `http://localhost:3000/dev/`

| Context        | Resource   | Use Case             | parameters body                                         |
| -------------- | ---------- | -------------------- | ------------------------------------------------------- |
| Authentication | `/sign-in` | `POST /auth/sign-in` | `{'email": "email@exemple.com", "password": "123456k"}` |

## Tecnologies

- serverless
- javascript
- express
- jest
- docker
