import axios from "axios";

const API_KEY = "J-HpVHJEM57YfJ2QaqD_-yCLPwqNmGRLuywydEdaokM";
const BASE_URL = "https://api.unsplash.com/search/photos";

const fetchApi = async (query, currentPage) => {
  const response = await axios.get(BASE_URL, {
    params: {
      client_id: API_KEY,
      orientation: "landscape",
      query,
      per_page: 12,
      page: currentPage,
    },
  });
  return response.data;
};

export default fetchApi;
