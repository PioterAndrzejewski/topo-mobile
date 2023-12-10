import { apiConfig } from 'src/services/apiConfig';

import authService, { UserLoginData } from "src/services/auth"

export const getUserProfile = async () => {
  const { data } = await authService.get<UserLoginData>(apiConfig.user.me);
  return data;
};