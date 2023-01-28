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

