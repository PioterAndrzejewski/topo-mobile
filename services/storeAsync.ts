import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { RockData, Route } from './rocks';
import { RoutesParent } from '../components/common/ResultsItem/ResultsItemRoute';

const storage = {
  favorites: {
    routes: 'favRoutes',
    rocks: 'favRocks'
  }
}

export type FavoriteType = 'project' | 'done' | 'other';
export interface RouteWithFavoriteAndParent extends Route {
  favoriteType: FavoriteType;
  parent: RoutesParent
}

export const saveRouteToFavorites = async (route: Route, favoriteType: FavoriteType, parent: RoutesParent) => {
  try {
    const favRoutesString = await AsyncStorage.getItem(storage.favorites.routes);
    if (!favRoutesString) {
      await AsyncStorage.setItem(storage.favorites.routes, JSON.stringify([{...route, favoriteType, parent}]))
    } else {
      const favRoutes: RouteWithFavoriteAndParent[] = JSON.parse(favRoutesString);
      const favRoutesAltered = [...favRoutes, {...route, favoriteType, parent}]
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

export const removeSavedRouteFromFavorites = async (route: Route) => {
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

export const getAllFavoriteRoutes = async (): Promise<RouteWithFavoriteAndParent[]> => {
  try {
    const favRoutesString = await AsyncStorage.getItem(storage.favorites.routes);
    if (favRoutesString) {
      return JSON.parse(favRoutesString);
    }
    return [];
  } catch(e) {
    Toast.show({
      type: "error",
      text2: "Coś poszło nie tak",
    });
  }
  return [];
}

export const saveRockToFavorites = async (rock: RockData) => {
  try {
    const favRocksString = await AsyncStorage.getItem(storage.favorites.rocks);
    if (!favRocksString) {
      await AsyncStorage.setItem(storage.favorites.rocks, JSON.stringify([rock]))
    } else {
      const favRocks: RockData[] = JSON.parse(favRocksString);
      const favRocksAltered = [...favRocks, rock]
      await AsyncStorage.setItem(storage.favorites.rocks, JSON.stringify(favRocksAltered))
    }
    Toast.show({
      type: "success",
      text2: `Zapisano drogę ${rock.attributes.Name} do listy.`,
    });
  } catch(e) {
    Toast.show({
      type: "error",
      text2: "Coś poszło nie tak",
    });
  }
}

export const removeRockFromFavorites = async (rockUuid: string) => {
  try {
    const favRocksString = await AsyncStorage.getItem(storage.favorites.rocks);
    if (!favRocksString) {
      throw new Error('Coś poszło nie tak')
    } else {
      const favRocks: RockData[] = JSON.parse(favRocksString);
      const favRocksAltered = favRocks.filter(savedRock => savedRock.attributes.uuid !== rockUuid)
      await AsyncStorage.setItem(storage.favorites.rocks, JSON.stringify(favRocksAltered))
    }
    Toast.show({
      type: "success",
      text2: `Usunięto skałę z listy.`,
    });
  } catch(e) {
    Toast.show({
      type: "error",
      text2: "Coś poszło nie tak",
    });
  }
}

export const getAllFavoriteRocks = async (): Promise<RockData[]> => {
  try {
    const favRocksString = await AsyncStorage.getItem(storage.favorites.rocks);
    if (favRocksString) {
      return JSON.parse(favRocksString);
    }
    return [];
  } catch(e) {
    Toast.show({
      type: "error",
      text2: "Coś poszło nie tak",
    });
  }
  return [];
}