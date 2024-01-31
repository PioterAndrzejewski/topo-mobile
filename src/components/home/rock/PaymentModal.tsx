import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";

import Button from "src/components/common/Button";
import SectorProduct from "src/components/home/rock//products/SectorProduct";
import SubscriptionProduct from "src/components/home/rock/products/SubscriptionProduct";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAreas } from "src/hooks/useAreas";
import {
  confirmPayment,
  getPaymentIntent,
  useProduct,
  useSubscriptionProduct,
} from "src/services/payments";
import { queryKeys } from "src/services/queryKeys";
import { RockData } from "src/services/rocks";
import { selectedRockAtom } from "src/store/results";
import { palette } from "src/styles/theme";

type PaymentModalProps = {
  opened: boolean;
  onClose: () => void;
};

const PaymentModal = ({ opened, onClose }: PaymentModalProps) => {
  const selectedRock = useAtomValue(selectedRockAtom);
  const [isProcessing, setIsProcessing] = useState(false);
  const { rocks } = useAreas();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const rock = useMemo(
    () =>
      rocks?.find((rock: RockData) => rock.attributes.uuid === selectedRock),
    [selectedRock],
  );
  const { data: subscription } = useSubscriptionProduct();
  const { data: product } = useProduct(
    rock?.attributes.product.data?.attributes.uuid || "",
    !!rock,
  );
  const { mutate: confirmProductPaymentMutation } = useMutation({
    mutationFn: ({
      productId,
      intentId,
    }: {
      productId: string | number;
      intentId: string;
    }) => confirmPayment(productId, intentId),
    retryDelay: 5000,
    retry: true,
    onSuccess: () => {
      queryClient.refetchQueries(queryKeys.products);
      queryClient.refetchQueries(queryKeys.profile.me);
    },
  });

  const initialisePaymentSheet = async (
    productId: string,
    item: "product" | "subscription",
  ) => {
    if (!selectedRock) return setIsProcessing(false);

    const { data: intentData } = await getPaymentIntent(
      item === "subscription" ? "subscription" : productId,
    );

    const { error: initPaymentError } = await initPaymentSheet({
      customerId: intentData.data.customer,
      customerEphemeralKeySecret: intentData.data.ephemeralKey.secret,
      paymentIntentClientSecret:
        intentData.data.paymentIntent.client_secret || "",
      merchantDisplayName: "WspinApp",
      allowsDelayedPaymentMethods: false,
    });

    if (initPaymentError) {
      onClose();
      setIsProcessing(false);
      return Toast.show({
        type: "error",
        text2: "Coś poszło nie tak podczas przygotowywania płatności",
      });
    }

    const { error } = await presentPaymentSheet();

    if (error) {
      onClose();
      setIsProcessing(false);
      return Toast.show({
        type: "error",
        text2: "Coś poszło nie tak podczas wykonywania płatności",
      });
    }
    try {
      if (!rock?.attributes.product.data) return;
      await confirmProductPaymentMutation({
        productId:
          item === "subscription"
            ? "subscription"
            : rock?.attributes.product.data?.id,
        intentId: intentData.data.paymentIntent.id,
      });
    } catch (e) {
      onClose();
      Toast.show({
        type: "error",
        text2:
          "Coś poszło nie tak podczas potwierdzania Twojej płatności. Spróbuj ponownie lub prosimy o kontakt - help@wsinapp.pl",
        visibilityTime: 3000,
      });
    }
    queryClient.invalidateQueries(["user-profile"]);
    onClose();
    Toast.show({
      type: "success",
      text2: "Płatność poprawna!",
    });
    setIsProcessing(false);
  };

  const handleBuy = async (
    productId: string | undefined,
    item: "product" | "subscription",
  ) => {
    if (isProcessing || !productId) {
      return;
    }
    setIsProcessing(true);
    initialisePaymentSheet(productId, item);
  };

  return (
    <Modal
      isVisible={opened}
      onDismiss={onClose}
      onBackdropPress={onClose}
      animationIn='slideInDown'
      animationOut='slideOutDown'
      animationInTiming={0}
      animationOutTiming={0}
      onBackButtonPress={onClose}
      style={{ marginTop: insets.top + 40, marginBottom: insets.bottom + 40 }}
    >
      <View
        backgroundColor='backgroundScreen'
        borderRadius={24}
        paddingVertical='l'
        paddingHorizontal='m'
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View gap='l' marginBottom='l'>
            <Text variant='h2'>
              {!!product
                ? "Uzyskaj dostęp do tych materiałów!"
                : "Wykup subskrypcję i ciesz się pełnym dostępem"}
            </Text>
            <TouchableOpacity
              onPress={() => handleBuy(subscription?.uuid, "subscription")}
              disabled={isProcessing}
            >
              {subscription && <SubscriptionProduct isLoading={isProcessing} />}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                handleBuy(
                  rock?.attributes.product.data?.attributes.uuid,
                  "product",
                )
              }
              disabled={isProcessing}
            >
              {product && (
                <SectorProduct
                  product={product.attributes}
                  isLoading={isProcessing}
                />
              )}
            </TouchableOpacity>
          </View>
          <Button
            label='Innym razem'
            onClick={onClose}
            containerStyles={$buttonStyle}
            labelColor='textSecondary'
            isLoading={isProcessing}
            disabled={isProcessing}
          />
        </ScrollView>
      </View>
      <Toast />
    </Modal>
  );
};

const $buttonStyle = {
  backgroundColor: palette.white,
  borderColor: palette.green,
  borderWidth: 1,
  borderRadius: 12,
} satisfies ViewStyle;

export default PaymentModal;
