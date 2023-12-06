import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { TouchableOpacity } from "react-native-gesture-handler";

import Button from "../../common/Button";

import { Route } from "../../../services/rocks";
import { useFavoriteRoute } from "../../../hooks/useFavoriteRoute";
import { FavoriteType } from "../../../services/storeAsync";
import { getFavoriteColor } from "../../../utils/getFavoriteColor";

const FavoritesModal = ({
  route,
  onHide,
  favoriteType,
  setAsFavorite,
  removeFromFavorites,
}: {
  route: Route;
  onHide: () => void;
  favoriteType: FavoriteType;
  setAsFavorite: (val: FavoriteType) => void;
  removeFromFavorites: () => void;
}) => {
  const handleAdd = (value: FavoriteType) => {
    setAsFavorite(value);
    onHide();
  };

  const handleRemove = () => {
    removeFromFavorites();
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
  },
});

export default FavoritesModal;
