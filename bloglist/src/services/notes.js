import axios from "axios";

const baseUrl = "/api/notes";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => axios.get(baseUrl).then((res) => res.data);

const create = async (newNote) => {
  console.log("TOKEN:", token);

  const config = {
    headers: { Authorization: token },
  };

  console.log("REQUEST CONFIG:", config);

  const response = await axios.post(baseUrl, newNote, config);
  return response.data;
};

const update = (id, newNote) =>
  axios.put(`${baseUrl}/${id}`, newNote).then((res) => res.data);

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, create, update, setToken, remove };
