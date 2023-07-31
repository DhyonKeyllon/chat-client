import React, { createContext, useState, ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { getUserByToken, signin, signup } from "../services/api";

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData extends SignInData {
  name: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IAuthContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext({} as IAuthContext);

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const isAuthenticated = !!user;

  const signIn = async ({ email, password }: SignInData) => {
    const { token, user } = await signin({ email, password });

    localStorage.setItem("token", token);

    setUser(user);

    <Navigate to="/chat" />;
  };

  const signUp = async ({ email, password, name }: SignUpData) => {
    const { token, user } = await signup({ email, password, name });

    localStorage.setItem("token", token);

    setUser(user);

    <Navigate to="/chat" />;
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const { user } = await getUserByToken({ token });

          setUser(user);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, signIn, signUp }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
