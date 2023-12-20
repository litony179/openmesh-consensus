import React, { createContext, useState } from 'react';

// Create a context for the user data
export const UserContext = createContext(null);

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null when no user is logged in
  const [token, setToken] = useState("");
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, isAuthenticated, setAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};