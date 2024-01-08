import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeBottomTabNavigator from "src/navigators/HomeBottomTabNavigator";
import LoginScreen from "src/screens/Login";
import RegisterScreen from "src/screens/Register";
import ResetPasswordScreen from "src/screens/ResetPassword";
import ResetPasswordSuccessScreen from "src/screens/ResetPasswordSuccess";
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
    <Stack.Screen name='ResetPassword' component={ResetPasswordScreen} />
    <Stack.Screen
      name='ResetPasswordSuccessScreen'
      component={ResetPasswordSuccessScreen}
    />
    <Stack.Screen name='Register' component={RegisterScreen} />
    <Stack.Screen name='HomeNavigator' component={HomeBottomTabNavigator} />
    <Stack.Screen name='Rock' component={Rock} initialParams={{ id: "none" }} />
  </Stack.Navigator>
);

export default RootNavigator;
