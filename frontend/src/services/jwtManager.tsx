let jwtToken: string = '';

export const setJWT = (token: string) => {
  jwtToken = token;
}

export const getJWT = () => {
  return jwtToken;
}
