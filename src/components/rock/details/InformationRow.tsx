import { ReactNode } from "react";

import Height from "src/components/rock/details/Height";
import View from "src/components/ui/View";

import { RockData } from "src/services/rocks";
import Exposition from "./Exposition";
import Parking from "./Parking";

type InformationRowProps = {
  rock: RockData;
  inCard?: boolean;
};

const InformationRow = ({ rock, inCard }: InformationRowProps) => {
  const renderInWrapper = (Item: ReactNode) => {
    if (inCard) return <RenderWrapper>{Item}</RenderWrapper>;
    return Item;
  };
  return (
    <View
      flexDirection='row'
      alignItems='center'
      justifyContent='flex-end'
      gap='m'
      flexWrap='wrap'
    >
      {renderInWrapper(<Exposition exposition={rock.attributes.exhibition} />)}
      {renderInWrapper(<Height height={rock.attributes.height} />)}
      {renderInWrapper(<Parking distance={rock.attributes.walk_distance} />)}
    </View>
  );
};

const RenderWrapper = ({ children }: { children: ReactNode }) => (
  <View
    borderRadius={12}
    backgroundColor='mainBackgroundFaded'
    p='s'
    paddingTop='m'
    shadowOffset={{ width: 0, height: 5 }}
    shadowRadius={4}
    shadowOpacity={0.5}
  >
    {children}
  </View>
);

export default InformationRow;
