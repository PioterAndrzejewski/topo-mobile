import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";
import FavouritesScreen from "src/screens/FavouritesScreen";
import FiltersScreen from "src/screens/Filters";
import MapScreen from "src/screens/MapScreen";
import SearchScreen from "src/screens/SearchScreen";
import UserScreen from "src/screens/UserScreen";

import { HeartIcon } from "src/components/icons/Heart";
import { MapIcon } from "src/components/icons/Map";
import { SearchIcon } from "src/components/icons/Search";
import { SettingsIcon } from "src/components/icons/Settings";
import { useFilters } from "src/hooks/useFilters";
import { palette } from "src/styles/theme";
import { BottomTabParamList } from "src/types/type";

const Tab = createBottomTabNavigator<BottomTabParamList>();

const TAB_ICONS = {
  Map: {
    active: MapIcon,
    inactive: MapIcon,
  },
  Filters: {
    active: SettingsIcon,
    inactive: SettingsIcon,
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

const renderIcon = (
  {
    focused,
    size,
    route,
  }: {
    focused: boolean;
    size: number;
    route: RouteProp<BottomTabParamList, keyof BottomTabParamList>;
  },
  filtersCount: number,
) => {
  const Icon = focused
    ? TAB_ICONS[route.name].active
    : TAB_ICONS[route.name].inactive;

  return (
    <View
      backgroundColor={focused ? "backgroundTertiary" : "backgroundScreen"}
      borderRadius={14}
      padding='3xs'
      marginTop='xs'
    >
      <Icon size={size} color={focused ? palette.black : palette.black} />
      {route.name === "Filters" && filtersCount > 0 && (
        <View
          height={17}
          width={16}
          justifyContent='center'
          alignItems='center'
          borderRadius={50}
          backgroundColor='backgroundError'
          position='absolute'
          alignSelf='flex-end'
          style={{
            transform: "translateY(10px)",
          }}
          pointerEvents='none'
        >
          <Text variant='filter' color='textWhite'>
            {filtersCount}
          </Text>
        </View>
      )}
    </View>
  );
};

const getName = (name: string) => {
  switch (name) {
    case "Map":
      return "Mapa";
    case "Filters":
      return "Filtry";
    case "Search":
      return "Szukaj";
    case "Favourites":
      return "Zapisane";
    case "User":
      return "Profil";
  }
};

const HomeBottomTabNavigator = () => {
  const { activeFiltersCount } = useFilters();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) =>
          renderIcon({ focused, size, route }, activeFiltersCount),
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
