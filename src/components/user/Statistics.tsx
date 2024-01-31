import Card from "src/components/ui/Card";
import View from "src/components/ui/View";
import Text from "../ui/Text";

import { useFavoriteContext } from "src/context/FavoritesContext";
import { useUserProducts } from "src/services/payments";

const Statistics = () => {
  const { data: products } = useUserProducts();
  const { getStats } = useFavoriteContext();
  const stats = getStats();

  return (
    <View
      flexDirection='row'
      paddingHorizontal='m'
      justifyContent='space-between'
    >
      <View width='47%' height='100%'>
        <Card title='Zapisanych' isOutline flexGrow={1}>
          <Text>Skały: {stats.rocks}</Text>
          <Text>Dróg: {stats.routes}</Text>
        </Card>
      </View>
      <View width='47%' height='100%'>
        <Card title='Produkty' isOutline flexGrow={1}>
          <Text>Produkty: {products?.length}</Text>
        </Card>
      </View>
    </View>
  );
};

export default Statistics;
