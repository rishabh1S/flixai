export interface PostData {
  _id: string;
  username: string;
  userAvatar: string;
  imageURL: string;
  tempImageURL: string;
  prompt: string;
  createdAt: Date;
}

export interface PresetValues {
  [preset: string]: {
    guidance_scale: number;
    refiner_switch: number;
    negative_prompt: string;
    style_selections: string;
  };
}
