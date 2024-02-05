interface PresetValues {
  [preset: string]: {
    guidance_scale: number;
    refiner_switch: number;
    negative_prompt: string;
    style_selections: string;
  };
}

export const defaultValues: PresetValues = {
  Anime: {
    guidance_scale: 7,
    refiner_switch: 0.66,
    negative_prompt: "(embedding:unaestheticXLv31:0.8), low quality, watermark",
    style_selections:
      "Fooocus V2,Fooocus Masterpiece,SAI Anime,SAI Digital Art,SAI Enhance,SAI Fantasy Art",
  },
  Realistic: {
    guidance_scale: 3,
    refiner_switch: 0.5,
    negative_prompt:
      "unrealistic, saturated, high contrast, big nose, painting, drawing, sketch, cartoon, anime, manga, render, CG, 3d, watermark, signature, label",
    style_selections: "Fooocus V2,Fooocus Photograph,Fooocus Negative",
  },
  Default: {
    guidance_scale: 4,
    refiner_switch: 0.5,
    negative_prompt: "",
    style_selections: "Fooocus V2,Fooocus Enhance,Fooocus Sharp",
  },
};
