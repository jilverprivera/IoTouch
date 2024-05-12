import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './bottom-tab-navigator';
import { SignInScreen } from './public/sign-in-screen';
import supabase from '../utils/lib/supabase';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { onAuthUser, onSetSession } from '../config/redux/slices';
import { AUTH_STATUS } from '../interfaces';

export type RootStackParamList = {
  SignInScreen: undefined;
  BottomTabNavigator: undefined;
};

const NativeStack = createNativeStackNavigator<RootStackParamList>();

const NativeStackNavigator = () => {
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session != null) dispatch(onAuthUser());
      return dispatch(onSetSession(session));
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(onSetSession(session));
    });
  }, []);

  return (
    <NativeStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={status === AUTH_STATUS['not-authenticated'] ? 'SignInScreen' : 'BottomTabNavigator'}>
      {status === AUTH_STATUS['not-authenticated'] ? (
        <>
          <NativeStack.Screen name="SignInScreen" component={SignInScreen} />
        </>
      ) : (
        <NativeStack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      )}
    </NativeStack.Navigator>
  );
};

export default NativeStackNavigator;
