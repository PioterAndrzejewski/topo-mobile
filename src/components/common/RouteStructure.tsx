import { ScrollView } from "react-native-gesture-handler";
import Text from "../ui/Text";
import View from "../ui/View";

type Routes = {
  toV: number;
  toVI2: number;
  toVI4: number;
  toVI8: number;
};

type RouteStructureProps = {
  routes: Routes;
  inCard?: boolean;
};

const RouteStructure = ({ routes, inCard = true }: RouteStructureProps) => {
  const renderSection = (range: string, number: number) => (
    <View
      alignItems='center'
      borderColor='backgroundSecondary'
      gap='xs'
      borderWidth={inCard ? 0 : 1}
      borderRadius={12}
      paddingVertical={inCard ? "none" : "xs"}
      paddingHorizontal={inCard ? "none" : "m"}
    >
      <Text variant='body'>{range}</Text>
      <Text variant='h4' color='textSecondary'>
        {number.toString()}
      </Text>
    </View>
  );

  return (
    <ScrollView
      horizontal
      scrollEnabled={!inCard}
      showsHorizontalScrollIndicator={false}
    >
      <View
        flexDirection='row'
        justifyContent='space-between'
        paddingHorizontal={inCard ? "none" : "l"}
        gap={inCard ? undefined : "m"}
        minWidth={"100%"}
      >
        {renderSection("III-V+", routes?.toV)}
        {renderSection("VI-VI.2+", routes?.toVI2)}
        {renderSection("VI.3-VI.4+", routes?.toVI4)}
        {renderSection("VI.5-VI.8", routes?.toVI8)}
      </View>
    </ScrollView>
  );
};

export default RouteStructure;
