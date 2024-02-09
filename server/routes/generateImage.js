import express from "express";
import Replicate from "replicate";
import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

router.post("/", async (req, res) => {
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

    const output = await replicate.run(
      "konieshadow/fooocus-api:fda927242b1db6affa1ece4f54c37f19b964666bf23b0d06ae2439067cd344a4",
      {
        input: {
          prompt: prompt,
          cn_img1: cnImage,
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
