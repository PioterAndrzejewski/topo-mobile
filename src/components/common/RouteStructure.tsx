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
  const renderSection = (range: string, number: number) => (
    <View
      alignItems='center'
      paddingVertical='s'
      paddingHorizontal='s'
      backgroundColor='mainBackgroundFaded'
      borderRadius={12}
      shadowOffset={{ width: 0, height: 5 }}
      shadowRadius={4}
      shadowOpacity={0.5}
    >
      <Text variant='caption'>{range}</Text>
      <View width='100%' height={1} backgroundColor='backgroundBlack' />
      <Text variant='caption'>{number.toString()}</Text>
    </View>
  );

  return (
    <View flexDirection='row' justifyContent='space-between'>
      {renderSection("III - V+", routes?.toV)}
      {renderSection("VI - VI.2+", routes?.toVI2)}
      {renderSection("VI.3 - VI.4+", routes?.toVI4)}
      {renderSection("VI.5 - VI.8", routes?.toVI8)}
    </View>
  );
};

export default RouteStructure;
