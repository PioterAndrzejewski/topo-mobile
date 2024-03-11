import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { useSetAtom } from "jotai";
import { useMemo } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import View from "src/components/ui/View";
import Text from "../ui/Text";

import { confirmActionAtom } from "src/store/global";
import {
  rockActiveRoute,
  routeToCommentAtom,
  routeToFavoritesAtom,
} from "src/store/rock";
import { Theme, palette } from "src/styles/theme";
import Switcher from "../common/Switcher";
import { ArrowLeft } from "../icons/ArrowLeft";
import OverlayCardView from "../ui/OverlayCardView";

type HeaderProps = {
  name?: string;
  numberOfImages?: number;
  activeImage: number;
  onCirclePress: (index: number) => void;
  refetch: () => void;
  viewer: "2d" | "3d";
  setViewer: (viewerType: "2d" | "3d") => void;
};

const Header = (props: HeaderProps) => {
  const navigation = useNavigation();
  const setRouteToFavorites = useSetAtom(routeToFavoritesAtom);
  const setRouteToComment = useSetAtom(routeToCommentAtom);
  const setConfirmAction = useSetAtom(confirmActionAtom);
  const setActiveRoute = useSetAtom(rockActiveRoute);
  const { spacing } = useTheme<Theme>();

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
    setActiveRoute(null);
  };

  return (
    <>
      <View paddingBottom='l'>
        <Switcher
          options={[
            { label: "2d", value: "2d" },
            { label: "3d", value: "3d" },
          ]}
          active={props.viewer}
          onPress={props.setViewer}
        />
      </View>
      <View
        flexDirection='row'
        alignItems='center'
        marginHorizontal='m'
        gap='3xl'
        paddingBottom='m'
      >
        <OverlayCardView>
          <TouchableOpacity onPress={handleBackArrowPress}>
            <ArrowLeft size={24} color={palette.green} />
          </TouchableOpacity>
        </OverlayCardView>
        {props.viewer === "2d" && (
          <View flexDirection='row' gap='s'>
            <View alignSelf='center'>
              <Text variant='h4' color='textSecondary'>
                Skałoplan:
              </Text>
            </View>

            <ScrollView
              contentContainerStyle={{
                gap: spacing.m,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              horizontal
            >
              {imagesArray?.map((_, i) => (
                <ImageCircle
                  active={i === props.activeImage}
                  index={i}
                  onPress={props.onCirclePress}
                  key={i}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </>
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
      <View
        borderColor='secondary'
        borderWidth={2}
        borderRadius={20}
        width={25}
        height={25}
        justifyContent='center'
        alignItems='center'
      >
        <Text color='textSecondary' variant='h4'>
          {index === 0 ? "M" : index.toString()}
        </Text>
      </View>
    );
  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        borderColor='textLight'
        borderWidth={1}
        borderRadius={20}
        width={25}
        height={25}
        justifyContent='center'
        alignItems='center'
      >
        <Text color='textGray' variant='h4'>
          {index === 0 ? "M" : index.toString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Header;
