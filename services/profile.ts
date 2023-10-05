import axios from 'axios';
import { apiConfig } from './apiConfig';

import authService, { UserLoginData } from "./auth"

export const getUserProfile = async () => {
  const { data } = await authService.get<UserLoginData>(apiConfig.user.me);
  return data;
};