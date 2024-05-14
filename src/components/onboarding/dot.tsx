import { TouchableOpacity, useWindowDimensions } from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

type Props = {
  index: number;
  handlePressPagination: (arg: number) => void;
  buttonVal: SharedValue<number>;
};

export const Dot = ({ index, buttonVal, handlePressPagination }: Props) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();

  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      buttonVal.value,
      [(index - 1) * SCREEN_HEIGHT, index * SCREEN_HEIGHT, (index + 1) * SCREEN_HEIGHT],
      [10, 30, 10],
      Extrapolation.CLAMP,
    );

    const opacityAnimation = interpolate(
      buttonVal.value,
      [(index - 1) * SCREEN_HEIGHT, index * SCREEN_HEIGHT, (index + 1) * SCREEN_HEIGHT],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP,
    );
    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      buttonVal.value,
      [0, SCREEN_HEIGHT, 2 * SCREEN_HEIGHT],
      ['#06b6d4', '#6366f1', '#8b5cf6'],
    );

    return {
      backgroundColor: backgroundColor,
    };
  });

  return (
    <AnimatedTouchableOpacity
      className="mx-1 w-3 h-3 rounded-3xl"
      style={[animatedDotStyle, animatedColor]}
      onPress={() => handlePressPagination(index)}
    />
  );
};
