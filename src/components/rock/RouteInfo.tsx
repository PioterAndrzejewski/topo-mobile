import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useTheme } from "@shopify/restyle";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useMemo, useRef, useState } from "react";
import { LayoutAnimation, TextInput, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Animated from "react-native-reanimated";
import Toast from "react-native-toast-message";

import Accordion from "src/components/common/Accordion";
import Backdrop from "src/components/common/Backdrop";
import Rating from "src/components/common/Rating";
import FavoritesModal from "src/components/rock/details/FavoritesModal";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { RoutesParent } from "src/components/common/ResultsItem/ResultsItemRoute";
import { HeartIcon } from "src/components/icons/Heart";
import { useFavoriteContext } from "src/context/FavoritesContext";
import { useUserProfile } from "src/hooks/useUserProfile";
import {
  Route,
  createComment,
  createRating,
  updateComment,
  updateRating,
} from "src/services/rocks";
import { FavoriteType } from "src/services/storeAsync";
import { rockActiveRoute } from "src/store/rock";
import { styleGuide } from "src/styles/guide";
import { Theme } from "src/styles/theme";
import { getFavoriteColor } from "src/utils/getFavoriteColor";
import { getAnchorName } from "src/utils/language/getAnchorName";
import { getMeaningfulGrade } from "src/utils/language/getMeaningfulGrade";
import Button from "../common/Button";
import { CommentIcon } from "../icons/Comment";
import { StarIcon } from "../icons/Star";
import OverlayCardView from "../ui/OverlayCardView";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

type RockInfoProps = {
  route: Route;
  realIndex?: number;
  rockRefetch: () => void;
  parent: RoutesParent;
};

const RouteInfo = ({
  route,
  realIndex,
  rockRefetch,
  parent,
}: RockInfoProps) => {
  const { colors } = useTheme<Theme>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const commentsBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [activeRoute, setActiveRoute] = useAtom(rockActiveRoute);
  const [selectedRouteToRate, setSelectedRouteToRate] = useState<Route | null>(
    null,
  );
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");
  const [editingComment, setEditingComment] = useState(false);
  const [favoritesModalOpened, setFavoritesModalOpened] = useState(false);
  const { data: userData } = useUserProfile();
  const { checkRouteInFavorites, setRouteAsFavorite } = useFavoriteContext();
  const favoriteType = checkRouteInFavorites(route.attributes.uuid);

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (activeRoute === route.attributes.uuid) return setActiveRoute(null);
    setActiveRoute(route.attributes.uuid);
  };

  const { mutate: sendRouteRatingMutation, isLoading: sendRatingIsLoading } =
    useMutation({
      mutationFn: () =>
        createRating(selectedRouteToRate!.id, rating, userData?.id),
      onSuccess: () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        rockRefetch();
        Toast.show({
          type: "success",
          text2: "Ocena została zapisana",
        });
        setTimeout(() => dismissBottomSheet(), 200);
      },
      onError: () => {
        Toast.show({
          type: "error",
          text2: "Coś poszło nie tak",
        });
      },
    });

  const { mutate: updateRouteRatingMutation } = useMutation({
    mutationFn: () => updateRating(route.attributes.usersRating.id, rating),
    onSuccess: () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      Toast.show({
        type: "success",
        text2: "Ocena została zaktualizowana",
      });
      rockRefetch();
      setTimeout(() => dismissBottomSheet(), 200);
    },
    onError: () => {
      Toast.show({
        type: "error",
        text2: "Coś poszło nie tak",
      });
    },
  });

  const { mutate: sendCommentMutation } = useMutation({
    mutationFn: () =>
      createComment(selectedRouteToRate!.id, comment, userData?.id),
    onSuccess: () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setEditingComment(false);
      Toast.show({
        type: "success",
        text2: "Komentarz został zapisany",
      });
      rockRefetch();
      setTimeout(() => dismissBottomSheet(), 200);
    },
    onError: (err: AxiosError) => {
      if (err?.response?.status === 406) {
        Toast.show({
          type: "error",
          text2: "Ten komentarz nie spełnia standardów społeczności",
        });
      } else {
        Toast.show({
          type: "error",
          text2: "Coś poszło nie tak",
        });
      }
    },
  });

  const { mutate: updateCommentMutation } = useMutation({
    mutationFn: () => updateComment(route.attributes.usersComment?.id, comment),
    onSuccess: (data) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      rockRefetch();
      Toast.show({
        type: "success",
        text2: "Komentarz został zaktualizowany",
      });
      setTimeout(() => dismissBottomSheet(), 200);
    },
    onError: (err: AxiosError) => {
      if (err?.response?.status === 406) {
        Toast.show({
          type: "error",
          text2: "Ten komentarz nie spełnia standardów społeczności",
        });
      } else {
        Toast.show({
          type: "error",
          text2: "Coś poszło nie tak",
        });
      }
    },
  });

  const handleRateRoute = (route: Route) => {
    setSelectedRouteToRate(route);
    if (route.attributes.usersRating) {
      setRating(route.attributes.usersRating.score);
    } else {
      setRating(4);
    }
    bottomSheetModalRef.current?.present();
  };

  const handleSendRateButton = () => {
    if (!route.attributes.usersRating) sendRouteRatingMutation();
    if (
      route.attributes.usersRating &&
      rating !== route.attributes.usersRating.score
    )
      updateRouteRatingMutation();
  };

  const handleCommentRoute = (route: Route) => {
    if (route.attributes.usersComment)
      setComment(route.attributes.usersComment.comment);
    setSelectedRouteToRate(route);
    commentsBottomSheetModalRef.current?.present();
  };

  const handleSendCommentButton = () => {
    if (
      route.attributes.usersComment &&
      editingComment &&
      comment.length > 5 &&
      route.attributes.usersComment.comment !== comment
    ) {
      return updateCommentMutation();
    }
    if (route.attributes.usersComment && !editingComment)
      return setEditingComment(true);
    if (
      route.attributes.usersComment &&
      route.attributes.usersComment.comment.toLowerCase() ===
        comment.toLowerCase()
    ) {
      return setEditingComment(false);
    }
    if (comment.length > 5) sendCommentMutation();
  };

  const dismissBottomSheet = () => {
    setSelectedRouteToRate(null);
    setComment("");
    setEditingComment(false);
    bottomSheetModalRef.current?.dismiss();
    commentsBottomSheetModalRef.current?.dismiss();
  };

  const handleAddToFavorites = (favoriteType: FavoriteType) => {
    setRouteAsFavorite(route, favoriteType, parent);
  };

  const snapPoints = useMemo(() => ["40%"], []);
  const commentsSnapPoints = useMemo(() => ["80%"], []);
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
                <View flexBasis={30} marginLeft='s'>
                  <Text variant='h2'>{(realIndex! + 1).toString()}</Text>
                </View>
                <View>
                  <Text variant='body'>{route.attributes.display_name}</Text>
                  <Text variant='body'>
                    {getMeaningfulGrade(route.attributes.grade)}
                  </Text>
                </View>
              </View>
              <View flexDirection='row' gap='m'>
                <View justifyContent='center'>
                  <Text>
                    {isNaN(route.attributes.averageScore)
                      ? "brak ocen"
                      : route.attributes.averageScore.toString()}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setFavoritesModalOpened(true)}>
                  <OverlayCardView
                    padding='xs'
                    backgroundColor='mainBackground'
                  >
                    <HeartIcon fill={getFavoriteColor(favoriteType)} />
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
                      <Text variant='h3'>Przejście 1.:</Text>
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
                  <TouchableOpacity onPress={() => handleRateRoute(route)}>
                    <OverlayCardView
                      width={52}
                      height={52}
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
                  <TouchableOpacity onPress={() => handleCommentRoute(route)}>
                    <OverlayCardView
                      width={52}
                      height={52}
                      justifyContent='center'
                      alignItems='center'
                    >
                      <CommentIcon
                        size={32}
                        color={
                          route.attributes.usersComment
                            ? colors.mainBackground
                            : colors.backgroundBlack
                        }
                        fill={
                          route.attributes.usersComment
                            ? colors.secondary
                            : colors.mainBackground
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
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onDismiss={dismissBottomSheet}
        enableDismissOnClose
        style={styleGuide.bottomSheet}
      >
        <View padding='m' justifyContent='center' alignItems='center' gap='s'>
          <Text variant='h2'>
            {selectedRouteToRate?.attributes.display_name}
          </Text>
          <Text>Twoja ocena</Text>
          <View
            marginTop='m'
            flexDirection='row'
            justifyContent='center'
            alignItems='center'
            columnGap='s'
          >
            {[1, 2, 3, 4, 5].map((item) => (
              <TouchableOpacity onPress={() => setRating(item)} key={item}>
                {item <= rating ? (
                  <StarIcon
                    fill={colors.secondary}
                    color={colors.secondary}
                    size={36}
                  />
                ) : (
                  <StarIcon color={colors.secondary} size={36} />
                )}
              </TouchableOpacity>
            ))}
          </View>
          <Button
            label={route.attributes.usersRating ? "Popraw ocenę" : "Oceń"}
            onClick={handleSendRateButton}
          />
        </View>
      </BottomSheetModal>
      <BottomSheetModal
        ref={commentsBottomSheetModalRef}
        index={0}
        snapPoints={commentsSnapPoints}
        onDismiss={dismissBottomSheet}
        enableDismissOnClose
        style={styleGuide.bottomSheet}
        backdropComponent={Backdrop}
      >
        <BottomSheetScrollView>
          <View padding='m' gap='m'>
            <View alignItems='center'>
              <Text variant='h2'>
                {selectedRouteToRate?.attributes.display_name}
              </Text>
            </View>
            <OverlayCardView backgroundColor='mainBackground'>
              <View borderBottomWidth={0.3} marginBottom='m' paddingBottom='s'>
                <Text variant='special'>Twój komentarz:</Text>
              </View>
              {route.attributes.usersComment && !editingComment ? (
                <View>
                  <Text>{route.attributes.usersComment.comment}</Text>
                </View>
              ) : (
                <TextInput
                  style={$commentInput}
                  defaultValue={comment}
                  onChangeText={(text) => setComment(text)}
                  multiline
                  numberOfLines={2}
                  underlineColorAndroid='transparent'
                />
              )}
              <Button
                label={
                  route.attributes.usersComment && !editingComment
                    ? "Edytuj komentarz"
                    : "Zapisz"
                }
                onClick={handleSendCommentButton}
              />
            </OverlayCardView>
            {Array.isArray(route.attributes.comments) &&
            route.attributes.comments.length >= 1 ? (
              route.attributes.comments.slice(0, 10).map((comment) => (
                <OverlayCardView
                  key={comment.id}
                  backgroundColor='mainBackground'
                >
                  <View gap='m'>
                    <View
                      flexDirection='row'
                      justifyContent='space-between'
                      borderBottomWidth={0.3}
                      paddingBottom='s'
                    >
                      <Text variant='special'>{comment.user}</Text>
                      <Text variant='special'>
                        {dayjs(comment.updatedAt).format("YYYY/MM/DD")}
                      </Text>
                    </View>
                    <Text>{comment.comment}</Text>
                  </View>
                </OverlayCardView>
              ))
            ) : (
              <Text>
                {route.attributes.usersComment
                  ? "Brak innych komentarzy dla tej drogi"
                  : "Brak komentarzy dla tej drogi."}
              </Text>
            )}
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
      <Modal
        isVisible={favoritesModalOpened}
        backdropColor={"rgba(0, 0, 0, 0.8)"}
        onBackdropPress={() => setFavoritesModalOpened(false)}
      >
        <FavoritesModal
          route={route}
          favoriteType={favoriteType}
          onHide={() => setFavoritesModalOpened(false)}
          setAsFavorite={handleAddToFavorites}
        />
      </Modal>
    </>
  );
};

const $commentInput = {
  minHeight: 56,
  lineHeight: 16,
  padding: 12,
  borderWidth: 1,
  borderRadius: 12,
  paddingBottom: 32,
};

export default RouteInfo;
