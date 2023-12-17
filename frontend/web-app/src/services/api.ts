import { getJWT } from '../services/jwtManager';


const httpLink = 'http://localhost:3000/api/users/v1/authentication'
export const apiCallPost = (path: any, body: any) => {
  return new Promise((resolve, reject) => {
    fetch(httpLink + path, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          resolve(data);
        }
      })
      .catch(error => {
        alert('An error occurred while fetching data.');
        reject(error);
      });
  });
};

export const apiCallGet = (path: any, queryString: any) => {
  return new Promise((resolve, reject) => {
    fetch(httpLink + path + '?' + queryString, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${getJWT()}`
      },
    })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.json())
        } else if (response.status === 403) {
          resolve(response.status);
        }
      })
      .catch(error => {
        console.log('An error occurred while fetching data.')
        reject(error);
      });
  });
};
