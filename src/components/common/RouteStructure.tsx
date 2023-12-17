import OverlayCardView from "../ui/OverlayCardView";
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
    <OverlayCardView alignItems='center'>
      <Text variant='caption'>{range}</Text>
      <View width='100%' height={1} backgroundColor='backgroundBlack' />
      <Text variant='caption'>{number.toString()}</Text>
    </OverlayCardView>
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
