import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { OnboardingData } from '../../utils/data/onboarding-data';
import { FONT_FAMILY } from '../../utils/constants';

type Props = {
  item: OnboardingData;
};

export const RenderItem = ({ item }: Props) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  return (
    <View
      className="flex-1 items-center pt-24"
      style={{
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: item.backgroundColor,
      }}>
      <Text style={[styles.itemText, { color: item.textColor, fontFamily: FONT_FAMILY.medium }]}>{item.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 44,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
});
