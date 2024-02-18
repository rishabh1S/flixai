import React, { createContext, useContext, ReactNode, useState } from "react";

interface GlobalContextProps {
  children: ReactNode;
}

interface GlobalContextValue {
  generatedImages: string[];
  prompt: string;
  currentPostId: string;
  updateGeneratedImages: (images: string[]) => void;
  updatePrompt: (prompt: string) => void;
  updateCurrentPostId: (postId: string) => void;
}

const GlobalContext = createContext<GlobalContextValue | undefined>(undefined);

export const GlobalProvider: React.FC<GlobalContextProps> = ({ children }) => {
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [prompt, setPrompt] = useState<string>("");
  const [currentPostId, setCurrentPostId] = useState<string>("");

  const updateGeneratedImages = (images: string[]) => {
    setGeneratedImages(images);
  };

  const updatePrompt = (newPrompt: string) => {
    setPrompt(newPrompt);
  };

  const updateCurrentPostId = (postId: string) => {
    setCurrentPostId(postId);
  };

  return (
    <GlobalContext.Provider
      value={{
        generatedImages,
        prompt,
        currentPostId,
        updateGeneratedImages,
        updatePrompt,
        updateCurrentPostId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within an ImageProvider");
  }
  return context;
};
