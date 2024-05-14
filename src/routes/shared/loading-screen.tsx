import { ActivityIndicator } from 'react-native';
import { Container } from '../../components/layout/container';

export const LoadingScreen = () => {
  return (
    <Container>
      <ActivityIndicator size="large" color="black" />
    </Container>
  );
};
