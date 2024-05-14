import { TouchableWithoutFeedback, useWindowDimensions } from 'react-native';
import Animated, {
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { FONT_FAMILY } from '../../utils/constants';

type Props = {
  handlePress: () => void;
  buttonVal: SharedValue<number>;
};

export const CustomButton = ({ handlePress, buttonVal }: Props) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      buttonVal.value,
      [0, SCREEN_HEIGHT, 2 * SCREEN_HEIGHT],
      ['#06b6d4', '#6366f1', '#8b5cf6'],
    );
    return { backgroundColor };
  });

  // // ['#fd94b2', '#f8dac2', '#154f40'],

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width: buttonVal.value === 2 * SCREEN_HEIGHT ? withSpring(260) : withSpring(120),
      height: buttonVal.value === 2 * SCREEN_HEIGHT ? withSpring(80) : withSpring(120),
    };
  });

  const initialTextStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonVal.value === 2 * SCREEN_HEIGHT ? withTiming(0) : withTiming(1),
      transform: [{ translateX: buttonVal.value === 2 * SCREEN_HEIGHT ? withTiming(100) : withTiming(0) }],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonVal.value === 2 * SCREEN_HEIGHT ? withTiming(1) : withTiming(0),
      transform: [{ translateX: buttonVal.value === 2 * SCREEN_HEIGHT ? withTiming(0) : withTiming(-100) }],
    };
  });

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View
        className="absolute bottom-24 z-50 w-32 h-32 rounded-full flex items-center justify-center"
        style={[animatedColor, buttonAnimationStyle]}>
        <Animated.Text
          className="text-white text-xl absolute"
          style={[{ fontFamily: FONT_FAMILY.semibold }, textAnimationStyle]}>
          Iniciar
        </Animated.Text>
        <Animated.Text className="text-white text-xl" style={[{ fontFamily: FONT_FAMILY.semibold }, initialTextStyle]}>
          Siguiente
        </Animated.Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
