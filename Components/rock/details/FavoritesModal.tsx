import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { TouchableOpacity } from "react-native-gesture-handler";

import Button from "../../common/Button";

import { Route } from "../../../services/rocks";
import { useFavoriteRoute } from "../../../hooks/useFavoriteRoute";
import { FavoriteType } from "../../../services/storeAsync";

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
  const [value, setValue] = useState<FavoriteType>("project");
  const handleClick = () => {
    if (!favoriteType) {
      setAsFavorite(value);
      onHide();
    }
    if (favoriteType) {
      removeFromFavorites();
      onHide();
    }
  };

  return (
    <View style={favoritesModalStyles.container}>
      {favoriteType ? (
        <>
          <Text>Usuwasz drogę z ulubionych</Text>
          <Text>{route.attributes.display_name}</Text>
          <Text>z ulubionych</Text>
          <Button label='Usuń z listy' onClick={handleClick} />
        </>
      ) : (
        <>
          <Text>Dodaj drogę</Text>
          <Text>{route.attributes.display_name}</Text>
          <Text>do listy:</Text>
          <RNPickerSelect
            value={value}
            onValueChange={(val) => setValue(val)}
            doneText='Wybierz'
            pickerProps={{
              accessibilityLabel: "Dodaj do listy",
            }}
            items={[
              { label: "Projekt", value: "project" },
              { label: "Zrobione", value: "done" },
              { label: "Inne", value: "other" },
            ]}
            placeholder={{
              label: "Wybierz:",
            }}
          />
          <Button label='Dodaj' onClick={handleClick} />
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
});

export default FavoritesModal;
