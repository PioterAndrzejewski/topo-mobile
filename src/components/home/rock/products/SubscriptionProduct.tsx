import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import AppLoading from "src/components/common/AppLoading";

import { ActivityIndicator } from "react-native";
import { DiamondIcon } from "src/components/icons/Diamond";
import { useSubscriptionProduct } from "src/services/payments";
import { palette } from "src/styles/theme";
import { getPriceString } from "src/utils/getPriceString";

const SubscriptionProduct = ({ isLoading }: { isLoading: boolean }) => {
  const { data: subscription } = useSubscriptionProduct();

  if (!subscription) return <AppLoading />;
  return (
    <View padding='m' borderRadius={12} backgroundColor='backgroundSecondary'>
      <View
        flexDirection='row'
        alignItems='center'
        gap='s'
        borderBottomWidth={1}
        borderColor='backgroundScreen'
        paddingBottom='m'
        marginBottom='m'
      >
        <DiamondIcon size={32} color={palette.yellow} />
        <Text variant='h3' color='textSecondary'>
          Subskrypcja 12-miesięczna
        </Text>
      </View>
      <Text variant='body' color='textBlack'>
        {subscription.description}
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
            {getPriceString(subscription?.price)}
          </Text>
        )}
      </View>
    </View>
  );
};

export default SubscriptionProduct;
