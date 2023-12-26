import { FlashList } from "@shopify/flash-list";

import ResultsItem from "src/components/common/ResultsItem/ResultsItem";
import ResultsItemRoute from "src/components/common/ResultsItem/ResultsItemRoute";
import RockResultsItem from "src/components/common/ResultsItem/RockResultsItem";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

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
          <FlashList
            data={foundRoutes.slice(0, RESULTS_LENGTH)}
            estimatedItemSize={70}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View
                paddingHorizontal='m'
                paddingTop={index === 0 ? "m" : undefined}
              >
                <ResultsItemRoute
                  name={item.attributes.display_name}
                  item={item}
                  isRock
                  id={item.attributes.uuid}
                />
              </View>
            )}
          />
        );
      case "rocks":
        return (
          <FlashList
            data={foundRocks.slice(0, RESULTS_LENGTH)}
            estimatedItemSize={200}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View
                paddingHorizontal='m'
                paddingTop={index === 0 ? "m" : undefined}
              >
                <RockResultsItem
                  name={item.attributes.Name}
                  item={item}
                  id={item.attributes.uuid}
                />
              </View>
            )}
          />
        );
      case "sectors":
        return (
          <FlashList
            data={foundSectors.slice(0, RESULTS_LENGTH)}
            estimatedItemSize={80}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View
                paddingHorizontal='m'
                paddingTop={index === 0 ? "m" : undefined}
              >
                <ResultsItem
                  name={item.attributes.Name}
                  item={item}
                  id={item.attributes.uuid}
                />
              </View>
            )}
          />
        );
    }
  };

  const results = () => {
    switch (type) {
      case "routes":
        return foundRoutes;
      case "rocks":
        return foundRocks;
      case "sectors":
        return foundSectors;
    }
  };

  return (
    <View flex={1}>
      <View flexDirection='row' gap='s' paddingHorizontal='m' marginTop='m'>
        <Text variant='h3'>Wyników: </Text>
        <Text
          variant='h3'
          color='textSecondary'
        >{`${results().length.toString()}`}</Text>
      </View>
      {results().length > 0 && renderResults()}
      {results().length > RESULTS_LENGTH && (
        <View paddingHorizontal='m'>
          <Text variant='caption'>
            {`Mamy tego więcej - lista wyświetla tylko ${RESULTS_LENGTH.toString()} pierwszych wyników`}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Results;
