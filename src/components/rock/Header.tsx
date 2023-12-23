import { useNavigation } from "@react-navigation/native";
import { useSetAtom } from "jotai";
import { useMemo } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

import View from "src/components/ui/View";
import Text from "../ui/Text";

import { confirmActionAtom } from "src/store/global";
import { routeToCommentAtom, routeToFavoritesAtom } from "src/store/rock";
import { palette } from "src/styles/theme";
import { ArrowLeft } from "../icons/ArrowLeft";
import OverlayCardView from "../ui/OverlayCardView";

type HeaderProps = {
  name?: string;
  numberOfImages?: number;
  activeImage: number;
  onCirclePress: (index: number) => void;
};

const Header = (props: HeaderProps) => {
  const navigation = useNavigation();
  const setRouteToFavorites = useSetAtom(routeToFavoritesAtom);
  const setRouteToComment = useSetAtom(routeToCommentAtom);
  const setConfirmAction = useSetAtom(confirmActionAtom);

  const imagesArray = useMemo(() => {
    if (!props.numberOfImages || props.numberOfImages < 1) return null;
    return Array.from({ length: props.numberOfImages! }, (_, i) => ({
      index: i,
    }));
  }, [props.numberOfImages]);

  const handleBackArrowPress = () => {
    navigation.goBack();
    setRouteToFavorites(null);
    setRouteToComment(null);
    setConfirmAction(null);
  };

  return (
    <View
      paddingTop='3xl'
      flexDirection='row'
      alignItems='center'
      marginHorizontal='m'
      paddingBottom='m'
      gap='3xl'
    >
      <TouchableOpacity onPress={handleBackArrowPress}>
        <OverlayCardView>
          <ArrowLeft size={24} />
        </OverlayCardView>
      </TouchableOpacity>
      <View flexDirection='row' gap='s'>
        <Text variant='h4' color='textSecondary'>
          Skałoplan:
        </Text>

        <View
          gap='xs'
          flexDirection='row'
          justifyContent='center'
          alignItems='center'
        >
          {imagesArray?.map((_, i) => (
            <ImageCircle
              active={i === props.activeImage}
              index={i}
              onPress={props.onCirclePress}
              key={i}
            />
          ))}
        </View>
      </View>
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
  backgroundColor: active ? palette.green : palette.blue500,
  borderRadius: 20,
});

const $imageCircleOffset = (active: boolean) => ({
  padding: 4,
  borderColor: palette.green,
  borderRadius: 20,
  borderWidth: active ? 1 : 0,
});

export default Header;
