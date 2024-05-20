import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useAppSelector } from '../../utils/hooks';
import { FONT_FAMILY, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/constants';

export const Greetings = () => {
  const { userData } = useAppSelector((state) => state.auth);

  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 0 && currentHour < 12) {
        setGreeting('Buenos días');
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting('Buenas tardes');
      } else {
        setGreeting('Buenas noches');
      }
    };
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, [new Date().getMinutes()]);

  return (
    <View style={{ width: SCREEN_WIDTH }} className="rounded-3xl pt-12 pb-8 px-4 bg-neutral-800">
      <Text className="text-3xl text-neutral-50" style={{ fontFamily: FONT_FAMILY.medium }}>
        Hola {userData?.first_name} {userData?.last_name}
      </Text>
      <Text className="text-lg text-neutral-50" style={{ fontFamily: FONT_FAMILY.medium }}>
        {greeting}.
      </Text>
    </View>
  );
};
