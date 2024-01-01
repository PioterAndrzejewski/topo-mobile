import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { ItemIcon } from "src/components/icons/Item";
import { TickIcon } from "src/components/icons/Tick";
import { Product } from "src/services/payments";
import { palette } from "src/styles/theme";
import { getPriceString } from "src/utils/getPriceString";
import AppLoading from 'src/components/common/AppLoading';

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
        <ItemIcon size={26} color={palette.yellow} />
        <Text variant='h3' color='textSecondary'>
          {product.name}
        </Text>
      </View>
      <Text variant='body' color='textGray'>
        {product.description}
      </Text>
      <View marginVertical='m'>
        <Text variant='h3'>Pakiet zawiera skały:</Text>
      </View>
      {product.map_rocks.data.map((item) => (
        <View flexDirection='row' gap='s'>
          <TickIcon />
          <Text variant='body' color='textGray'>
            {item.attributes.Name}
          </Text>
        </View>
      ))}
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
          <AppLoading />
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
