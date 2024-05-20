import { MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

type props = {
  iconName: string;
  title?: string;
  focused: boolean;
};

export const TabBarIcon = ({ iconName, focused, title }: props) => {
  return (
    <View className={`flex items-center justify-center`}>
      <MaterialIcons name={iconName as any} size={28} color={focused ? '#d4d4d4' : '#525252'} />
      <Text
        style={{
          fontSize: 10,
          color: focused ? '#d4d4d4' : '#525252',
        }}>
        {title}
      </Text>
    </View>
  );
};
