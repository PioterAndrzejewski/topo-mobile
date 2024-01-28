import Card from "src/components/ui/Card";
import View from "src/components/ui/View";
import Text from "../ui/Text";

import { useUserProducts } from "src/services/payments";

const Statistics = () => {
  const { data: products } = useUserProducts();

  return (
    <View
      flexDirection='row'
      paddingHorizontal='m'
      justifyContent='space-between'
    >
      <View width='47%'>
        <Card title='Zapisane elementy' isOutline>
          <Text>Produktów: {products?.length}</Text>
        </Card>
      </View>
      <View width='47%'>
        <Card title='Produkty' isOutline>
          <Text>Produktów: {products?.length}</Text>
        </Card>
      </View>
    </View>
  );
};

export default Statistics;
