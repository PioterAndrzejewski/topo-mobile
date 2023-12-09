import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getAllFavorites } from "../services/storeAsync";
import { RouteWithFavoriteAndParent } from "../services/storeAsync";

type RoutesFiltered = {
  project: RouteWithFavoriteAndParent[];
  done: RouteWithFavoriteAndParent[];
  other: RouteWithFavoriteAndParent[];
};

type FavoritesContextValue = {
  favoriteRoutes: RoutesFiltered | undefined;
  refreshFavoritesList: () => void;
};

const FavoritesContext = createContext<FavoritesContextValue>({
  favoriteRoutes: {
    project: [],
    done: [],
    other: [],
  },
  refreshFavoritesList: () => undefined,
});

const FavoritesContextProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteRoutes, setFavoriteRoutes] = useState<RoutesFiltered>();

  const getRoutesAsync = useCallback(async () => {
    const favorites = await getAllFavorites();
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

  useEffect(() => {
    getRoutesAsync();
  }, []);

  useEffect(() => {
    console.log(favoriteRoutes);
  }, [favoriteRoutes]);

  const refreshFavoritesList = () => {
    getRoutesAsync();
  };

  return (
    <FavoritesContext.Provider value={{ favoriteRoutes, refreshFavoritesList }}>
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
