import { Dimensions } from 'react-native';

export const FONT_FAMILY = {
  regular: 'Inter-Regular',
  light: 'Inter-Light',
  medium: 'Inter-Medium',
  semibold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
};

export const FONT_SIZE = {
  xs: 12,
  s: 14,
  m: 16,
  l: 20,
  xl: 24,
  xxl: 32,
};

export const LINE_HEIGHT = {
  xs: 16,
  s: 20,
  m: 24,
  l: 28,
  xl: 32,
  xxl: 36,
};

export const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_WIDTH = {
  xs: 1,
  s: 2,
  m: 4,
  l: 6,
  xl: 8,
  xxl: 12,
};

export const SHADOW = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

export const EASING = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

export const DURATION = {
  xs: 100,
  s: 200,
  m: 300,
  l: 400,
  xl: 500,
  xxl: 600,
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');
const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

export { SCREEN_WIDTH, WINDOW_WIDTH, SCREEN_HEIGHT, WINDOW_HEIGHT };
