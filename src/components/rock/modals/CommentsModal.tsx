import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
import { LayoutAnimation } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

import Backdrop from "src/components/common/Backdrop";
import Button from "src/components/common/Button";
import OverlayCardView from "src/components/ui/OverlayCardView";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { useUserProfile } from "src/hooks/useUserProfile";
import { createComment, updateComment } from "src/services/rocks";
import { routeToCommentAtom } from "src/store/rock";
import { styleGuide } from "src/styles/theme";

type RouteCommentsModalProps = {
  rockRefetch: () => void;
};

const CommentsModal = ({ rockRefetch }: RouteCommentsModalProps) => {
  const commentsBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedRouteToComment, setSelectedRouteToComment] =
    useAtom(routeToCommentAtom);
  const [comment, setComment] = useState("");
  const [editingComment, setEditingComment] = useState(false);
  const { data: userData } = useUserProfile();

  useEffect(() => {
    if (selectedRouteToComment) {
      setComment(selectedRouteToComment.attributes.usersComment?.comment || "");
      commentsBottomSheetModalRef.current?.present();
    }
  }, [selectedRouteToComment]);

  const { mutate: sendCommentMutation } = useMutation({
    mutationFn: () =>
      createComment(selectedRouteToComment?.id || -1, comment, userData?.id),
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
    mutationFn: () =>
      updateComment(
        selectedRouteToComment?.attributes.usersComment?.id || -1,
        comment,
      ),
    onSuccess: () => {
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

  const handleSendCommentButton = () => {
    if (
      selectedRouteToComment?.attributes.usersComment &&
      editingComment &&
      comment.length > 5 &&
      selectedRouteToComment.attributes.usersComment.comment !== comment
    ) {
      return updateCommentMutation();
    }
    if (selectedRouteToComment?.attributes.usersComment && !editingComment)
      return setEditingComment(true);
    if (
      selectedRouteToComment?.attributes.usersComment &&
      selectedRouteToComment?.attributes.usersComment.comment.toLowerCase() ===
        comment.toLowerCase()
    ) {
      return setEditingComment(false);
    }
    if (comment.length > 5) sendCommentMutation();
  };

  const dismissBottomSheet = () => {
    setSelectedRouteToComment(null);
    setComment("");
    commentsBottomSheetModalRef.current?.dismiss();
  };

  const commentsSnapPoints = useMemo(() => ["80%"], []);
  return (
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
              {selectedRouteToComment?.attributes.display_name}
            </Text>
          </View>
          <OverlayCardView backgroundColor='backgroundScreen'>
            <View borderBottomWidth={0.3} marginBottom='m' paddingBottom='s'>
              <Text variant='special'>Twój komentarz:</Text>
            </View>
            {selectedRouteToComment?.attributes.usersComment &&
            !editingComment ? (
              <View>
                <Text>
                  {selectedRouteToComment.attributes.usersComment.comment}
                </Text>
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
                selectedRouteToComment?.attributes.usersComment &&
                !editingComment
                  ? "Edytuj komentarz"
                  : "Zapisz"
              }
              onClick={handleSendCommentButton}
            />
          </OverlayCardView>
          {Array.isArray(selectedRouteToComment?.attributes.comments) &&
          selectedRouteToComment?.attributes.comments.length >= 1 ? (
            selectedRouteToComment?.attributes.comments
              .slice(0, 10)
              .map((comment) => (
                <OverlayCardView
                  key={comment.id}
                  backgroundColor='backgroundScreen'
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
              {selectedRouteToComment?.attributes.usersComment
                ? "Brak innych komentarzy dla tej drogi"
                : "Brak komentarzy dla tej drogi."}
            </Text>
          )}
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
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

export default CommentsModal;
