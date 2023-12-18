import { getJWT } from "./jwtManager";

const httpLink = 'http://localhost:3000/api/users/v1/authentication'

export const apiCallPost = async (path: any, body: any) => {
  const response = await fetch(`${httpLink}${path}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getJWT()}`,
    },
    body: JSON.stringify(body),
  });

  return await response.json();
};

export const apiCallGet = async (path: any, queryString: object, cookie: string) => {
  //  DOES NOT WORK
  const formatedQueryString = queryString.toString();
  const response = await fetch(httpLink + path + '?' + formatedQueryString, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${getJWT()}`,
      'Cookie': cookie  // Set the cookie in the request header
    },
    credentials: 'include' // Include the cookie in the response header NOTE: DOES NOT WORK
  });
    return await response.json();
};
