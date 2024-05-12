import { Alert } from 'react-native';
import supabase from '../lib/supabase';
import { useAppDispatch } from './useStore';
import { onAuthUser, onSetSession } from '../../config/redux/slices';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  async function signInWithEmail(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      const { session } = data;
      if (error) Alert.alert(error.message);
      if (!session) Alert.alert('No session founded!');
      dispatch(onSetSession(session));
      return dispatch(onAuthUser());
    } catch (error) {
      Alert.alert(error as string);
    }
  }

  async function signUpWithEmail(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      const { session } = data;
      if (error) Alert.alert(error.message);
      if (!session) Alert.alert('No session founded!');
      return dispatch(onSetSession(session));
    } catch (error) {
      Alert.alert(error as string);
    }
  }

  return { signInWithEmail, signUpWithEmail };
};
