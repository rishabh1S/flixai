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
  const [generatedImages, setGeneratedImages] = useState<string[]>([
    "https://replicate.delivery/pbxt/IKQENHlFlIooIZghLcxpaTz3IteCWIOviBbIVx4C175iLKKJA/fae1eeba-3259-40cd-9d72-e742c018a898.png",
    "https://res.cloudinary.com/dnp36kqdc/image/upload/v1706910913/FlixAi/realistic-sample.png",
    "https://replicate.delivery/pbxt/ywrtFkWfAJRle06uDzNC5kgHxUlJbz9C7MwJ2iNGPJQvCuTSA/fee56087-4f97-4ca5-ac04-fd861071de7d.png",
  ]);
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
