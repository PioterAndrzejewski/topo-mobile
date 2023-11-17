// export const apiUrl = "http://localhost:1337";
export const apiUrl = "http://192.168.50.16:1337";
export const viewerUrl = "http://localhost:3000";

export const apiConfig = {
  auth: {
    login: `${apiUrl}/api/auth/local/`,
    register: `${apiUrl}/api/auth/local/register/`
  },
  user: {
    me: `${apiUrl}/api/users/me`
  },
  topo: {
    areas: (qs: string) => `${apiUrl}/api/map-areas?${qs}`,
    regions: (qs: string) => `${apiUrl}/api/map-regions?${qs}`,
    sectors: (qs: string) => `${apiUrl}/api/map-sectors?${qs}`,
    rocks: (qs: string) => `${apiUrl}/api/rocks?${qs}`
  },
  ratings: {
    create: `${apiUrl}/api/ratings`,
    update: (id: number) => `${apiUrl}/api/ratings/${id}`,
    get: (qs: string) => `${apiUrl}/api/ratings?${qs}`,
  }
}