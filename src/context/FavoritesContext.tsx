import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { RoutesParent } from "src/components/common/ResultsItem/ResultsItemRoute";
import { RockData, Route } from "src/services/rocks";
import {
  FavoriteType,
  RouteWithFavoriteAndParent,
  getAllFavoriteRocks,
  getAllFavoriteRoutes,
  removeRockFromFavorites,
  removeSavedRouteFromFavorites,
  saveRockToFavorites,
  saveRouteToFavorites,
} from "src/services/storeAsync";

type RoutesFiltered = {
  project: RouteWithFavoriteAndParent[];
  done: RouteWithFavoriteAndParent[];
  other: RouteWithFavoriteAndParent[];
};

type FavoritesStats = {
  rocks: number;
  routes: number;
};

type FavoritesContextValue = {
  favoriteRoutes: RoutesFiltered | undefined;
  favoriteRocks: RockData[] | undefined;
  refreshFavoritesList: () => void;
  checkRouteInFavorites: (uuid: string) => FavoriteType | null;
  checkRockInFavorites: (uuid: string) => boolean;
  setRouteAsFavorite: (
    route: Route,
    favoriteType: FavoriteType,
    parent: RoutesParent,
  ) => void;
  setRockAsFavorite: (rock: RockData) => void;
  removeRouteFromFavorites: (route: Route) => void;
  removeRockFromFavorite: (uuid: string) => void;
  getStats: () => FavoritesStats;
};

const FavoritesContext = createContext<FavoritesContextValue>({
  favoriteRoutes: {
    project: [],
    done: [],
    other: [],
  },
  favoriteRocks: [],
  refreshFavoritesList: () => undefined,
  checkRouteInFavorites: () => null,
  setRouteAsFavorite: () => undefined,
  setRockAsFavorite: () => undefined,
  removeRouteFromFavorites: () => undefined,
  removeRockFromFavorite: () => undefined,
  checkRockInFavorites: () => false,
  getStats: () => ({ rocks: 0, routes: 0 }),
});

const FavoritesContextProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteRoutes, setFavoriteRoutes] = useState<RoutesFiltered>();
  const [favoriteRocks, setFavoriteRocks] = useState<RockData[]>();

  const getRoutesAsync = useCallback(async () => {
    const favorites = await getAllFavoriteRoutes();
    const routesFiltered: RoutesFiltered = {
      project: [],
      done: [],
      other: [],
    };
    favorites.forEach((route) => {
      routesFiltered[`${route.favoriteType}`].push(route);
    });
    setFavoriteRoutes(routesFiltered);
  }, []);

  const getRocksAsync = useCallback(async () => {
    const favorites = await getAllFavoriteRocks();
    setFavoriteRocks(favorites);
  }, []);

  useEffect(() => {
    refreshFavoritesList();
  }, []);

  const refreshFavoritesList = () => {
    getRoutesAsync();
    getRocksAsync();
  };

  const checkRouteInFavorites = (uuid: string) => {
    let routeFound: FavoriteType | null = null;
    if (favoriteRoutes) {
      for (const key in favoriteRoutes) {
        const foundRoute = favoriteRoutes[key as keyof RoutesFiltered].find(
          (route) => route.attributes.uuid === uuid,
        );
        if (!!foundRoute) routeFound = foundRoute.favoriteType;
      }
    }
    return routeFound;
  };

  const setRouteAsFavorite = async (
    route: Route,
    favoriteType: FavoriteType,
    parent: RoutesParent,
  ) => {
    await saveRouteToFavorites(route, favoriteType, parent);
    refreshFavoritesList();
  };

  const removeRouteFromFavorites = async (route: Route) => {
    await removeSavedRouteFromFavorites(route);
    refreshFavoritesList();
  };

  const checkRockInFavorites = (uuid: string) => {
    if (favoriteRocks) {
      const foundRock = favoriteRocks.find(
        (rock) => rock.attributes.uuid === uuid,
      );
      return !!foundRock;
    }
    return false;
  };

  const setRockAsFavorite = async (rock: RockData) => {
    await saveRockToFavorites(rock);
    refreshFavoritesList();
  };

  const removeRockFromFavorite = async (uuid: string) => {
    await removeRockFromFavorites(uuid);
    refreshFavoritesList();
  };

  const getStats = () => {
    let routesNumber = 0;
    for (const routes in favoriteRoutes) {
      const key = routes as keyof typeof favoriteRoutes;
      routesNumber += favoriteRoutes[key].length;
    }
    return {
      rocks: favoriteRocks?.length || 0,
      routes: routesNumber,
    };
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteRoutes,
        favoriteRocks,
        refreshFavoritesList,
        checkRouteInFavorites,
        setRouteAsFavorite,
        removeRouteFromFavorites,
        checkRockInFavorites,
        setRockAsFavorite,
        removeRockFromFavorite,
        getStats,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

const useFavoriteContext = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error(
      "This component is tied to Favorites Context - have you used it somewhere else?",
    );
  }
  return context;
};

export { FavoritesContextProvider, useFavoriteContext };
