import { FavoriteType } from 'src/services/storeAsync';
import theme from 'src/styles/theme';

export const getFavoriteColor = (favoriteType: FavoriteType | null) => {
  switch (favoriteType) {
    case "project":
      return theme.colors.project;
    case "other":
      return theme.colors.secondary;
    case "done":
      return theme.colors.finished;
    default:
      return undefined;
  }
}