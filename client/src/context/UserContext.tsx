import { useUser } from "@clerk/clerk-expo";
import React, { createContext, useContext, ReactNode } from "react";

interface UserContextProps {
  children: ReactNode;
}

interface UserContextValue {
  userProfileUri?: string;
  username?: string;
  name?: string;
  email?: string;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const { user } = useUser();

  const userContextValue: UserContextValue = {
    userProfileUri: user?.imageUrl,
    username: user?.username!,
    name: user?.fullName!,
    email: user?.emailAddresses[0].emailAddress,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return context;
};
