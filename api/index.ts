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
  selectedPreset: string;
}): Promise<GenerateImageResponse> => {
  try {
    const {
      prompt,
      selectedPreset,
      selectedResolution,
      imageQuality,
      imageNumber,
      negativePrompt,
      imageSeed,
      sharpness,
      guidanceScale,
      refinerSwitch,
    } = params;

    let endpoint: `${string}/${string}`;

    if (selectedPreset === "Realistic") {
      endpoint =
        "konieshadow/fooocus-api-realistic:612fd74b69e6c030e88f6548848593a1aaabe16a09cb79e6d714718c15f37f47";
    } else if (selectedPreset === "Anime") {
      endpoint =
        "konieshadow/fooocus-api-anime:a750658f54c4f8bec1c8b0e352ce2666c22f2f919d391688ff4fc16e48b3a28f";
    } else {
      endpoint =
        "konieshadow/fooocus-api:fda927242b1db6affa1ece4f54c37f19b964666bf23b0d06ae2439067cd344a4";
    }

    const output = await replicate.run(endpoint, {
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
    });
    //@ts-ignore
    return { output };
  } catch (error) {
    throw new Error("Error generating image");
  }
};
