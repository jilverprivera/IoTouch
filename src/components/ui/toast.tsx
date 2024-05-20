import { forwardRef, useImperativeHandle } from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { FontAwesome5 } from '@expo/vector-icons';
import { ToastTypes } from '../../config/redux/interfaces';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { onChangeToast } from '../../config/redux/slices/layout-slice';
import { FONT_FAMILY, SCREEN_WIDTH } from '../../utils/constants';

const TOAST_TYPE: any = {
  [ToastTypes.SUCCESS]: {
    backgroundColor: '#2ecc71',
    icon: 'check-circle',
  },
  [ToastTypes.ERROR]: {
    backgroundColor: '#e74c3c',
    icon: 'exclamation-circle',
  },
  [ToastTypes.INFO]: {
    backgroundColor: '#3498db',
    icon: 'info-circle',
  },
  [ToastTypes.WARNING]: {
    backgroundColor: '#f39c12',
    icon: 'exclamation-triangle',
  },
};

export const Toast = forwardRef(({}, ref) => {
  const dispatch = useAppDispatch();

  const { message, type, description, open } = useAppSelector((state) => state.layout.toast);

  const showToast = () => {
    dispatch(onChangeToast({ open: true }));
    const timer = setTimeout(() => {
      dispatch(onChangeToast({ open: false }));
      clearTimeout(timer);
    }, 100);
  };

  useImperativeHandle(ref, () => ({
    show: showToast,
  }));

  const icon = TOAST_TYPE[type].icon;

  return (
    <>
      {open && (
        <Animated.View
          className={`absolute top-8 h-16 mx-auto p-2 rounded-lg flex flex-row items-center border ${
            type === ToastTypes.SUCCESS
              ? 'bg-green-100 border-green-300'
              : type === ToastTypes.INFO
              ? 'bg-blue-100 border-blue-300'
              : type === ToastTypes.WARNING
              ? 'bg-yellow-100 border-yellow-300'
              : 'bg-red-100 border-red-300'
          }`}
          style={{
            width: SCREEN_WIDTH * 0.9,
            left: SCREEN_WIDTH * 0.05,
            marginVertical: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          entering={FadeInUp.delay(100)}
          exiting={FadeOutUp.delay(3000)}>
          <FontAwesome5 name={icon} size={32} color="#000" />

          <View style={{ marginLeft: 12 }}>
            <Text className="text-xl" style={{ fontFamily: FONT_FAMILY.semibold, color: '#000' }}>
              {message}
            </Text>
            <Text className="text-sm" style={{ fontFamily: FONT_FAMILY.medium, color: '#000' }}>
              {description}
            </Text>
          </View>
        </Animated.View>
      )}
    </>
  );
});
