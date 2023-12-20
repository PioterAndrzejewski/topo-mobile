import { useTheme } from "@shopify/restyle";
import { useAtom } from "jotai";
import Modal from "react-native-modal";
import Animated, { FadeInDown } from "react-native-reanimated";

import Button from "src/components/common/Button";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { HeartIcon } from "src/components/icons/Heart";
import { useFavoriteContext } from "src/context/FavoritesContext";
import { FavoriteType } from "src/services/storeAsync";
import { routeToFavoritesAtom } from "src/store/rock";
import { Theme } from "src/styles/theme";
import { getFavoriteColor } from "src/utils/getFavoriteColor";

const FavoritesModal = () => {
  const [routeToFavorites, setRouteToFavorites] = useAtom(routeToFavoritesAtom);
  const { colors } = useTheme<Theme>();
  const { setRouteAsFavorite } = useFavoriteContext();

  const handleAddToFavorites = (favoriteType: FavoriteType) => {
    if (!routeToFavorites) return;
    setRouteAsFavorite(
      routeToFavorites.route,
      favoriteType,
      routeToFavorites.parent,
    );
    setRouteToFavorites(null);
  };

  return (
    <Modal
      isVisible={!!routeToFavorites}
      backdropColor={"rgba(0, 0, 0, 0.8)"}
      onBackdropPress={() => setRouteToFavorites(null)}
    >
      <View
        backgroundColor='mainBackground'
        padding='l'
        borderRadius={12}
        alignItems='center'
      >
        <Text variant='h2'>
          {routeToFavorites?.route.attributes.display_name}
        </Text>
        <Animated.View entering={FadeInDown.delay(300)} style={$icon}>
          <HeartIcon size={64} color={colors.secondary} />
        </Animated.View>
        <Text variant='body'>Dodaj do listy:</Text>
        <View justifyContent='space-between' flexDirection='row' gap='m'>
          <Button
            label='Zrobione'
            onClick={() => handleAddToFavorites("done")}
            containerStyles={{ backgroundColor: getFavoriteColor("done") }}
          />
          <Button
            label='Projekt'
            onClick={() => handleAddToFavorites("project")}
            containerStyles={{
              backgroundColor: getFavoriteColor("project"),
            }}
          />
          <Button
            label='Inne'
            onClick={() => handleAddToFavorites("other")}
            containerStyles={{ backgroundColor: getFavoriteColor("other") }}
          />
        </View>
      </View>
    </Modal>
  );
};

const $icon = {
  marginVertical: 24,
  shadowOpacity: 0.1,
  shadowColor: "#000",
  shadowRadius: 5,
  shadowOffset: { height: 2, width: 0 },
};

export default FavoritesModal;
