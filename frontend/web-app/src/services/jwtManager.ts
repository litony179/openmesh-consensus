let jwtToken:string = '';

export function setJWT(token:string) {
  jwtToken = token;
}

export function getJWT() {
  return jwtToken;
}