import { Text, TouchableOpacity, View } from 'react-native';
import { Container } from '../../components/layout/container';
import { useAppDispatch } from '../../utils/hooks';
import { onChangeModalShow } from '../../config/redux/slices';

export const ControllerScreen = () => {
  const dispatch = useAppDispatch();
  return (
    <Container>
      <TouchableOpacity onPress={() => dispatch(onChangeModalShow(true))}>
        <Text>Abrir</Text>
      </TouchableOpacity>
    </Container>
  );
};
