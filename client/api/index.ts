import axios from "axios";

const server_url = process.env.EXPO_PUBLIC_SERVER_URL;

export const generateImage = async (params: any): Promise<any> => {
  try {
    const response = await axios.post(`${server_url}/generateImage`, params);

    return response.data;
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Error generating image");
  }
};
