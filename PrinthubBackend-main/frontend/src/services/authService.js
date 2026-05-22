import api from "./api";

export const loginUser = async ({ email, password }) => {
  const { data } = await api.post("/user/login", { email, password });
  return data;
};

export const registerUser = async ({ name, email, password, role }) => {
  const { data } = await api.post("/user/register", { name, email, password, role });
  return data;
};
