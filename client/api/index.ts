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

export const generateUsername = async (): Promise<string> => {
  try {
    const response = await axios.post(`${server_url}/generateUsername`);

    return response.data.username;
  } catch (error) {
    console.error("Error generating username:", error);
    throw new Error("Error generating username");
  }
};

export const createPost = async (postData: any): Promise<any> => {
  try {
    const response = await axios.post(`${server_url}/createPost`, postData);

    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Error creating post");
  }
};

export const getCloudImageURI = async (
  imageURI: string,
  folderName: string
): Promise<string> => {
  try {
    const response = await axios.post(`${server_url}/cloudImage`, {
      imageURI,
      folderName,
    });

    return response.data.cloudinaryURL;
  } catch (error) {
    console.error("Error getting Cloudinary image URI:", error);
    throw new Error("Error getting Cloudinary image URI");
  }
};
