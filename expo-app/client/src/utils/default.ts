import { PresetValues } from "./types";

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

export const aspectRatios = [
  { title: "1:2", resolution: "704*1408" },
  { title: "3:5", resolution: "768*1280" },
  { title: "1:1", resolution: "1024*1024" },
  { title: "9:7", resolution: "1152*896" },
  { title: "2:1", resolution: "1408*704" },
];

export const presetData = [
  {
    title: "Default",
    uri: "https://replicate.delivery/pbxt/fJldwXLDky3LWSBqlm12yNVTGY7XB4WfwP24Sbfw6uJQPDMkA/e977f103-26f5-409a-b154-23be0fb56060.png",
    key: "Default",
  },
  {
    title: "Realistic",
    uri: "https://res.cloudinary.com/dnp36kqdc/image/upload/v1706910913/FlixAi/realistic-sample.png",
    key: "Realistic",
  },
  {
    title: "Anime",
    uri: "https://replicate.delivery/pbxt/FVzEl1HKNqZMBBHAOHfvoiofGUDETg07O8ARE9vZnZI3TCGSA/a4bc673b-df33-4c95-a9f5-4143e3c87aaf.png",
    key: "Anime",
  },
];
