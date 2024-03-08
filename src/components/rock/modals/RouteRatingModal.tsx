import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useTheme } from "@shopify/restyle";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from "react-native-toast-message";

import Button from "src/components/common/Button";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import Backdrop from "src/components/common/Backdrop";
import { StarIcon } from "src/components/icons/Star";
import { useUserProfile } from "src/hooks/useUserProfile";
import { createRating, updateRating } from "src/services/rocks";
import { selectedRouteToRateAtom } from "src/store/rock";
import { Theme, styleGuide } from "src/styles/theme";

type RouteRatingModalProps = {
  rockRefetch: () => void;
};

const RouteRatingModal = ({ rockRefetch }: RouteRatingModalProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedRouteToRate, setSelectedRouteToRate] = useAtom(
    selectedRouteToRateAtom,
  );
  const [rating, setRating] = useState(3);
  const { data: userData } = useUserProfile();
  const { colors } = useTheme<Theme>();

  useEffect(() => {
    if (selectedRouteToRate) {
      bottomSheetModalRef.current?.present();
    }
  }, [selectedRouteToRate]);

  const dismissBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
    setSelectedRouteToRate(null);
  };

  const { mutate: sendRouteRatingMutation, isPending: sendRatingIsLoading } =
    useMutation({
      mutationFn: () =>
        createRating(selectedRouteToRate!.id, rating, userData?.id),
      onSuccess: () => {
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
    mutationFn: () =>
      updateRating(
        selectedRouteToRate?.attributes.usersRating.id || -1,
        rating,
      ),
    onSuccess: () => {
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

  const handleSendRateButton = () => {
    if (!selectedRouteToRate?.attributes.usersRating) sendRouteRatingMutation();
    if (
      selectedRouteToRate?.attributes.usersRating &&
      rating !== selectedRouteToRate?.attributes.usersRating.score
    )
      updateRouteRatingMutation();
  };

  const snapPoints = useMemo(() => ["40%"], []);
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      onDismiss={dismissBottomSheet}
      enableDismissOnClose
      style={styleGuide.bottomSheet}
      backdropComponent={Backdrop}
    >
      <View padding='m' justifyContent='center' alignItems='center' gap='s'>
        <Text variant='h2'>{selectedRouteToRate?.attributes.display_name}</Text>
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
          label={
            selectedRouteToRate?.attributes.usersRating
              ? "Popraw ocenę"
              : "Oceń"
          }
          onClick={handleSendRateButton}
        />
      </View>
    </BottomSheetModal>
  );
};

export default RouteRatingModal;
