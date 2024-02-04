import Replicate from "replicate";

interface AspectRatio {
  title: string;
  resolution: string;
}

interface GenerateImageResponse {
  output: string[];
}

const replicate = new Replicate({
  auth: process.env.EXPO_PUBLIC_REPLICATE_API_TOKEN,
});

export const generateImage = async (params: {
  selectedResolution: AspectRatio;
  imageQuality: string;
  imageNumber: number;
  negativePrompt: string;
  imageSeed: number;
  sharpness: number;
  guidanceScale: number;
  refinerSwitch: number;
  prompt: string;
}): Promise<GenerateImageResponse> => {
  try {
    const {
      prompt,
      selectedResolution,
      imageQuality,
      imageNumber,
      negativePrompt,
      imageSeed,
      sharpness,
      guidanceScale,
      refinerSwitch,
    } = params;

    const output = await replicate.run(
      "konieshadow/fooocus-api:fda927242b1db6affa1ece4f54c37f19b964666bf23b0d06ae2439067cd344a4",
      {
        input: {
          prompt: prompt,
          sharpness: sharpness,
          image_seed: imageSeed,
          image_number: imageNumber,
          guidance_scale: guidanceScale,
          refiner_switch: refinerSwitch,
          negative_prompt: negativePrompt,
          aspect_ratios_selection: selectedResolution.resolution,
          performance_selection: imageQuality,
        },
      }
    );
    //@ts-ignore
    return { output };
  } catch (error) {
    throw new Error("Error generating image");
  }
};
