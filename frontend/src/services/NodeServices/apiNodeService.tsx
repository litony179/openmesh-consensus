const httpLink = 'http://localhost:3311/api/node/noderouter'

export const apiCallPost = async (path: any, JWTToken: string, body: any) => {
  const response = await fetch(`${httpLink}${path}`, {
    method: "POST",
    headers: { 
      "Content-type": "application/json",
      Authorization: `Bearer ${JWTToken}`,
    },
    body: JSON.stringify(body),
  });

  return await response.json();
};

export const apiCallGet = async (path: any, JWTToken: string) => {
  //  DOES NOT WORK
  console.log(JWTToken);
  const response = await fetch(httpLink + path, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${JWTToken}`,
    },
  });
  return await response.json();
};
