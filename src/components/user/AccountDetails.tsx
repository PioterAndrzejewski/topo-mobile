import Card from "src/components/ui/Card";
import Text from "../ui/Text";
import View from "../ui/View";

import { useUserProfile } from "src/hooks/useUserProfile";
import { palette } from "src/styles/theme";
import { UserIcon } from "../icons/User";

const AccountDetails = () => {
  const user = useUserProfile();
  return (
    <View>
      <View justifyContent='center' alignItems='center' marginHorizontal='xl'>
        <View
          padding='l'
          backgroundColor='backgroundTertiary'
          borderRadius={999}
        >
          <UserIcon size={37} color={palette.white} />
        </View>
        <View marginVertical='l' gap='m' alignItems='center'>
          <Text variant='h3'>Cześć {user && user.data?.username}</Text>
          {user && <Text variant='bodyMedium'>{user.data?.email}</Text>}
        </View>
      </View>
      <Card title='Konto uzytkownika' marginHorizontal='m' isOutline>
        <View gap='s'>
          <View flexDirection='row' gap='s' justifyContent='space-between'>
            <Text variant='body'>Użytkownik: </Text>
            <Text variant='body'>{user.data?.username}</Text>
          </View>
          <View flexDirection='row' gap='s' justifyContent='space-between'>
            <Text variant='body'>E-mail: </Text>
            <Text variant='body'>{user.data?.email}</Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default AccountDetails;
