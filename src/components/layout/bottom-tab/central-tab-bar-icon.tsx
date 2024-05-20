import { Platform, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type props = {
  iconName: string;
  focused: boolean;
};

export const CentralTabBarIcon = ({ iconName, focused }: props) => {
  return (
    <View
      className={`flex justify-center items-center rounded-full
        ${Platform.OS === 'ios' ? 'w-12 h-12 -top-3' : 'w-16 h-16 -top-6'}
        ${focused ? 'bg-neutral-700 ' : 'bg-neutral-800'}
      `}>
      <MaterialIcons name={iconName as any} size={32} color={focused ? '#d4d4d4' : '#525252'} />
    </View>
  );
};
