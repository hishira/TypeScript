export class AuthResponse extends Response {
  constructor(public authData: unknown) {
    super(null, { status: authData !== undefined ? 200 : 404 });
  }
  override json(): Promise<any> {
    return Promise.resolve(this.authData);
  }
}
