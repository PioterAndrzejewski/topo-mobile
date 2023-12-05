import { useEffect, useState } from 'react';
import { Route } from '../services/rocks';
import { saveRouteToFavorites, FavoriteType, removeRouteFromFavorites, checkRouteInFavorites } from '../services/storeAsync';

export const useFavoriteRoute = (route: Route) => {
  const [favoriteType, setFavoriteType] = useState<FavoriteType>(null);

  useEffect(()=>{
    const asyncCheck = async () => {
      const type = await checkRouteInFavorites(route);
      setFavoriteType(type);
    }

    asyncCheck();
  }, [])

  const setAsFavorite = (favoriteType: FavoriteType) => {
    setFavoriteType(favoriteType);
    saveRouteToFavorites(route, favoriteType);
  }

  const removeFromFavorites = () => {
    setFavoriteType(null);
    removeRouteFromFavorites(route)
  }

  return {favoriteType, setAsFavorite, removeFromFavorites};
}