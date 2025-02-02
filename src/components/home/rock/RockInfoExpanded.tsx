import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";

import Button from "src/components/common/Button";
import RouteStructure from "src/components/common/RouteStructure";
import PaymentModal from "src/components/home/rock/PaymentModal";
import RockGallery from "src/components/home/rock/RockGallery";
import InformationRow from "src/components/rock/details/InformationRow";
import OverlayCardView from "src/components/ui/OverlayCardView";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { useWindowDimensions } from "react-native";
import { CartIcon } from "src/components/icons/Cart";
import { GiftIcon } from "src/components/icons/Gift";
import { useAreas } from "src/hooks/useAreas";
import { useUserSubscription } from "src/hooks/useUserSubscription";
import { useUserProducts } from "src/services/payments";
import { RockData } from "src/services/rocks";
import { saveLastSeenRock } from "src/services/storeAsync";
import { selectedRockAtom } from "src/store/results";
import { palette } from "src/styles/theme";
import { HomeScreenNavigationProp } from "src/types/type";
import { getRoutesFromRock } from "src/utils/getRoutesFromRock";

const RockInfoExpanded = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedRock, setSelectedRock] = useAtom(selectedRockAtom);
  const [paymentModalOpened, setPaymentModalOpened] = useState(false);
  const { rocks } = useAreas();
  const { width } = useWindowDimensions();
  const { data: userProducts } = useUserProducts();
  const hasSubscription = useUserSubscription();

  const scrollY = useSharedValue(0);

  const rock = useMemo(() => {
    if (!rocks) return null;
    const foundRock = rocks?.find(
      (rock: RockData) => rock.attributes.uuid === selectedRock,
    );
    return foundRock;
  }, [selectedRock, rocks]);

  useEffect(() => {
    if (selectedRock && rock) {
      saveLastSeenRock(rock);
    }
  }, [rock, selectedRock]);

  const routes = useMemo(() => rock && getRoutesFromRock(rock), [rock]);

  const userHasBoughtThisProduct = useMemo(() => {
    if (hasSubscription || !rock?.attributes.product.data) {
      return true;
    }
    if (!userProducts || !userProducts.length || userProducts.length < 1) {
      return false;
    }
    return !!userProducts?.find(
      (product) =>
        product.product.uuid === rock?.attributes.product.data?.attributes.uuid,
    );
  }, [userProducts, rock, hasSubscription]);

  const handleOpenRock = () => {
    navigation.navigate("Rock", {
      id: selectedRock,
    });
    setSelectedRock(null);
  };

  if (!rock) {
    return (
      <View>
        <Text>Coś poszło nie tak</Text>
      </View>
    );
  }

  return (
    <View height='100%'>
      <View>
        <View
          paddingHorizontal='m'
          paddingBottom='m'
          flexDirection='row'
          paddingTop='s'
          justifyContent='space-between'
          flexShrink={1}
        >
          <View maxWidth={width - 80}>
            <Text variant='h2' color='textBlack'>
              {rock?.attributes.Name}
            </Text>
            {rock.attributes.parent.data && (
              <View
                flexDirection='row'
                gap='s'
                maxWidth={width - 80}
                flexWrap='wrap'
              >
                <Text variant='h4'>w sektorze:</Text>
                <Text variant='h4' color='textSecondary'>
                  {rock.attributes.parent.data.attributes.Name}
                </Text>
              </View>
            )}
          </View>
          {rock?.attributes.product.data && !userHasBoughtThisProduct && (
            <OverlayCardView
              justifyContent='center'
              alignItems='center'
              width={50}
            >
              <TouchableOpacity onPress={() => setPaymentModalOpened(true)}>
                <CartIcon size={28} color={palette.green} strokeWidth={1.5} />
              </TouchableOpacity>
            </OverlayCardView>
          )}
        </View>
      </View>
      <FlatList
        data={[0]}
        renderItem={() => (
          <View>
            {!rock?.attributes.product.data && (
              <View
                marginHorizontal='m'
                flexDirection='row'
                alignItems='center'
                gap='m'
                marginVertical='s'
                backgroundColor='backgroundTertiary'
                justifyContent='center'
                paddingVertical='s'
                borderRadius={24}
              >
                <GiftIcon size={28} color={palette.green} />
                <Text>{"Tę skałę udostępniamy za darmo :)"}</Text>
              </View>
            )}
            <View marginBottom='m'>
              {rock && <InformationRow rock={rock} />}
            </View>
            {routes && <RouteStructure routes={routes} inCard={false} />}
            {rock?.attributes && rock?.attributes.cover.length > 0 && (
              <>
                <RockGallery images={rock?.attributes.cover} />
              </>
            )}
          </View>
        )}
      />
      <View marginBottom='l' marginHorizontal='m' paddingTop='m'>
        <Button
          label={
            !!rock?.attributes.product.data && !userHasBoughtThisProduct
              ? "Wykup dostęp"
              : "Otwórz skałoplan"
          }
          onClick={
            !!rock?.attributes.product.data && !userHasBoughtThisProduct
              ? () => setPaymentModalOpened(true)
              : handleOpenRock
          }
        />
      </View>
      {paymentModalOpened && (
        <PaymentModal
          opened={paymentModalOpened}
          onClose={() => setPaymentModalOpened(false)}
        />
      )}
    </View>
  );
};

export default RockInfoExpanded;
