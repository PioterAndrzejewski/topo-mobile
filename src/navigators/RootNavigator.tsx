import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeBottomTabNavigator from "src/navigators/HomeBottomTabNavigator";
import ChangePasswordScreen from "src/screens/ChangePassword";
import FiltersScreen from "src/screens/Filters";
import LoginScreen from "src/screens/Login";
import RegisterScreen from "src/screens/Register";
import RegisteredScreen from "src/screens/Registered";
import ResetPasswordScreen from "src/screens/ResetPassword";
import ResetPasswordSuccessScreen from "src/screens/ResetPasswordSuccess";
import RockScreen from "src/screens/Rock";

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
    <Stack.Screen name='Registered' component={RegisteredScreen} />
    <Stack.Screen name='HomeNavigator' component={HomeBottomTabNavigator} />
    <Stack.Screen name='Filters' component={FiltersScreen} />
    <Stack.Screen
      name='Rock'
      component={RockScreen}
      initialParams={{ id: "none" }}
    />
    <Stack.Screen
      name='ChangePassword'
      component={ChangePasswordScreen}
      options={{
        presentation: "modal",
      }}
    />
  </Stack.Navigator>
);

export default RootNavigator;
