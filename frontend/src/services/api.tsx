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

export const apiCallGet = async (path: any, cookie: string) => {
  //  DOES NOT WORK
  console.log(getJWT());
  const response = await fetch(httpLink + path , {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${getJWT()}`,
    },
  });
    return await response.json();
};
