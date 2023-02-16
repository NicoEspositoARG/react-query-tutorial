import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:3008";

export const getPostById = async (postId) => {
  const { data } = await axios.get(`${API}/posts/${postId}`);
  return data;
};

export const getPosts = async () => {
  const { data } = await axios.get(`${API}/posts`);
  return data;
};

export const searchPosts = async (searchKey) => {
  const { data } = await axios.get(`${API}/posts?q=${searchKey}`);
  return data;
};

export const createNewPost = async (post) => {
  const { data } = await axios.post(`${API}/posts`, post);
  return data;
};
