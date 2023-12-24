import { useTheme } from "@shopify/restyle";
import { useAtom, useSetAtom } from "jotai";
import { LayoutAnimation, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

import Accordion from "src/components/common/Accordion";
import Rating from "src/components/common/Rating";
import OverlayCardView from "src/components/ui/OverlayCardView";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { RoutesParent } from "src/components/common/ResultsItem/ResultsItemRoute";
import { CommentIcon } from "src/components/icons/Comment";
import { HeartIcon } from "src/components/icons/Heart";
import { useFavoriteContext } from "src/context/FavoritesContext";
import { Route } from "src/services/rocks";
import { confirmActionAtom } from "src/store/global";
import {
  rockActiveRoute,
  routeToCommentAtom,
  routeToFavoritesAtom,
  selectedRouteToRateAtom,
} from "src/store/rock";
import { Theme } from "src/styles/theme";
import { getFavoriteColor } from "src/utils/getFavoriteColor";
import { getAnchorName } from "src/utils/language/getAnchorName";
import { getMeaningfulGrade } from "src/utils/language/getMeaningfulGrade";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

type RockInfoProps = {
  route: Route;
  realIndex?: number;
  rockRefetch: () => void;
  parent: RoutesParent;
};

const RouteInfo = ({ route, realIndex, parent }: RockInfoProps) => {
  const { colors } = useTheme<Theme>();
  const [activeRoute, setActiveRoute] = useAtom(rockActiveRoute);
  const setRouteToFavorites = useSetAtom(routeToFavoritesAtom);
  const setConfirmAction = useSetAtom(confirmActionAtom);
  const { checkRouteInFavorites, removeRouteFromFavorites } =
    useFavoriteContext();
  const favoriteType = checkRouteInFavorites(route.attributes.uuid);
  const setSelectedRouteToRate = useSetAtom(selectedRouteToRateAtom);
  const setSelectedRouteToComment = useSetAtom(routeToCommentAtom);

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (activeRoute === route.attributes.uuid) return setActiveRoute(null);
    setActiveRoute(route.attributes.uuid);
  };

  const handleFavoritesPress = () => {
    if (!favoriteType) return setRouteToFavorites({ route, parent });
    if (favoriteType) {
      return setConfirmAction({
        confirmFn: () => removeRouteFromFavorites(route),
        message: `Usuwasz drogę ${route.attributes.display_name} z zapisanych`,
      });
    }
  };

  const handleRateRoute = () => {
    setSelectedRouteToRate(route);
  };

  const handleCommentRoute = () => {
    setSelectedRouteToComment(route);
  };

  return (
    <>
      <AnimatedTouchableOpacity
        key={route.attributes.uuid}
        activeOpacity={0.9}
        onPress={handlePress}
      >
        <Accordion
          Title={
            <View
              flexDirection='row'
              justifyContent='space-between'
              flex={1}
              alignItems='center'
            >
              <View flexDirection='row' alignItems='center'>
                <View flexBasis={30} marginLeft='xs' borderColor='secondary'>
                  <Text variant='h2' color='secondary'>
                    {(realIndex! + 1).toString()}
                  </Text>
                </View>
                <View gap='s'>
                  <Text variant='h3'>{route.attributes.display_name}</Text>
                  <View flexDirection='row' gap='m'>
                    <Text
                      variant='h4'
                      color='secondary'
                      additionalStyles={{ width: 40 }}
                    >
                      {getMeaningfulGrade(route.attributes.grade)}
                    </Text>
                    <Text variant='body'>{route.attributes.Type}</Text>
                  </View>
                </View>
              </View>
              <View flexDirection='row' gap='l' alignItems='center'>
                <View justifyContent='center'>
                  <Rating
                    rating={
                      route.attributes.averageScore > 1
                        ? route.attributes.averageScore.toString()
                        : "?"
                    }
                    noFill
                  />
                </View>
                <TouchableOpacity onPress={handleFavoritesPress}>
                  <OverlayCardView
                    padding='xs'
                    backgroundColor='backgroundScreen'
                    width={46}
                    height={46}
                    justifyContent='center'
                    alignItems='center'
                  >
                    <HeartIcon
                      fill={getFavoriteColor(favoriteType)}
                      color={colors.secondary}
                      size={32}
                      noStroke={!!favoriteType}
                    />
                  </OverlayCardView>
                </TouchableOpacity>
              </View>
            </View>
          }
          Content={
            route.attributes.uuid === activeRoute && (
              <View
                flexDirection='row'
                justifyContent='space-between'
                alignItems='center'
              >
                <View gap='s' maxWidth='75%'>
                  <View flexDirection='row' gap='s' alignItems='center'>
                    <Text variant='h3'>Przelotów:</Text>
                    <Text>{route.attributes.rings_number.toString()}</Text>
                  </View>
                  <View flexDirection='row' gap='s' alignItems='center'>
                    <Text variant='h3'>Stan:</Text>
                    <Text>{getAnchorName(route.attributes.anchor)}</Text>
                  </View>

                  {route.attributes.author && (
                    <View flexDirection='row' gap='s' alignItems='center'>
                      <Text variant='h3'>Autor:</Text>
                      <Text>{route.attributes.author}</Text>
                      <Text>{route.attributes.author_date.toString()}</Text>
                    </View>
                  )}
                  {route.attributes.first_ascent_author && (
                    <View flexDirection='row' gap='s' alignItems='center'>
                      <Text variant='h3'>1. przejście:</Text>
                      <Text>{route.attributes.first_ascent_author}</Text>
                    </View>
                  )}
                  {route.attributes.description && (
                    <View>
                      <Text>{route.attributes.description}</Text>
                    </View>
                  )}
                </View>
                <View justifyContent='space-between' gap='m'>
                  <TouchableOpacity onPress={() => handleRateRoute()}>
                    <OverlayCardView
                      width={46}
                      height={46}
                      justifyContent='center'
                      alignItems='center'
                    >
                      <Rating
                        rating={
                          route.attributes.usersRating
                            ? route.attributes.usersRating.score.toString()
                            : null
                        }
                      />
                    </OverlayCardView>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleCommentRoute()}>
                    <OverlayCardView
                      width={46}
                      height={46}
                      justifyContent='center'
                      alignItems='center'
                    >
                      <CommentIcon
                        size={36}
                        color={route.attributes.usersComment ? colors.textWhite : colors.secondary}
                        fill={
                          route.attributes.usersComment
                            ? colors.secondary
                            : undefined
                        }
                      />
                    </OverlayCardView>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
        />
      </AnimatedTouchableOpacity>
    </>
  );
};

export default RouteInfo;
