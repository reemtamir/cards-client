import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { signIn, createUser, getUser, logOut } from './userService/httpService';

export const context = createContext(null);
const AuthContext = ({ children }) => {
  const [user, setUser] = useState(getUser());

  function refreshUser() {
    setUser(getUser());
  }

  async function logIn(values) {
    const user = await signIn(values);

    setUser('user', user);
    refreshUser();
    return user;
  }
  function LogOut() {
    logOut();
    refreshUser();
  }
  return (
    <>
      <context.Provider value={{ user, logIn, createUser, LogOut, getUser }}>
        {children}
      </context.Provider>
    </>
  );
};
export default AuthContext;
