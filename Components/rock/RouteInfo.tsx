import React, { useRef, useMemo, useState } from "react";
import {
  View,
  Text,
  LayoutAnimation,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import Animated from "react-native-reanimated";
import { useAtom } from "jotai";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";

import Accordion from "../common/Accordion";
import Backdrop from "../common/Backdrop";

import {
  Route,
  createRating,
  updateRating,
  createComment,
  updateComment,
} from "../../services/rocks";
import { rockActiveRoute } from "../../store/rock";
import { getMeaningfulGrade } from "../../utils/language/getMeaningfulGrade";
import { styleGuide } from "../../styles/guide";
import { useMutation } from "@tanstack/react-query";
import { useUserProfile } from "../../hooks/useUserProfile";
import { AxiosError } from "axios";
import { getRingsConjugation } from "../../utils/language/getRingsConjugation";
import { getAnchorName } from "../../utils/language/getAnchorName";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

type RockInfoProps = {
  route: Route;
  index: number;
  realIndex?: number;
  rockRefetch: () => void;
};

const RouteInfo = ({ route, index, realIndex, rockRefetch }: RockInfoProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const commentsBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [activeRoute, setActiveRoute] = useAtom(rockActiveRoute);
  const [selectedRouteToRate, setSelectedRouteToRate] = useState<Route | null>(
    null,
  );
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");
  const [editingComment, setEditingComment] = useState(false);
  const { data: userData } = useUserProfile();

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (activeRoute === route.attributes.uuid) return setActiveRoute(null);
    setActiveRoute(route.attributes.uuid);
  };

  const { mutate: sendRouteRatingMutation, isLoading } = useMutation({
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
    onSuccess: (data) => {
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
          type: "success",
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
    if (route.attributes.usersComment && editingComment && comment.length > 5) {
      return updateCommentMutation();
    }
    if (route.attributes.usersComment && !editingComment)
      return setEditingComment(true);
    if (comment.length > 5) sendCommentMutation();
  };

  const dismissBottomSheet = () => {
    setSelectedRouteToRate(null);
    setComment("");
    setEditingComment(false);
    bottomSheetModalRef.current?.dismiss();
    commentsBottomSheetModalRef.current?.dismiss();
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
            <View style={styles.container}>
              <View style={styles.nameContainer}>
                <View style={styles.routeIndexContainer}>
                  <Text style={styles.routeIndex}>{realIndex! + 1}</Text>
                </View>
                <View>
                  <Text>{route.attributes.display_name}</Text>
                  <Text>{getMeaningfulGrade(route.attributes.grade)}</Text>
                </View>
              </View>
              <View>
                <Text>
                  {isNaN(route.attributes.averageScore)
                    ? "brak ocen"
                    : route.attributes.averageScore}
                </Text>
              </View>
            </View>
          }
          Content={
            route.attributes.uuid === activeRoute && (
              <View style={styles.detailsContainer}>
                <View>
                  <Text>
                    {route.attributes.rings_number}{" "}
                    {getRingsConjugation(route.attributes.rings_number)}
                  </Text>
                  <Text>{getAnchorName(route.attributes.anchor)}</Text>
                  {route.attributes.description && (
                    <Text>{route.attributes.description}</Text>
                  )}
                  {route.attributes.author && (
                    <Text>
                      Autor: {route.attributes.author},{" "}
                      {route.attributes.author_date}
                    </Text>
                  )}
                  {route.attributes.first_ascent_author && (
                    <Text>
                      1. przejście:
                      {route.attributes.first_ascent_author}
                    </Text>
                  )}
                </View>
                <View style={styles.detailsButtons}>
                  <TouchableOpacity onPress={() => handleRateRoute(route)}>
                    <Text>
                      {route.attributes.usersRating
                        ? `Twoja ocena: ${route.attributes.usersRating.score}`
                        : "Oceń drogę"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleCommentRoute(route)}>
                    <Text>Komentarze</Text>
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
        style={styles.modalContainer}
      >
        <Text>Twoja ocena dla drogi</Text>
        <Text>{selectedRouteToRate?.attributes.display_name}</Text>
        <View style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map((item) => (
            <TouchableOpacity onPress={() => setRating(item)}>
              <View style={item <= rating ? styles.starFilled : styles.star} />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={handleSendRateButton}>
          <View style={styles.sendRatingButton}>
            <Text>
              {route.attributes.usersRating ? "Popraw ocenę" : "Oceń"}
            </Text>
          </View>
        </TouchableOpacity>
      </BottomSheetModal>
      <BottomSheetModal
        ref={commentsBottomSheetModalRef}
        index={0}
        snapPoints={commentsSnapPoints}
        onDismiss={dismissBottomSheet}
        enableDismissOnClose
        style={styles.modalCommentsContainer}
        backdropComponent={Backdrop}
      >
        <BottomSheetScrollView style={styles.commentsContainer}>
          <Text>
            Komentarze dla drogi:
            {selectedRouteToRate?.attributes.display_name}
          </Text>
          <Text>Twój komentarz:</Text>
          {route.attributes.usersComment && !editingComment ? (
            <View>
              <Text>{route.attributes.usersComment.comment}</Text>
            </View>
          ) : (
            <TextInput
              style={styles.commentInput}
              defaultValue={comment}
              onChangeText={(text) => setComment(text)}
              multiline
              numberOfLines={2}
              underlineColorAndroid='transparent'
            />
          )}
          <TouchableOpacity onPress={handleSendCommentButton}>
            <View style={styles.sendCommentButton}>
              <Text>
                {route.attributes.usersComment && !editingComment
                  ? "Edytuj komentarz"
                  : "Zapisz"}
              </Text>
            </View>
          </TouchableOpacity>
          {Array.isArray(route.attributes.comments) &&
          route.attributes.comments.length >= 1 ? (
            route.attributes.comments.slice(0, 10).map((comment) => (
              <View>
                <Text>
                  {comment.updatedAt} - {comment.user} - {comment.comment}
                </Text>
              </View>
            ))
          ) : (
            <Text>
              {route.attributes.usersComment
                ? "Brak innych komentarzy dla tej drogi"
                : "Brak komentarzy dla tej drogi."}
            </Text>
          )}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  routeIndexContainer: {
    flexBasis: 30,
  },
  routeIndex: {
    ...styleGuide.text.heading["2"],
  },
  icon: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 50,
  },
  gradeContainer: {
    flexBasis: 44,
    borderRightWidth: 1,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsButtons: {
    display: "flex",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  ratingContainer: {},
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  starContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 4,
  },
  star: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
  },
  starFilled: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: "yellow",
  },
  starsButton: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modalCommentsContainer: {
    width: "100%",
    flex: 1,
    alignContent: "stretch",
    justifyContent: "center",
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 6,
    zIndex: 6,
    paddingHorizontal: 12,
  },
  commentsContainer: {
    width: "100%",
    flex: 1,
    elevation: 5,
    paddingHorizontal: 12,
  },
  commentInput: {
    minHeight: 56,
    lineHeight: 16,
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    paddingBottom: 32,
  },
  sendRatingButton: {
    marginRight: 16,
    alignSelf: "flex-end",
  },
  sendCommentButton: {
    marginRight: 16,
    alignSelf: "flex-end",
  },
});

export default RouteInfo;
