import { apiCallGet, apiCallPost } from "./apiAuthService";
export interface IRegisterInput {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;
  userConfirmPassword: string;
  userRoles: {
    admin: number,
    editor: number,
    user: number
  }
}
export interface ILoginInput {
  userEmail: string;
  userPassword: string;
}

/**
 * Handles the Communication between the frontend and the backend
 * Sends a request to the backend to register with formData
 * The function is handled by Context api and the file for context // UPDATE THIS LINE 
 * 
 * if Successfull,
 * - Stores the JWT in the local storage
 * - Stores user info in the UserContext
 * - Set the user as logged in
 * 
 * if Unsuccessfull,
 * - Logs the error
 * @param loginData 
 */
export const register = async (formData: IRegisterInput, JWTtoken: string) => {
  try {
    const response = await apiCallPost('/registeruser', JWTtoken, formData);
    if (!response.errors) { // backend does not send status 200, so we check from errors
      return response.userAccessToken; // return the JWT
    } else {
      console.error('Register failed:', response);
    }
  } catch (error) {
    console.error('Error during form submission:', error);
  }
};

/**
 * Handles the Communication between the frontend and the backend
 * Sends a request to the backend to login with loginData
 * The function is handled by Context api and the file for context // UPDATE THIS LINE 
 * 
 * if Successfull,
 * - Stores the JWT in the local storage
 * - Stores user info in the UserContext
 * - Set the user as logged in
 * 
 * if Unsuccessfull,
 * - Logs the error
 * @param loginData 
 */
export const login = async (loginData: ILoginInput, JWTtoken: string) => {
  try {
    const response = await apiCallPost('/loginuser', JWTtoken, loginData);
    if (!response.errors) { // backend does not send status 200, so we check from errors
      return response.userAccessToken; // return the JWT
    } else {
      console.error('Login failed:', response);
    }
  } catch (error) {
    console.error('Error during form submission:', error);
  }
};

/**
 * Sends a request to the backend to logout
 * 
 * if Successfull,
 * - Removes the JWT from the UserContext
 * - Removes user info from the UserContext
 * - Set the user as logged out
 * 
 * if Unsuccessfull,
 * - Logs the error
 * @returns Response on logout
 */
export const logout = async (JWTtoken: string) => {
  try {
    const response = await apiCallGet('/logout', JWTtoken);
    if (!response.errors) { // backend does not send status 200, so we check from errors
      console.log(response);
      return response;
    } else {
      console.error('Logout failed:', response);
    }
  } catch (error) {
    console.error('Error during form submission:', error);
  }
};
