import { ReactNode } from "react";

import Height from "src/components/rock/details/Height";
import View from "src/components/ui/View";

import OverlayCardView from "src/components/ui/OverlayCardView";
import Exposition from "./Exposition";
import FamilyFriendly from "./FamilyFriendly";
import Formation from "./Formation";
import LooseRocks from "./LooseRocks";
import Parking from "./Parking";
import PopularityInfo from "./PopularityInfo";
import Prohibited from "./Prohibited";
import Recommended from "./Recommended";

import { RockData } from "src/services/rocks";

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
      justifyContent='space-between'
      gap='s'
      flexWrap='wrap'
      marginBottom='xl'
    >
      {rock.attributes.climbing_restricted && renderInWrapper(<Prohibited />)}
      {renderInWrapper(<Parking distance={rock.attributes.walk_distance} />)}
      {rock.attributes.family_friendly && renderInWrapper(<FamilyFriendly />)}
      {renderInWrapper(<Formation formation={rock.attributes.formation} />)}
      {renderInWrapper(<Exposition exposition={rock.attributes.exhibition} />)}
      {renderInWrapper(<Height height={rock.attributes.height} />)}
      {renderInWrapper(
        <PopularityInfo popularity={rock.attributes.popularity} />,
      )}
      {rock.attributes.loose_rocks && renderInWrapper(<LooseRocks />)}
      {rock.attributes.recommended && renderInWrapper(<Recommended />)}
    </View>
  );
};

const RenderWrapper = ({ children }: { children: ReactNode }) => (
  <OverlayCardView paddingTop='m'>{children}</OverlayCardView>
);

export default InformationRow;
