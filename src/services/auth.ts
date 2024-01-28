import axios, { AxiosError, AxiosResponse } from "axios";
import { apiConfig } from "src/services/apiConfig";
import {
  getFromSecureStorage,
  saveJWT,
  saveRefreshToken,
} from "src/services/store";

export type UserLoginData = {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  id: string;
  provider: string;
  updatedAt: string;
  username: string;
  subscriptionTo: string;
};

export type LoggedUserData = {
  jwt: string;
  refreshToken: string;
  user: UserLoginData;
};

export type TokenRefreshResponse = {
  jwt: string;
  refreshToken: string;
};

export type RegisterResponseError = {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: {};
  };
};

const instance = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshToken = async (): Promise<
  AxiosResponse<TokenRefreshResponse>
> => {
  const storedRefreshToken = await getFromSecureStorage("refreshToken");

  if (storedRefreshToken) {
    const res = await axios.post(apiConfig.auth.refreshToken, {
      withCredentials: true,
      refreshToken: storedRefreshToken,
    });
    return res;
  }
  return Promise.reject(new Error("No refresh token found"));
};

instance.interceptors.request.use(
  async (config) => {
    const jwt = await getFromSecureStorage("jwt");
    config.headers["Authorization"] = `Bearer ${jwt}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    console.log(
      "[API] error",
      originalRequest?.url ?? "unknown url",
      typeof error?.response?.data === "string"
        ? error.response.data
        : JSON.stringify(error.response?.data),
    );

    if (originalRequest) {
      if (originalRequest.url === apiConfig.auth.refreshToken) {
        // TODO: logout and move to login screen
        return Promise.reject(error);
      }

      if (error?.response?.status === 401) {
        const { data: refreshResponse } = await refreshToken();
        if (refreshResponse.refreshToken) {
          saveJWT(refreshResponse.jwt);
          saveRefreshToken(refreshResponse.refreshToken);
          originalRequest.headers.setAuthorization(
            `Bearer ${refreshResponse.jwt}`,
          );
          return Promise.resolve(instance(originalRequest));
        }
      }
    }

    return Promise.reject(error);
  },
);

export const login = async (email: string, password: string) => {
  const { data } = await axios.post<LoggedUserData>(apiConfig.auth.login, {
    identifier: email,
    password: password,
  });
  return data;
};

export const register = async (
  username: string,
  email: string,
  password: string,
) => {
  const data = await axios.post<LoggedUserData>(apiConfig.auth.register, {
    username,
    email,
    password,
  });
  return data;
};

export const resetPass = async (email: string) => {
  const { data } = await axios.post<LoggedUserData>(
    apiConfig.auth.forgotPassword,
    {
      email,
    },
  );
  return data;
};

export default instance;
