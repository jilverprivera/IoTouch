import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { FONT_FAMILY, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/constants';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { onChangeModalShow } from '../../config/redux/slices';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

type props = {
  children: React.ReactNode;
  title: string;
};

export const Modal = forwardRef(({ children, title }: props, ref) => {
  const { modal } = useAppSelector((state) => state.layout);
  const dispatch = useAppDispatch();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const animY = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    if (modal.open) {
      fadeAnim.setValue(0);
      animY.setValue(24);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(animY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
      Animated.spring;
    }
  }, [modal.open]);

  const fadeOut = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(animY, {
        toValue: 24,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(() => dispatch(onChangeModalShow(false)), 300);
  };

  useImperativeHandle(ref, () => ({
    fade: fadeOut,
  }));

  if (modal.open) {
    return (
      <Animated.View
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          backgroundColor: 'rgba(0,0,0,0.2)',
          opacity: fadeAnim,
        }}
        className="absolute top-0 left-0 z-50 flex items-center justify-center">
        <Animated.View
          className="w-4/5 bg-white rounded-2xl flex items-start justify-center pb-8 px-4"
          style={{ transform: [{ translateY: animY }] }}>
          <Text className="text-lg top-4 tracking-tight" style={{ fontFamily: FONT_FAMILY.semibold }}>
            {title}
          </Text>
          <TouchableOpacity className="absolute top-4 right-4" onPress={() => fadeOut()}>
            <MaterialIcons name="close" size={24} color="black" />
          </TouchableOpacity>
          <View className="w-full top-4 flex flex-col items-center justify-center">{children}</View>
        </Animated.View>
      </Animated.View>
    );
  }
});
