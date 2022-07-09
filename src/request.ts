import axios, { AxiosError } from "axios";
import { LoginAccessDTO } from "./dto/login.dto";
import { Logout, getFromLocalStorage } from "./utils";

const baseUrl = "https://kwlc-app.herokuapp.com/api/";

// export const getFromLocalStorage = (key: string) => {
//     const rawData = localStorage.getItem((key));
//     return rawData
// }

export const getToken = (): string => {
  let token = "";
  let rawData: string = getFromLocalStorage("userData");

  if (rawData) {
    const result: any = JSON.parse(rawData);

    token = result?.token;
  }

  return token;
};
export const getKingdomData = (): string => {
  let token = "";
  let rawData: string = getFromLocalStorage("kingdomData");

  if (rawData) {
    const result: any = rawData;

    token = result;
  }

  return token;
};

const request = axios.create({
  baseURL: baseUrl,
});

request.interceptors.request.use((config) => {
  const token = getToken();
  const kingdomData = getKingdomData();

  const newConfig = { ...config };

  if (token) {
    newConfig.headers = {
      ...newConfig.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  if (kingdomData) {
    newConfig.headers = {
      ...newConfig.headers,
      AuthKey: `${kingdomData}`,
    };
  }

  return newConfig;
});

// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error: AxiosError) {
    const token = getToken();
    // if user's token has expired or has been blacklisted
    if (error.response?.status === 401 && token) {
      Logout();
      return Promise.reject(error.response.statusText);
    }
    if (error.response?.status === 400) {
      return Promise.reject(
        error.response?.data?.responseMessage || error.response?.data?.title
      );
    }

    if (error.response.status === 404) {
      return Promise.reject(error.response.statusText);
    }

    if (error.response.status === 415) {
      return Promise.reject(error.response.statusText);
    }

    return Promise.reject(error.response?.data?.ResponseMessage);
  }
);

export default request;
