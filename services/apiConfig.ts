export const apiUrl = "http://192.168.50.223:1337";

export const apiConfig = {
  auth: {
    login: `${apiUrl}/api/auth/local/`,
    register: `${apiUrl}/api/auth/local/register/`
  },
  user: {
    me: `${apiUrl}/api/users/me`
  }
}