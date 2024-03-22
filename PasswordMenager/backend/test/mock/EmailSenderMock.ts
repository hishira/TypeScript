export class EmailSenderMock {
  sendEmail() {
    return Promise.resolve(true);
  }
}
