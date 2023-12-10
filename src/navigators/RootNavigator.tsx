import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeBottomTabNavigator from "src/navigators/HomeBottomTabNavigator";
import LoginScreen from "src/screens/Login";
import RegisterScreen from "src/screens/Register";
import Rock from "src/screens/Rock";

import { RootStackParamList } from "src/types/type";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name='Login' component={LoginScreen} />
    <Stack.Screen name='Register' component={RegisterScreen} />
    <Stack.Screen name='HomeNavigator' component={HomeBottomTabNavigator} />
    <Stack.Screen
      name='Rock'
      component={Rock}
      initialParams={{ id: "yes yes" }}
    />
  </Stack.Navigator>
);

export default RootNavigator;
