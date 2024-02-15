import express from "express";
import Replicate from "replicate";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const router = express.Router();
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route("/").post(async (req, res) => {
  try {
    const {
      prompt,
      cnImage,
      cnType,
      selectedResolution,
      imageQuality,
      imageNumber,
      negativePrompt,
      imageSeed,
      sharpness,
      guidanceScale,
      refinerSwitch,
      styleSelections,
    } = req.body;

    let photoUrl;

    if (cnImage) {
      cloudinaryResponse = await cloudinary.uploader.upload(cnImage, {
        folder: "flixai/user-upload",
      });
      photoUrl = cloudinaryResponse.secure_url;
    }

    const output = await replicate.run(
      "konieshadow/fooocus-api:fda927242b1db6affa1ece4f54c37f19b964666bf23b0d06ae2439067cd344a4",
      {
        input: {
          prompt: prompt,
          cn_img1: photoUrl,
          cn_type1: cnType,
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

    res.json({ output });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Error generating image" });
  }
});

export default router;
