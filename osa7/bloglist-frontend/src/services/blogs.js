import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
export const create = async (newObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

export const update = async (blog) => {
  console.log("blog to update: axios", blog);
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog);
  return response.data;
};

export const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};


