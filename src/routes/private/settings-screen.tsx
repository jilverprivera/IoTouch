import { Alert, Text, TouchableOpacity } from 'react-native';
import { Container } from '../../components/layout/container';
import { useAppDispatch } from '../../utils/hooks';
import supabase from '../../utils/lib/supabase';
import { onClearSession } from '../../modules/authentication/slices';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../stack-navigator';

export const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const { navigation } = useNavigation<NativeStackScreenProps<RootStackParamList>>();
  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return Alert.alert(error.message);
      }
      dispatch(onClearSession());
      navigation.navigate('SignInScreen');
    } catch (error) {}
  }
  return (
    <Container>
      <Text>ProfileScreen</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text className="text-neutral-100">SignOut</Text>
      </TouchableOpacity>
    </Container>
  );
};
