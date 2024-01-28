import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAtom } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import AppLoading from "src/components/common/AppLoading";
import Header from "src/components/rock/Header";
import RockDetails from "src/components/rock/RockDetails";
import RouteInfo from "src/components/rock/RouteInfo";
import RockDrawing from "src/components/rock/drawing/RockDrawing";
import CommentsModal from "src/components/rock/modals/CommentsModal";
import FavoritesModal from "src/components/rock/modals/FavoritesModal";
import RouteRatingModal from "src/components/rock/modals/RouteRatingModal";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { RoutesParent } from "src/components/common/ResultsItem/ResultsItemRoute";
import { useRock } from "src/hooks/useRock";
import { Route } from "src/services/rocks";
import { rockActiveRoute } from "src/store/rock";
import { palette, styleGuide } from "src/styles/theme";
import { HomeScreenNavigationProp } from "src/types/type";

type Props = NativeStackScreenProps<HomeScreenNavigationProp, "Rock">;

const Rock = ({ route }: Props) => {
  const [activeRoute, setActiveRoute] = useAtom(rockActiveRoute);
  const [activeImage, setActiveImage] = useState(0);
  const { data, refetch } = useRock(route.params.id);
  const bottomSheetRef = useRef<BottomSheet>(null);

  refetch();

  const selectedRoute = useMemo(() => {
    if (!activeRoute) return null;
    return data?.attributes.routes.data.find(
      (route) => route.attributes.uuid === activeRoute,
    );
  }, [activeRoute]);

  useEffect(() => {
    if (selectedRoute?.attributes.image_index !== activeImage) {
      setActiveRoute(null);
    }
  }, [activeImage]);

  useEffect(() => {
    if (!selectedRoute) return;
    if (selectedRoute?.attributes.image_index !== activeImage) {
      setActiveImage(selectedRoute.attributes.image_index);
    }
  }, [selectedRoute]);

  const parent: RoutesParent = useMemo(() => {
    return {
      name: data?.attributes?.Name || "",
      coordinates: data?.attributes?.coordinates || {
        id: 0,
        latitude: 0,
        longitude: 0,
      },
      id: data?.attributes?.uuid || "",
    };
  }, [data]);

  const snapPoints = useMemo(() => ["16%", "50%", "80%"], []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.blue100_25 }}>
      <Header
        name={data?.attributes?.Name}
        numberOfImages={data?.attributes?.image.length}
        onCirclePress={setActiveImage}
        activeImage={activeImage}
      />
      {data &&
        data.attributes &&
        data.attributes.image &&
        data.attributes.image.length > 0 ? (
          <RockDrawing
            imageUrl={
              data.attributes.image[activeImage].image.data.attributes.url
            }
            routes={data.attributes.routes.data}
            activeId={activeRoute}
            activeImage={activeImage}
            elementsScale={data.attributes.image[activeImage].elements_scale}
          />
        ) : <Text>Wystąpił błąd podczas wczytywania obrazów</Text>}
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        style={styleGuide.bottomSheet}
      >
        <BottomSheetScrollView showsVerticalScrollIndicator={false}>
          <View paddingBottom='2xl' paddingTop='m'>
            {data?.attributes ? (
              <>
                <RockDetails id={data?.attributes.uuid} />
                <View paddingHorizontal='m'>
                  <View marginBottom='m'>
                    <Text variant='h3'>Drogi:</Text>
                  </View>
                  {data?.attributes?.routes.data.map((route) => (
                    <RouteInfo
                      key={route.attributes.uuid}
                      route={route}
                      realIndex={data?.attributes?.routes.data.findIndex(
                        (dataRoute: Route) =>
                          route.attributes.uuid === dataRoute.attributes.uuid,
                      )}
                      rockRefetch={refetch}
                      parent={parent}
                    />
                  ))}
                </View>
              </>
            ) : (
              <AppLoading />
            )}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
      <FavoritesModal />
      <RouteRatingModal rockRefetch={refetch} />
      <CommentsModal rockRefetch={refetch} />
    </SafeAreaView>
  );
};

export default Rock;
