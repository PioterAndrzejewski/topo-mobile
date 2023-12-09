import { View, StyleSheet, Text } from "react-native";

import Button from "../../common/Button";

import { Route } from "../../../services/rocks";
import { FavoriteType } from "../../../services/storeAsync";
import { getFavoriteColor } from "../../../utils/getFavoriteColor";
import { useFavoriteContext } from "../../../context/FavoritesContext";

const FavoritesModal = ({
  route,
  onHide,
  favoriteType,
  setAsFavorite,
}: {
  route: Route;
  onHide: () => void;
  favoriteType: FavoriteType | null;
  setAsFavorite: (val: FavoriteType) => void;
}) => {
  const { removeRouteFromFavorites } = useFavoriteContext();
  const handleAdd = (value: FavoriteType) => {
    setAsFavorite(value);
    onHide();
  };

  const handleRemove = () => {
    removeRouteFromFavorites(route);
    onHide();
  };

  return (
    <View style={favoritesModalStyles.container}>
      {favoriteType ? (
        <>
          <Text>{route.attributes.display_name}</Text>
          <Text>Usuwasz z ulubionych</Text>
          <Button label='Usuń z listy' onClick={handleRemove} />
        </>
      ) : (
        <>
          <Text>{route.attributes.display_name}</Text>
          <Text>Dodaj do listy:</Text>
          <View style={favoritesModalStyles.buttons}>
            <Button
              label='Zrobione'
              onClick={() => handleAdd("done")}
              containerStyles={{ backgroundColor: getFavoriteColor("done") }}
            />
            <Button
              label='Projekt'
              onClick={() => handleAdd("project")}
              containerStyles={{ backgroundColor: getFavoriteColor("project") }}
            />
            <Button
              label='Inne'
              onClick={() => handleAdd("other")}
              containerStyles={{ backgroundColor: getFavoriteColor("other") }}
            />
          </View>
        </>
      )}
    </View>
  );
};

const favoritesModalStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    dlex: 1,
  },
});

export default FavoritesModal;
