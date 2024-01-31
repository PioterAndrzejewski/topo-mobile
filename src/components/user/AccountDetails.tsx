import Card from "src/components/ui/Card";
import Text from "../ui/Text";
import View from "../ui/View";

import { useUserProfile } from "src/hooks/useUserProfile";

const AccountDetails = () => {
  const user = useUserProfile();
  return (
    <Card title='Konto uzytkownika' marginHorizontal='m'>
      <View gap='s'>
        <View flexDirection='row' gap='s'>
          <Text variant='h3'>Użytkownik: </Text>
          <Text>{user.data?.username}</Text>
        </View>
        <View flexDirection='row' gap='s'>
          <Text variant='h3'>E-mail: </Text>
          <Text>{user.data?.email}</Text>
        </View>
      </View>
    </Card>
  );
};

export default AccountDetails;
