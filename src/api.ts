import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "./Types";

const API_KEY: string = "J-HpVHJEM57YfJ2QaqD_-yCLPwqNmGRLuywydEdaokM";
const BASE_URL: string = "https://api.unsplash.com/search/photos";

const fetchApi = async (
  query: string,
  currentPage: number
): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await axios.get(BASE_URL, {
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
