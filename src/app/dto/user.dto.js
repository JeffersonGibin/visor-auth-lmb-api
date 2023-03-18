export class UserDTO {
  constructor(body) {
    this.email = body.email;
    this.password = body.password;
  }
}
