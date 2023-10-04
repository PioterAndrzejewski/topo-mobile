import axios from 'axios';
import { apiConfig } from '../Components/auth/apiConfig';

import authService, { UserLoginData } from "./auth"

export const getUserProfile = async () => {
  const { data } = await authService.get<UserLoginData>(apiConfig.user.me);
  return data;
};