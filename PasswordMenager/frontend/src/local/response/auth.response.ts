export class MockResponse {
  body: ReadableStream<Uint8Array> | null;
  bodyUsed: boolean;
  headers: Headers;
  ok: boolean;
  redirected: boolean;
  status: number;
  statusText: string;
  type: ResponseType;
  url: string;
  // arrayBuffer: () => Promise<ArrayBuffer>;
  // blob: () => Promise<Blob>;
  // formData: () => Promise<FormData>;
  // text: () => Promise<string>;

  constructor(body: BodyInit | null | undefined, init: ResponseInit = {}) {
    this.body = body instanceof ReadableStream ? body : null;
    this.bodyUsed = false;
    this.headers = new Headers(init.headers);
    this.ok = init.status ? init.status >= 200 && init.status < 300 : true;
    this.redirected = false;
    this.status = init.status || 200;
    this.statusText = init.statusText || "OK";
    this.type = "default";
    this.url = "";

    const bodyText = typeof body === "string" ? body : JSON.stringify(body);

    // this.arrayBuffer = jest
    //   .fn()
    //   .mockResolvedValue(new ArrayBuffer(bodyText.length));
    // this.blob = jest.fn().mockResolvedValue(new Blob([bodyText]));
    // this.formData = jest.fn().mockResolvedValue(new FormData());
    // this.text = jest.fn().mockResolvedValue(bodyText);
  }

  clone() {
    return new MockResponse(this.body, {
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
    });
  }
  static error() {
    return new MockResponse(null, { status: 0, statusText: "" });
  }

  // json(data: any, init: ResponseInit = {}) {
  //   const body = JSON.stringify(data);
  //   return new MockResponse(body, {
  //     ...init,
  //     headers: { "Content-Type": "application/json", ...init.headers },
  //   });
  // }

  static redirect(url: string, status: number = 302) {
    return new MockResponse(null, { status, headers: { Location: url } });
  }
}
export class LocalResponse extends MockResponse {
  constructor(public authData: unknown) {
    super(null, { status: authData !== undefined ? 200 : 404 });
  }
  json(): Promise<any> {
    return Promise.resolve(this.authData);
  }
}
