import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Route } from './rocks';

const storage = {
  favorites: {
    routes: 'favRoutes',
  }
}

export type FavoriteType = 'project' | 'done' | 'other' | null;
interface RouteWithFavorite extends Route {
  favoriteType: FavoriteType
}

export const checkRouteInFavorites = async (route: Route): Promise<FavoriteType> => {
  try {
    const favRoutesString = await AsyncStorage.getItem(storage.favorites.routes);
    if (!favRoutesString) {
      return null;
    } else {
      const favRoutes: RouteWithFavorite[] = JSON.parse(favRoutesString);
      const foundRoute = favRoutes.find(savedRoute => savedRoute.attributes.uuid === route.attributes.uuid)
      if (!foundRoute) return null;
      return foundRoute.favoriteType;
    }
  } catch(e) {
    Toast.show({
      type: "error",
      text2: "Coś poszło nie tak",
    });
  }
  return null;
}

export const saveRouteToFavorites = async (route: Route, favoriteType: FavoriteType) => {
  try {
    const favRoutesString = await AsyncStorage.getItem(storage.favorites.routes);
    if (!favRoutesString) {
      await AsyncStorage.setItem(storage.favorites.routes, JSON.stringify([{...route, favoriteType}]))
    } else {
      const favRoutes: Route[] = JSON.parse(favRoutesString);
      const favRoutesAltered = [...favRoutes, {...route, favoriteType}]
      await AsyncStorage.setItem(storage.favorites.routes, JSON.stringify(favRoutesAltered))
    }
    Toast.show({
      type: "success",
      text2: `Zapisano drogę ${route.attributes.display_name} do listy.`,
    });
  } catch(e) {
    Toast.show({
      type: "error",
      text2: "Coś poszło nie tak",
    });
  }
}

export const removeRouteFromFavorites = async (route: Route) => {
  try {
    const favRoutesString = await AsyncStorage.getItem(storage.favorites.routes);
    if (!favRoutesString) {
      throw new Error('Coś poszło nie tak')
    } else {
      const favRoutes: Route[] = JSON.parse(favRoutesString);
      const favRoutesAltered = favRoutes.filter(savedRoute => savedRoute.attributes.uuid !== route.attributes.uuid)
      await AsyncStorage.setItem(storage.favorites.routes, JSON.stringify(favRoutesAltered))
    }
    Toast.show({
      type: "success",
      text2: `Usunięto drogę ${route.attributes.display_name} z listy.`,
    });
  } catch(e) {
    Toast.show({
      type: "error",
      text2: "Coś poszło nie tak",
    });
  }
}