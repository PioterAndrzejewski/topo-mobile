import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";

import Height from "src/components/rock/details/Height";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import Exposition from "./Exposition";
import FamilyFriendly from "./FamilyFriendly";
import Formation from "./Formation";
import LooseRocks from "./LooseRocks";
import Parking from "./Parking";
import PopularityInfo from "./PopularityInfo";
import Prohibited from "./Prohibited";
import Recommended from "./Recommended";
import ShadingInfo from "./Shading";

import { ScrollView } from "react-native-gesture-handler";
import { RockData } from "src/services/rocks";

type InformationRowProps = {
  rock: RockData;
  inCard?: boolean;
};

const InformationRow = ({ rock, inCard }: InformationRowProps) => {
  const renderInWrapper = (Item: ReactNode) => (
    <View
      padding='m'
      borderRadius={12}
      borderColor='backgroundSecondary'
      borderWidth={1}
    >
      {Item}
    </View>
  );
  return (
    <View marginVertical='m'>
      <View marginLeft='m' paddingBottom='s'>
        <Text variant='h3'>Informacje o skale:</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          flexDirection='row'
          gap='l'
          paddingHorizontal='m'
          paddingRight='xl'
        >
          {rock.attributes.climbing_restricted &&
            renderInWrapper(<Prohibited />)}
          {renderInWrapper(
            <Parking distance={rock.attributes.walk_distance} />,
          )}
          {rock.attributes.family_friendly &&
            renderInWrapper(<FamilyFriendly />)}
          {renderInWrapper(<Formation formation={rock.attributes.formation} />)}
          {renderInWrapper(<ShadingInfo shading={rock.attributes.shading} />)}
          {renderInWrapper(
            <Exposition exposition={rock.attributes.exhibition} />,
          )}
          {renderInWrapper(<Height height={rock.attributes.height} />)}
          {renderInWrapper(
            <PopularityInfo popularity={rock.attributes.popularity} />,
          )}
          {rock.attributes.loose_rocks && renderInWrapper(<LooseRocks />)}
          {rock.attributes.recommended && renderInWrapper(<Recommended />)}
        </View>
      </ScrollView>
      <LinearGradient
        colors={["rgb(255, 255, 255)", "rgba(255, 255, 255, 0)"]}
        start={[0, 1]}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: 40,
        }}
      />
      <LinearGradient
        colors={["rgba(255, 255, 255, 0)", "rgb(255, 255, 255)"]}
        start={[0, 1]}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: 40,
        }}
      />
    </View>
  );
};

export default InformationRow;
