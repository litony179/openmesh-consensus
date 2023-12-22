import React, { createContext, useState } from 'react';
import { ILoginInput, IRegisterInput } from '../services/AuthServices/AuthService';
import * as AuthService from '../services/AuthServices/AuthService';
import { jwtDecode } from 'jwt-decode';

// Define a type for the user data
type UserType = {
  UserInfo: {
    userId: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userRoles: number[];
  };
  iat: number;
  exp: number;
};

// Define a type for the context value
type UserContextType = {
  user: UserType | null,
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>,
  JWTToken: string,
  setJWTToken: React.Dispatch<React.SetStateAction<string>>,
  isAuthenticated: boolean,
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
  registerUser: (formData: IRegisterInput) => Promise<void>,
  loginUser: (loginData: ILoginInput) => Promise<void>,
  logoutUser: () => Promise<void>,
};

// Create a context with a default value and type
export const UserContext = createContext<UserContextType>(null!);

// Create a provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null); // null when no user is logged in
  const [JWTToken, setJWTToken] = useState<string>("");
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  const registerUser = async (formData: IRegisterInput) => {
    const jwt: string = await AuthService.register(formData, JWTToken);
    // set jwt
    setJWTToken(jwt);
    // set user
    setUser(jwtDecode(jwt));
    // set isAuthenticated
    setAuthenticated(true);
  }

  const loginUser = async (loginData: ILoginInput) => {
    const jwt: string = await AuthService.login(loginData, JWTToken);
    // set jwt
    setJWTToken(jwt);
    // set user
    setUser(jwtDecode(jwt));
    // set isAuthenticated
    setAuthenticated(true);
    console.log(jwtDecode(jwt));
    const userInfo:UserType = jwtDecode(jwt);
    localStorage.setItem('userId', userInfo.UserInfo.userId);
  }

  const logoutUser = async () => {
    const response = await AuthService.logout(JWTToken);
    console.log(response);
    // set jwt
    setJWTToken("");
    // set user
    setUser(null);
    // set isAuthenticated
    setAuthenticated(false);
  }

  return (
    <UserContext.Provider value={{ user, setUser, JWTToken, setJWTToken, isAuthenticated, setAuthenticated, registerUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
