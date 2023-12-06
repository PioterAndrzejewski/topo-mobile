import { FavoriteType } from '../services/storeAsync';

export const getFavoriteColor = (favoriteType: FavoriteType) => {
  switch (favoriteType) {
    case "project":
      return "#bbb545";
    case "other":
      return "#4fd6ff";
    case "done":
      return "#45bb50";
    default:
      return undefined;
  }
}