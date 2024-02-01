function stringToArrayBuffer(str: string) {
  const buffer = new ArrayBuffer(str.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < str.length; i++) {
    view[i] = str.charCodeAt(i);
  }
  return buffer;
}
export class CryptoDatabase {
  private static readonly hashAlgorigth: string = "SHA-256";
  static hashPassword(password: string): Promise<string> {
    const encodedPassword = new TextEncoder().encode(password);

    return crypto.subtle
      .digest(this.hashAlgorigth, encodedPassword)
      .then((bufferArray: ArrayBuffer) => {
        return Array.from(new Uint8Array(bufferArray))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
      });
  }

  static checkPassowrd(password: string, hash: string): Promise<boolean> {
    return this.hashPassword(password).then(
      (hashedPassword) => hashedPassword === hash
    );
  }

  static generateRandomId(): string {
    return crypto.randomUUID();
  }

  async encryptData() {
    let keyPair = await window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
        //modulusLength: 2048,
        //publicExponent: new Uint8Array([1, 0, 1]),
        //hash: "SHA-256",
      },
      false,
      ["encrypt", "decrypt"]
    );
    console.log(keyPair);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const array = await crypto.subtle
      .encrypt({ name: "AES-GCM", iv }, keyPair, Buffer.from("test"))
      .then((a) => a);
    const as = new TextDecoder("utf-8").decode(array);
    const cs = new TextEncoder().encode(as).buffer;
    console.log(array);
    console.log(stringToArrayBuffer(as));

    crypto.subtle
      .decrypt({ name: "AES-GCM", iv }, keyPair, cs)
      .then((a) => console.log(new TextDecoder().decode(a)))
      .catch((a) => console.log(a));
  }
}
