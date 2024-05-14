import { Alert, Text, TouchableOpacity } from 'react-native';
import { Container } from '../../components/layout/container';
import { useAppDispatch } from '../../utils/hooks';
import supabase from '../../utils/lib/supabase';
import { onClearSession } from '../../modules/authentication/slices';

export const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return Alert.alert(error.message);
      }
      dispatch(onClearSession());
    } catch (error) {}
  }
  return (
    <Container>
      <Text>ProfileScreen</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>SignOut</Text>
      </TouchableOpacity>
    </Container>
  );
};
