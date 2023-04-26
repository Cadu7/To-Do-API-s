export class BodyException {
  error: string
  message: string

  constructor(error: string, message: string) {
    this.error = error;
    this.message = message;
  }

  public getBody(): { error: string, message: string } {
    return {error: this.error, message: this.message};
  }

}