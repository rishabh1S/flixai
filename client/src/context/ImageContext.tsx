import React, { createContext, useContext, ReactNode, useState } from "react";

interface ImageContextProps {
  children: ReactNode;
}

interface ImageContextValue {
  generatedImages: string[];
  prompt: string;
  updateGeneratedImages: (images: string[]) => void;
  updatePrompt: (prompt: string) => void;
}

const ImageContext = createContext<ImageContextValue | undefined>(undefined);

export const ImageProvider: React.FC<ImageContextProps> = ({ children }) => {
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [prompt, setPrompt] = useState<string>("");

  const updateGeneratedImages = (images: string[]) => {
    setGeneratedImages(images);
  };

  const updatePrompt = (newPrompt: string) => {
    setPrompt(newPrompt);
  };

  return (
    <ImageContext.Provider
      value={{ generatedImages, prompt, updateGeneratedImages, updatePrompt }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};
