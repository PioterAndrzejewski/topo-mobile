import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAtom } from "jotai";
import { useMemo, useRef, useState } from "react";

import AppLoading from "src/components/common/AppLoading";
import Header from "src/components/rock/Header";
import RockDetails from "src/components/rock/RockDetails";
import RouteInfo from "src/components/rock/RouteInfo";
import Buttons from "src/components/rock/drawing/Buttons";
import RockDrawing from "src/components/rock/drawing/RockDrawing";
import FavoritesModal from "src/components/rock/modals/FavoritesModal";
import View from "src/components/ui/View";

import { RoutesParent } from "src/components/common/ResultsItem/ResultsItemRoute";
import CommentsModal from "src/components/rock/modals/CommentsModal";
import RouteRatingModal from "src/components/rock/modals/RouteRatingModal";
import { useRock } from "src/hooks/useRock";
import { Route } from "src/services/rocks";
import { rockActiveRoute } from "src/store/rock";
import { styleGuide } from "src/styles/guide";
import { HomeScreenNavigationProp } from "src/types/type";

type Props = NativeStackScreenProps<HomeScreenNavigationProp, "Rock">;

const Rock = ({ route }: Props) => {
  const [activeRoute, setActiveRoute] = useAtom(rockActiveRoute);
  const [activeImage, setActiveImage] = useState(0);
  const { data, refetch } = useRock(route.params.id);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleImageChange = (step: number) => {
    if (!data) return;
    let newIndex = activeImage + step;
    if (newIndex < 0) newIndex = data.attributes.image.data.length - 1;
    if (newIndex === data.attributes.image.data.length) newIndex = 0;
    setActiveImage(newIndex);
  };

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

  const snapPoints = useMemo(() => ["15%", "30", "50%", "80%"], []);

  return (
    <View paddingTop='xl' flex={1}>
      <Header
        name={data?.attributes?.Name}
        numberOfImages={data?.attributes?.image.data.length}
        onCirclePress={setActiveImage}
        activeImage={activeImage}
      />
      {data && data.attributes && (
        <RockDrawing
          imageUrl={data.attributes.image?.data[activeImage].attributes.url}
          routes={data.attributes.routes.data}
          activeId={activeRoute}
          activeImage={activeImage}
        />
      )}
      <Buttons handleRouteChange={handleImageChange} />
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        containerStyle={$bottomSheetContainer}
        style={styleGuide.bottomSheet}
      >
        <BottomSheetScrollView scrollEnabled>
          <View paddingHorizontal='m' paddingBottom='2xl' paddingTop='m'>
            {data?.attributes ? (
              <>
                <RockDetails id={data?.attributes.uuid} />
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
    </View>
  );
};

export default Rock;

const $bottomSheetContainer = {
  zIndex: 24,
  shadowOffset: { width: 0, height: -20 },
  shadowRadius: 0,
  shadowColor: "#000",
  shadowOpacity: 0,
  elevation: 24,
};
