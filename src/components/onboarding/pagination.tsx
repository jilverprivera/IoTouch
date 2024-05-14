import { View } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import { Dot } from './dot';
import { OnboardingData } from '../../utils/data/onboarding-data';

type Props = {
  data: OnboardingData[];
  handlePressPagination: (arg: number) => void;
  buttonVal: SharedValue<number>;
};
export const Pagination = ({ data, buttonVal, handlePressPagination }: Props) => {
  return (
    <View className="flex flex-row absolute bottom-16">
      {data.map((_, index) => {
        return <Dot index={index} buttonVal={buttonVal} handlePressPagination={handlePressPagination} key={index} />;
      })}
    </View>
  );
};
