export class ConfigApi {
  static getUrl = (part: string): string => {
    return `http://localhost:8080/${part}`;
  };

  static frontURL: string = "http://localhost:3000";

  static readonly fetchObject: RequestInit = {
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": ConfigApi.frontURL,
    },
    credentials: "include",
    method: "GET",
  };
}

export abstract class Api {
  protected static getAuthorizationToken(token: string): string {
    return `Bearer ${token}`;
  }

  protected getUrl(part: string): string {
    return ConfigApi.getUrl(part);
  }

  protected fetchPostObjectWithToken(obj: any, token: string): RequestInit {
    return {
      mode: "cors",
      headers: {
        Authorization: Api.getAuthorizationToken(token),
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": ConfigApi.frontURL,
      },
      body: JSON.stringify(obj),
      method: "POST",
    };
  }

  protected fetchPostFileWithToken(
    file: File | FormData,
    token: string,
    fileSize: number
  ): RequestInit {
    return {
      mode: "cors",
      headers: {
        Authorization: Api.getAuthorizationToken(token),
        "Access-Control-Allow-Origin": ConfigApi.frontURL,
      },
      body: file,
      method: "POST",
    };
  }
  protected fetchPostObject(obj: any): RequestInit {
    return {
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": ConfigApi.frontURL,
      },
      body: JSON.stringify(obj),
      method: "POST",
    };
  }

  protected fetchGetObjectWithtoken(token: string): RequestInit {
    return {
      mode: "cors",
      headers: {
        Authorization: Api.getAuthorizationToken(token),
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": ConfigApi.frontURL,
      },
      method: "GET",
    };
  }
  protected fetchDeleteObjectWithToken(token: string): RequestInit {
    return {
      mode: "cors",
      headers: {
        Authorization: Api.getAuthorizationToken(token),
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": ConfigApi.frontURL,
      },
      method: "DELETE",
    };
  }

  protected fetchPutObjectWithToken(body: object, token: string): RequestInit {
    return {
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": ConfigApi.frontURL,
      },
      body: JSON.stringify(body),
      method: "PUT",
    };
  }
}

const getUrl = (part: string): string => {
  return `http://localhost:8080/${part}`;
};
const fetchObject: RequestInit = {
  mode: "cors",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
  credentials: "include",
  method: "GET",
};
const fetchPostObjectWithToken = (obj: any, token: string): RequestInit => {
  return {
    mode: "cors",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    body: JSON.stringify(obj),
    method: "POST",
  };
};
const fetchPostObject = (obj: any): RequestInit => {
  return {
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    body: JSON.stringify(obj),
    method: "POST",
  };
};
const fetchGetObjectWithtoken = (token: string): RequestInit => {
  return {
    mode: "cors",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    method: "GET",
  };
};
const fetchDeleteObjectWithToken = (token: string): RequestInit => {
  return {
    mode: "cors",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    method: "DELETE",
  };
};
const fetchPutObjectWithToken = (body: object, token: string): RequestInit => {
  return {
    mode: "cors",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    body: JSON.stringify(body),
    method: "PUT",
  };
};
export {
  getUrl,
  fetchObject,
  fetchPostObjectWithToken,
  fetchPostObject,
  fetchGetObjectWithtoken,
  fetchDeleteObjectWithToken,
  fetchPutObjectWithToken,
};
