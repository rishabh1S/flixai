import axios from "axios";

const server_url = process.env.EXPO_PUBLIC_SERVER_URL;

export const generateImage = async (params: any): Promise<any> => {
  try {
    const response = await axios.post(`${server_url}/api/fooocus`, params);

    return response.data;
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Error generating image");
  }
};

export const createPost = async (postData: any): Promise<any> => {
  try {
    const response = await axios.post(`${server_url}/api/post`, postData);

    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Error creating post");
  }
};

export const fetchPosts = async (): Promise<any> => {
  try {
    const response = await axios.get(`${server_url}/api/post`);
    return response.data;
  } catch (error) {
    console.error("Error getting posts:", error);
    throw new Error("Error getting posts");
  }
};

export const fetchPostById = async (postId: string): Promise<any> => {
  try {
    const response = await axios.get(`${server_url}/api/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting post with ID ${postId}:`, error);
    throw new Error(`Error getting post with ID ${postId}`);
  }
};
