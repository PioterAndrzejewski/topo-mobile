import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  getAllFavoriteRoutes,
  getAllFavoriteRocks,
  FavoriteType,
  saveRouteToFavorites,
  removeRouteFromFavorites,
} from "../services/storeAsync";
import { RouteWithFavoriteAndParent } from "../services/storeAsync";
import { RockData, Route } from "../services/rocks";
import { RoutesParent } from "../components/common/ResultsItem/ResultsItemRoute";

type RoutesFiltered = {
  project: RouteWithFavoriteAndParent[];
  done: RouteWithFavoriteAndParent[];
  other: RouteWithFavoriteAndParent[];
};

type FavoritesContextValue = {
  favoriteRoutes: RoutesFiltered | undefined;
  favoriteRocks: RockData[] | undefined;
  refreshFavoritesList: () => void;
  checkRouteInFavorites: (uuid: string) => FavoriteType | null;
  setAsFavorite: (
    route: Route,
    favoriteType: FavoriteType,
    parent: RoutesParent,
  ) => void;
  removeFromFavorites: (route: Route) => void;
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
  setAsFavorite: () => undefined,
  removeFromFavorites: () => undefined,
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

  useEffect(() => {
    console.log(favoriteRoutes);
  }, [favoriteRoutes]);

  const refreshFavoritesList = () => {
    getRoutesAsync();
    getRocksAsync;
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

  const setAsFavorite = async (
    route: Route,
    favoriteType: FavoriteType,
    parent: RoutesParent,
  ) => {
    await saveRouteToFavorites(route, favoriteType, parent);
    refreshFavoritesList();
  };

  const removeFromFavorites = async (route: Route) => {
    await removeRouteFromFavorites(route);
    refreshFavoritesList();
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteRoutes,
        favoriteRocks,
        refreshFavoritesList,
        checkRouteInFavorites,
        setAsFavorite,
        removeFromFavorites,
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
