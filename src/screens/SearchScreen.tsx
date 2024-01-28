import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Results from "src/components/Search/Results";
import ScreenTitle from "src/components/common/ScreenTitle";
import FilterBar from "src/components/home/FilterBar";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { RouteWithParent } from "src/components/common/ResultsItem/ResultsItemRoute";
import Switcher from "src/components/common/Switcher";
import { useAreas } from "src/hooks/useAreas";
import { RegionData, RockData } from "src/services/rocks";
import { searchTextAtom } from "src/store/search";
import { palette } from "src/styles/theme";

const searchForRoutes = (rocks: RockData[], searchText: string) => {
  let routesFound: RouteWithParent[] = [];
  rocks.forEach((rock) => {
    const routesInRock = rock.attributes.routes.data.filter((route) => {
      return route.attributes.display_name.toLowerCase().includes(searchText);
    });
    const routesInRockWithParent: RouteWithParent[] = routesInRock.map(
      (route) => ({
        ...route,
        parent: {
          name: rock.attributes.Name,
          coordinates: rock.attributes.coordinates,
          id: rock.attributes.uuid,
        },
      }),
    );
    routesFound = [...routesFound, ...routesInRockWithParent];
  });
  return routesFound;
};

export default function SearchScreen() {
  const { areas, regions, sectors, rocks } = useAreas();
  const [activeResults, setActiveResults] = useState<
    "routes" | "rocks" | "sectors"
  >("routes");
  const [foundRoutes, setFoundRoutes] = useState<RouteWithParent[]>([]);
  const [foundSectors, setFoundSectors] = useState<RegionData[]>([]);
  const [foundRocks, setFoundRocks] = useState<RockData[]>([]);
  const searchText = useAtomValue(searchTextAtom);

  useEffect(() => {
    if (searchText.length < 1) {
      setFoundRocks([]);
      setFoundRoutes([]);
      setFoundSectors([]);
    }
    setFoundSectors(
      sectors?.filter((sector) =>
        sector.attributes.Name.toLowerCase().includes(searchText),
      ) || [],
    );
    setFoundRocks(
      rocks?.filter((rock) =>
        rock.attributes.Name.toLowerCase().includes(searchText),
      ) || [],
    );
    if (rocks) setFoundRoutes(searchForRoutes(rocks, searchText));
  }, [searchText, areas, regions, sectors, rocks]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: palette.white }}
      edges={["top"]}
    >
      <ScreenTitle title='Wyszukiwarka' centered />
      <FilterBar />
      {searchText.length > 0 && (
        <View marginHorizontal='m' marginTop='m'>
          <Switcher
            options={[
              { label: "Drogi", value: "routes" },
              { label: "Skały", value: "rocks" },
              { label: "Sektory", value: "sectors" },
            ]}
            active={activeResults}
            onPress={setActiveResults}
          />
        </View>
      )}

      {searchText === "" || !searchText ? (
        <View paddingHorizontal='m' paddingTop='m'>
          <Text>Czego szukasz?</Text>
        </View>
      ) : (
        <Results
          foundRoutes={foundRoutes}
          foundRocks={foundRocks}
          foundSectors={foundSectors}
          type={activeResults}
        />
      )}
    </SafeAreaView>
  );
}
