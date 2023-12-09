import { useEffect, useState } from 'react';
import { Route } from '../services/rocks';
import { saveRouteToFavorites, FavoriteType, removeRouteFromFavorites, checkRouteInFavorites } from '../services/storeAsync';
import { RoutesParent } from '../components/common/ResultsItem/ResultsItemRoute';
import { useFavoriteContext } from '../context/FavoritesContext';

export const useFavoriteRoute = (route: Route) => {
  const [favoriteType, setFavoriteType] = useState<FavoriteType | null>(null);
  const {refreshFavoritesList} = useFavoriteContext();

  useEffect(()=>{
    const asyncCheck = async () => {
      const type = await checkRouteInFavorites(route);
      setFavoriteType(type);
    }

    asyncCheck();
  }, [])

  const setAsFavorite = async (favoriteType: FavoriteType, parent: RoutesParent) => {
    setFavoriteType(favoriteType);
    await saveRouteToFavorites(route, favoriteType, parent);
    refreshFavoritesList();
  }

  const removeFromFavorites = async () => {
    setFavoriteType(null);
    await removeRouteFromFavorites(route)
    refreshFavoritesList();
  }

  return {favoriteType, setAsFavorite, removeFromFavorites};
}