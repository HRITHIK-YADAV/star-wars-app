import axios from "axios";

const api = axios.create({
  baseURL: "https://swapi.dev/api",
});

export const searchCharacter = async (name: string) => {
  const response = await api.get(`/people/?search=${name}`);
  return response.data.results;
};

export const searchPlanets = async (query: string) => {
  const response = await api.get(`/planets/?search=${query}`);
  return response.data.results;
};

export default api;
