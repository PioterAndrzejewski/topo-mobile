import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

import Text from "src/components/ui/Text";
import FavouritesScreen from "src/screens/FavouritesScreen";
import MapScreen from "src/screens/MapScreen";
import SearchScreen from "src/screens/SearchScreen";
import UserScreen from "src/screens/UserScreen";

import { HeartIcon } from "src/components/icons/Heart";
import { MapIcon } from "src/components/icons/Map";
import { SearchIcon } from "src/components/icons/Search";
import { SettingsIcon } from "src/components/icons/Settings";
import { palette } from "src/styles/theme";
import { BottomTabParamList } from "src/types/type";

const Tab = createBottomTabNavigator<BottomTabParamList>();

const TAB_ICONS = {
  Map: {
    active: MapIcon,
    inactive: MapIcon,
  },
  Search: {
    active: SearchIcon,
    inactive: SearchIcon,
  },
  Favourites: {
    active: HeartIcon,
    inactive: HeartIcon,
  },
  User: {
    active: SettingsIcon,
    inactive: SettingsIcon,
  },
};

const renderIcon = ({
  focused,
  size,
  route,
}: {
  focused: boolean;
  size: number;
  route: RouteProp<BottomTabParamList, keyof BottomTabParamList>;
}) => {
  const Icon = focused
    ? TAB_ICONS[route.name].active
    : TAB_ICONS[route.name].inactive;

  return <Icon size={size} color={focused ? palette.green : palette.blue700} />;
};

const getName = (name: string) => {
  switch (name) {
    case "Map":
      return "Mapa";
    case "Search":
      return "Szukaj";
    case "Favourites":
      return "Zapisane";
    case "User":
      return "Profil";
  }
};

const HomeBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => renderIcon({ focused, size, route }),
        headerShown: false,
        tabBarHideOnKeyboard: false,
        tabBarShowLabel: true,
        tabBarStyle: { paddingTop: 4 },
        tabBarLabel: ({ focused }) => (
          <Text
            variant='caption'
            color={focused ? "textSecondary" : "textGray"}
          >
            {getName(route.name)}
          </Text>
        ),
      })}
    >
      <Tab.Screen name='Map' component={MapScreen} />
      <Tab.Screen name='Search' component={SearchScreen} />
      <Tab.Screen name='Favourites' component={FavouritesScreen} />
      <Tab.Screen name='User' component={UserScreen} />
    </Tab.Navigator>
  );
};

export default HomeBottomTabNavigator;
