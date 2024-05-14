import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DeviceScreen, DashboardScreen, ControllerScreen, AddScreen, ProfileScreen } from './private';
import { CentralTabBarIcon, TabBarIcon } from '../components/layout/bottom-tab';
import { RADIUS, SPACING } from '../utils/constants';

export type RootBottomTabParamList = {
  DashboardScreen: undefined;
  ControllerScreen: undefined;
  AddScreen: undefined;
  DeviceScreen: undefined;
  ProfileScreen: undefined;
};

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="DashboardScreen"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        headerShadowVisible: false,
        tabBarStyle: {
          elevation: 0,
          height: 64,
          borderTopWidth: 1,
          borderTopColor: '#404040',
          backgroundColor: '#171717',
        },
      }}>
      <Tab.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon iconName="space-dashboard" title="Espacios" focused={focused} />,
        }}
      />

      <Tab.Screen
        name="ControllerScreen"
        component={ControllerScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon iconName="hub" title="Controladores" focused={focused} />,
        }}
      />

      <Tab.Screen
        name="AddScreen"
        component={AddScreen}
        options={{
          tabBarIcon: ({ focused }) => <CentralTabBarIcon iconName="add" focused={focused} />,
        }}
      />

      <Tab.Screen
        name="DeviceScreen"
        component={DeviceScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon iconName="broadcast-on-home" title="Dispositivos" focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon iconName="person-pin" title="Tu perfil" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}
