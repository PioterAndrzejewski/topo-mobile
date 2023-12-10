import axios from "axios";
import { apiConfig } from 'src/services/apiConfig';
import { getFromSecureStorage } from 'src/services/store';

export type UserLoginData = {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  id: string;
  provider: string;
  updatedAt: string;
  username: string;
}

export type LoggedUserData = {
  jwt: string;
  user: UserLoginData;
}

const instance = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async (config) => {
    const jwt = await getFromSecureStorage('jwt')
    config.headers['Authorization'] = `Bearer ${jwt}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (email: string, password: string) => {
  const { data } = await axios.post<LoggedUserData>(apiConfig.auth.login, {
    identifier: email,
    password: password,
  });
  return data;
};

export const register = async (username: string, email: string, password: string) => {
  const { data } = await axios.post<LoggedUserData>(apiConfig.auth.register, {
    username,
    email,
    password,
  });
  return data;
};

export default instance;