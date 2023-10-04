import axios from "axios";
import { apiConfig } from '../Components/auth/apiConfig';
import { getFromSecureStorage } from './store';

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

export type LoginData = {
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
  const { data } = await axios.post<LoginData>(apiConfig.auth.login, {
    identifier: email,
    password: password,
  });
  return data;
};

export default instance;