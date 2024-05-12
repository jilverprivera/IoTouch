import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import store from './src/config/redux/store';
import NativeStackNavigator from './src/routes/stack-navigator';
import './styles.css';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-ExtraLight': require('./assets/fonts/Inter-ExtraLight.ttf'),
    'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
  });

  useEffect(() => {
    (async () => {
      if (fontsLoaded || fontError) await SplashScreen.hideAsync();
    })();
  }, [fontsLoaded, fontError]);
  if (!fontsLoaded && !fontError) return null;

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="auto" animated={true} />
        <NativeStackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

AppRegistry.registerComponent('IoTouch', () => App);
