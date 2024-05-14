import { useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './bottom-tab-navigator';
import { setOnboarding, setToastRef } from '../config/redux/slices';
import { Toast } from '../components/ui';
import { SignInScreen, SignUpScreen } from './public';
import { LoadingScreen, OnboardingScreen } from './shared';
import supabase from '../utils/lib/supabase';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { onAuthUser, onLogoutUser, onSetSession } from '../modules/authentication/slices';
import { AUTH_STATUS } from '../modules/authentication/interfaces';

export type RootStackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
  OnboardingScreen: undefined;
  LoadingScreen: undefined;
  BottomTabNavigator: undefined;
};

const NativeStack = createNativeStackNavigator<RootStackParamList>();

const NativeStackNavigator = () => {
  const { status } = useAppSelector((state) => state.auth);
  const { onboarding } = useAppSelector((state) => state.layout);

  const dispatch = useAppDispatch();
  const ref = useRef(null);

  useEffect(() => {
    dispatch(setToastRef(ref.current));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      // await AsyncStorage.removeItem('onboarding');
      const onboarding = await AsyncStorage.getItem('onboarding');
      if (onboarding) dispatch(setOnboarding(JSON.parse(onboarding)));
    })();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session != null) {
        dispatch(onSetSession(session));
        dispatch(onAuthUser());
      } else {
        dispatch(onLogoutUser());
      }
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(onSetSession(session));
    });
  }, []);

  return (
    <>
      <Toast ref={ref} />
      <NativeStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'LoadingScreen'}>
        {status === AUTH_STATUS['checking'] ? (
          <NativeStack.Screen name="LoadingScreen" component={LoadingScreen} />
        ) : status === AUTH_STATUS['authenticated'] ? (
          <NativeStack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
        ) : onboarding.complete === true ? (
          <>
            <NativeStack.Screen name="SignUpScreen" component={SignUpScreen} />
            <NativeStack.Screen name="SignInScreen" component={SignInScreen} />
          </>
        ) : (
          <NativeStack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        )}
      </NativeStack.Navigator>
    </>
  );
};

export default NativeStackNavigator;
