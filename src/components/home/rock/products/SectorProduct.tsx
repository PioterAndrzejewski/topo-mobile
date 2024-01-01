import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { ActivityIndicator } from "react-native";
import { ItemIcon } from "src/components/icons/Item";
import { TickIcon } from "src/components/icons/Tick";
import { Product } from "src/services/payments";
import { palette } from "src/styles/theme";
import { getPriceString } from "src/utils/getPriceString";

const SectorProduct = ({
  product,
  isLoading,
}: {
  product: Product;
  isLoading: boolean;
}) => {
  return (
    <View
      borderColor='backgroundSecondary'
      borderWidth={1}
      padding='m'
      borderRadius={12}
    >
      <View
        flexDirection='row'
        alignItems='center'
        gap='s'
        borderBottomWidth={1}
        borderColor='backgroundSecondary'
        paddingBottom='m'
        marginBottom='m'
      >
        <ItemIcon size={32} color={palette.yellow} />
        <View flexShrink={1}>
          <Text variant='h3' color='textSecondary'>
            {product.name}
          </Text>
          <Text color='textGray'>Ze wszystkimi przyszłymi aktualizacjami</Text>
        </View>
      </View>
      <Text variant='body' color='textGray'>
        {product.description}
      </Text>
      <View marginVertical='m'>
        <Text variant='h3'>Pakiet zawiera skały</Text>
      </View>
      {product.map_rocks.data.map((item) => (
        <View flexDirection='row' gap='s' marginBottom='m' key={item.id}>
          <TickIcon />
          <Text variant='body' color='textGray'>
            {item.attributes.Name}
          </Text>
        </View>
      ))}
      <Text variant='body' color='textGray'>
        I może zostać w przyszłości uzupełniony o dodatkowe elementy.
      </Text>
      <View
        width='100%'
        backgroundColor='secondary'
        height={50}
        marginTop='l'
        justifyContent='center'
        alignItems='center'
        borderRadius={12}
      >
        {isLoading ? (
          <ActivityIndicator color={palette.white} />
        ) : (
          <Text color='textWhite' variant='button'>
            {getPriceString(product.price)}
          </Text>
        )}
      </View>
    </View>
  );
};

export default SectorProduct;
