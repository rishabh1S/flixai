import { useUser } from "@clerk/clerk-expo";
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";

interface UserContextProps {
  children: ReactNode;
}

interface UserContextValue {
  userAvatar?: string;
  username?: string;
  name?: string;
  email?: string;
  updateUsername?: ((newUsername: string) => Promise<void>) | undefined;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const { user, isLoaded } = useUser();
  const [userContextValue, setUserContextValue] = useState<UserContextValue>({
    updateUsername: undefined,
  });

  const updateUsername = async (newUsername: string) => {
    if (user) {
      const updatedUser = await user.update({ username: newUsername });
      setUserContextValue((prevValue) => ({
        ...prevValue,
        username: updatedUser.username!,
      }));
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      setUserContextValue({
        userAvatar: user.imageUrl,
        username: user.username!,
        name: user.fullName!,
        email: user.emailAddresses[0].emailAddress,
        updateUsername: updateUsername,
      });
    }
  }, [user, isLoaded]);

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
