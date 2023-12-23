import Animated from "react-native-reanimated";

import ResultsItem from "src/components/common/ResultsItem/ResultsItem";
import ResultsItemRoute from "src/components/common/ResultsItem/ResultsItemRoute";
import RockResultsItem from "src/components/common/ResultsItem/RockResultsItem";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { useMemo } from "react";
import { RouteWithParent } from "src/components/common/ResultsItem/ResultsItemRoute";
import { RegionData, RockData } from "src/services/rocks";

type ResultsProps = {
  type: "routes" | "rocks" | "sectors";
  foundRoutes: RouteWithParent[];
  foundRocks: RockData[];
  foundSectors: RegionData[];
};

const RESULTS_LENGTH = 5;

const Results = ({
  type,
  foundRoutes,
  foundRocks,
  foundSectors,
}: ResultsProps) => {
  const renderResults = () => {
    switch (type) {
      case "routes":
        return (
          <Animated.FlatList
            scrollEnabled={false}
            data={foundRoutes.slice(0, RESULTS_LENGTH)}
            renderItem={({ item }) => (
              <ResultsItemRoute
                name={item.attributes.display_name}
                item={item}
                isRock
                id={item.attributes.uuid}
                key={item.attributes.uuid}
              />
            )}
          />
        );
      case "rocks":
        return (
          <Animated.FlatList
            scrollEnabled={false}
            data={foundRocks.slice(0, RESULTS_LENGTH)}
            renderItem={({ item }) => (
              <RockResultsItem
                name={item.attributes.Name}
                item={item}
                id={item.attributes.uuid}
                key={item.attributes.uuid}
              />
            )}
          />
        );
      case "sectors":
        return (
          <Animated.FlatList
            data={foundSectors.slice(0, RESULTS_LENGTH)}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <ResultsItem
                name={item.attributes.Name}
                item={item}
                id={item.attributes.uuid}
                key={item.attributes.uuid}
              />
            )}
          />
        );
    }
  };

  const results = useMemo(() => {
    switch (type) {
      case "routes":
        return foundRoutes;
      case "rocks":
        return foundRocks;
      case "sectors":
        return foundSectors;
    }
  }, [type]);

  return (
    <View paddingHorizontal='m' paddingTop='m'>
      <View flexDirection='row' gap='s' marginBottom='s'>
        <Text variant='h3'>Wyników: </Text>
        <Text
          variant='h3'
          color='textSecondary'
        >{`${results.length.toString()}`}</Text>
      </View>
      {results.length > 0 && renderResults()}
      {results.length > RESULTS_LENGTH && (
        <View>
          <Text variant='caption'>
            {`Mamy tego więcej - lista wyświetla tylko ${RESULTS_LENGTH.toString()} pierwszych wyników`}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Results;
