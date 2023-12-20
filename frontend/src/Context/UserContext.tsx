import React, { createContext, useState } from 'react';
import { ILoginInput } from '../services/AuthService';
import * as AuthService from '../services/AuthService';
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
  token: string,
  setToken: React.Dispatch<React.SetStateAction<string>>,
  isAuthenticated: boolean,
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
  loginUser: (loginData: ILoginInput) => Promise<void>,
  logoutUser: () => Promise<void>,
};

// Create a context with a default value and type
export const UserContext = createContext<UserContextType>(null!);

// Create a provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null); // null when no user is logged in
  const [token, setToken] = useState<string>("");
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  const loginUser = async (loginData: ILoginInput) => {
    const jwt: string = await AuthService.login(loginData);
    // set jwt
    setToken(jwt);
    // set user
    setUser(jwtDecode(jwt));
    // set isAuthenticated
    setAuthenticated(true);
  }

  const logoutUser = async () => {
    console.log("in context LOGGING out right now");
    const response = await AuthService.logout();
    console.log(response);
    // set jwt
    setToken("");
    // set user
    setUser(null);
    // set isAuthenticated
    setAuthenticated(false);
  }

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, isAuthenticated, setAuthenticated, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
