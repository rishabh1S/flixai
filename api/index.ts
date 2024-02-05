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
  styleSelections: string;
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
      styleSelections,
    } = params;

    const output = await replicate.run(
      "konieshadow/fooocus-api:fda927242b1db6affa1ece4f54c37f19b964666bf23b0d06ae2439067cd344a4",
      {
        input: {
          prompt: prompt,
          cn_type1: "ImagePrompt",
          cn_type2: "ImagePrompt",
          cn_type3: "ImagePrompt",
          cn_type4: "ImagePrompt",
          sharpness: sharpness,
          image_seed: imageSeed,
          uov_method: "Disabled",
          image_number: imageNumber,
          guidance_scale: guidanceScale,
          refiner_switch: refinerSwitch,
          negative_prompt: negativePrompt,
          style_selections: styleSelections,
          uov_upscale_value: 0,
          outpaint_selections: "",
          outpaint_distance_top: 0,
          performance_selection: imageQuality,
          outpaint_distance_left: 0,
          aspect_ratios_selection: selectedResolution.resolution,
          outpaint_distance_right: 0,
          outpaint_distance_bottom: 0,
          inpaint_additional_prompt: "",
        },
      }
    );
    //@ts-ignore
    return { output };
  } catch (error) {
    throw new Error("Error generating image");
  }
};
