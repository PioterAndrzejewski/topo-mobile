import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { useAtomValue } from "jotai";
import { FC, useMemo } from "react";
import { ImageBackground } from "react-native";

import OverlayCardView from "src/components/ui/OverlayCardView";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { useAreas } from "src/hooks/useAreas";
import { useImageFile } from "src/hooks/useImageFile";
import { AreaData } from "src/services/rocks";
import { mapAtom } from "src/store/results";
import { styleGuide } from "src/styles/theme";
import { HomeScreenNavigationProp } from "src/types/type";
import { getRegionForZoom } from "src/utils/getRegionForZoom";
import { getZoomFromStage } from "src/utils/getZoomFromStage";

type ListResultProps = {
  id: string;
  name: string;
  item: AreaData;
  isLast?: boolean;
};

const AreaResultsItem: FC<ListResultProps> = ({ id, name, item, isLast }) => {
  const map = useAtomValue(mapAtom);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const image = useImageFile(
    item?.attributes?.Cover?.Photo?.data?.attributes.url || "",
  );
  const { regions, sectors, rocks } = useAreas();

  const regionsThatBelong = useMemo(() => {
    const theRegions = regions?.filter(
      (region) => region.attributes.parent.data?.id === item.id,
    );
    return theRegions;
  }, [regions, item]);

  const sectorsThatBelong = useMemo(() => {
    const regionList = regionsThatBelong?.map((region) => region.id);
    return sectors?.filter((sector) => {
      if (!sector.attributes.parent.data?.id) return false;
      return regionList?.includes(sector.attributes.parent.data?.id);
    });
  }, [regions, item, sectors]);

  const rocksThatBelong = useMemo(() => {
    const sectorList = sectorsThatBelong?.map((sector) => sector.id);
    return rocks?.filter((rock) => {
      return sectorList?.includes(rock.attributes.parent.data.id);
    });
  }, [regions, item, sectors, rocks]);

  const lastUpdated = useMemo(
    () =>
      rocksThatBelong?.reduce((lastUpdate, rock) => {
        const rockUpdated = dayjs(rock.attributes.updatedAt);
        if (rockUpdated.isAfter(lastUpdate)) return rockUpdated;
        return lastUpdate;
      }, dayjs("1970-01-01T16:27:36.084Z")),
    [rocksThatBelong],
  );

  const animateTo = (item: AreaData, stage: number) => {
    if (!item) return;
    navigation.navigate("Map");
    const newRegion = getRegionForZoom(
      item.attributes.coordinates.latitude,
      item.attributes.coordinates.longitude,
      getZoomFromStage(stage),
    );
    setTimeout(() => {
      if (map && map.current) {
        map.current.animateToRegion(newRegion);
      }
    }, 100);
  };

  const handlePress = () => {
    animateTo(item, 1);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ paddingHorizontal: 24, paddingVertical: 12 }}>
      <View {...styleGuide.cardShadow} borderRadius={24}>
        {image && (
          <>
            <ImageBackground
              source={{
                uri: image || "",
              }}
              resizeMode='cover'
              imageStyle={{
                height: 200,
                borderTopRightRadius: 24,
                borderTopLeftRadius: 24,
              }}
            />
            <OverlayCardView
              alignSelf='flex-end'
              backgroundColor='backgroundLight'
              top={130}
              right={10}
            >
              <Text variant='caption'>{`zdj: ${item.attributes.Cover.Author}`}</Text>
            </OverlayCardView>
          </>
        )}
        <View
          marginTop={image ? "6xl" : "m"}
          paddingHorizontal='m'
          paddingVertical='l'
          gap='xs'
          borderRadius={24}
          backgroundColor='backgroundScreen'
          zIndex={20}
        >
          <View marginBottom='m'>
            <Text variant='bodyMedium'>Obszar</Text>
            <Text variant='h2'>{name}</Text>
          </View>
          <View flexDirection='row' justifyContent='space-between'>
            <Text variant='bodyMedium' color='textSecondary'>
              Liczba dostępnych regionów:
            </Text>
            <Text variant='body' color='textBlack'>
              {regionsThatBelong?.length}
            </Text>
          </View>
          <View flexDirection='row' justifyContent='space-between'>
            <Text variant='bodyMedium' color='textSecondary'>
              Liczba dostępnych sektorów
            </Text>
            <Text variant='body' color='textBlack'>
              {sectorsThatBelong?.length}
            </Text>
          </View>
          <View flexDirection='row' justifyContent='space-between'>
            <Text variant='bodyMedium' color='textSecondary'>
              Liczba dostępnych skał
            </Text>
            <Text variant='body' color='textBlack'>
              {rocksThatBelong?.length}
            </Text>
          </View>
          <View
            marginBottom='m'
            flexDirection='row'
            justifyContent='space-between'
          >
            <Text variant='bodyMedium' color='textSecondary'>
              Ostatnio edytowany:
            </Text>
            <Text variant='body' color='textBlack'>
              {lastUpdated?.format("YYYY-MM-DD")}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AreaResultsItem;
