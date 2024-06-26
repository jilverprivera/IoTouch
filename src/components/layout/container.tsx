import { SafeAreaView } from 'react-native';

type props = {
  children: JSX.Element | JSX.Element[];
  initAtStart?: boolean;
};

export const Container = ({ children, initAtStart = false }: props) => {
  return (
    <SafeAreaView
      className={`flex-1 items-center bg-neutral-950 ${initAtStart ? 'justify-start' : '  justify-center'}`}>
      {children}
    </SafeAreaView>
  );
};
