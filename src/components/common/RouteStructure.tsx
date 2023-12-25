import { useWindowDimensions } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';

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
};

const RouteStructure = ({ routes }: RouteStructureProps) => {
  const { width } = useWindowDimensions();
  const renderSection = (range: string, number: number) => (
    <View
      alignItems='center'
      borderWidth={1}
      borderColor='backgroundSecondary'
      p='xs'
      borderRadius={12}
      gap='xs'
    >
      <Text variant='body'>{range}</Text>
      <View width='100%' height={1} backgroundColor='backgroundSecondary' />
      <Text variant='h4' color='textSecondary'>
        {number.toString()}
      </Text>
    </View>
  );

  return (
    <View gap='s' width={width}>
      <View paddingHorizontal='m'>
        <Text variant='h3'>Drogi według poziomu:</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          flexDirection='row'
          justifyContent='space-between'
          gap='m'
          paddingLeft='m'
          minWidth={width - 16}
        >
          {renderSection("III - V+", routes?.toV)}
          {renderSection("VI - VI.2+", routes?.toVI2)}
          {renderSection("VI.3 - VI.4+", routes?.toVI4)}
          {renderSection("VI.5 - VI.8", routes?.toVI8)}
        </View>
      </ScrollView>
    </View>
  );
};

export default RouteStructure;
