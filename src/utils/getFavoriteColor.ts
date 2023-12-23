import { useTheme } from '@shopify/restyle';
import { FavoriteType } from 'src/services/storeAsync';
import { Theme } from 'src/styles/theme';

export const getFavoriteColor = (favoriteType: FavoriteType | null) => {
  const {colors} = useTheme<Theme>();
  switch (favoriteType) {
    case "project":
      return colors.project;
    case "other":
      return colors.other;
    case "done":
      return colors.finished;
    default:
      return undefined;
  }
}