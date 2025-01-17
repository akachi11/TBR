import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';

// Define the shape of the AuthContext
interface AuthContextType {
  isAuthenticated: boolean;
  setAuthState: Dispatch<SetStateAction<boolean>>;
  user: UserType | undefined;
  setUserState: Dispatch<SetStateAction<UserType | undefined>>;
}

// Define the shape of the User object
interface UserType {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

// Create the AuthContext with a default value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | undefined>(undefined);

  useEffect(() => {
    setUser(() => {
      const user = localStorage.getItem('user');
      if (user) {
        return JSON.parse(user);
      }
      return undefined;
    });
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthState: setIsAuthenticated,
        user,
        setUserState: setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  return context;
};
