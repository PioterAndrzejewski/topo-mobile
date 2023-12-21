import { useNavigation } from "@react-navigation/native";
import { useMemo } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useAtomValue, useSetAtom } from 'jotai';
import BackArrow from "src/components/common/BackArrow";
import { routeToFavoritesAtom } from 'src/store/rock';
import Text from "../ui/Text";
import View from "../ui/View";

type HeaderProps = {
  name?: string;
  numberOfImages?: number;
  activeImage: number;
  onCirclePress: (index: number) => void;
};

const Header = (props: HeaderProps) => {
  const navigation = useNavigation();
  const setRouteToFavorites = useSetAtom(routeToFavoritesAtom);
  const imagesArray = useMemo(() => {
    if (!props.numberOfImages || props.numberOfImages < 1) return null;
    return Array.from({ length: props.numberOfImages! }, (_, i) => ({
      index: i,
    }));
  }, [props.numberOfImages]);

  const handleBackArrowPress = () => {
    navigation.goBack();
    setRouteToFavorites(null);
  }

  return (
    <View
      width='100%'
      position='absolute'
      top={60}
      zIndex={4}
      backgroundColor='mainBackgroundFaded'
      paddingVertical='m'
    >
      <View width='100%' flexDirection='row' left={0} justifyContent='center'>
        <View position='absolute' left={0}>
          <BackArrow onClick={handleBackArrowPress} />
        </View>
        <Text variant='h3'>{props.name}</Text>
      </View>
      {props.numberOfImages && props.numberOfImages > 1 && (
        <View width='100%' gap='xs' flexDirection='row' justifyContent='center'>
          {imagesArray?.map((_, i) => (
            <ImageCircle
              active={i === props.activeImage}
              index={i}
              onPress={props.onCirclePress}
              key={i}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const ImageCircle = ({
  active,
  index,
  onPress,
}: {
  active: boolean;
  index: number;
  onPress: (i: number) => void;
}) => {
  const handlePress = () => onPress(index);
  if (active)
    return (
      <View style={$imageCircleOffset(active)}>
        <View style={$imageCircle(active)} />
      </View>
    );
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={$imageCircleOffset(active)}>
        <View style={$imageCircle(active)} />
      </View>
    </TouchableOpacity>
  );
};

const $imageCircle = (active: boolean) => ({
  width: 12,
  height: 12,
  backgroundColor: active ? "#000" : "#777",
  borderRadius: 20,
  borderWidth: 1,
});

const $imageCircleOffset = (active: boolean) => ({
  padding: 4,
  borderColor: "#000",
  borderRadius: 20,
  borderWidth: active ? 1 : 0,
});

export default Header;
