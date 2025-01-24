import axios from "axios";

const BASE_URL = "http://localhost:5050/api/columns";

export const getColumns = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createColumn = async (name) => {
  const response = await axios.post(BASE_URL, { name });
  return response.data;
};

export const updateColumn = async (id, updates) => {
  const response = await axios.put(`${BASE_URL}/${id}`, updates);
  return response.data;
};

export const deleteColumn = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
