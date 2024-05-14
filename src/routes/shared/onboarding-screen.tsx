import { useRef, useState } from 'react';
import { PixelRatio, StyleSheet, View, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { Canvas, Circle, Group, Image, Mask, SkImage, makeImageFromView } from '@shopify/react-native-skia';
import { RootStackParamList } from '../stack-navigator';
import { CustomButton, Pagination, RenderItem } from '../../components/onboarding';
import { useAppDispatch } from '../../utils/hooks';
import { data } from '../../utils/data/onboarding-data';
import { setOnboarding } from '../../config/redux/slices';

export const OnboardingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const pd = PixelRatio.get();
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [overlay, setOverlay] = useState<SkImage | null>(null);
  const mask = useSharedValue(0);
  const buttonVal = useSharedValue(0);
  const dispatch = useAppDispatch();

  const wait = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handlePress = async () => {
    if (currentIndex === data.length - 1 && !active) {
      const onboarding = { complete: true };
      await AsyncStorage.setItem('onboarding', JSON.stringify(onboarding));
      dispatch(setOnboarding(onboarding));
      navigation.navigate('SignInScreen');
    }
    if (!active) {
      setActive(true);
      const snapshot = await makeImageFromView(ref);
      setOverlay(snapshot);
      await wait(80);
      setCurrentIndex((prev) => prev + 1);
      mask.value = withTiming(SCREEN_HEIGHT, { duration: 1000 });
      buttonVal.value = withTiming(buttonVal.value + SCREEN_HEIGHT);
      await wait(1000);
      setOverlay(null);
      mask.value = 0;
      setActive(false);
    }
  };

  const handlePressPagination = async (index: number) => {
    if (!active) {
      setActive(true);
      const snapshot = await makeImageFromView(ref);
      setOverlay(snapshot);
      await wait(80);
      setCurrentIndex(index);
      mask.value = withTiming(SCREEN_HEIGHT, { duration: 1000 });
      buttonVal.value = withTiming(SCREEN_HEIGHT * index);
      await wait(1000);
      setOverlay(null);
      mask.value = 0;
      buttonVal.value = SCREEN_HEIGHT * index;
      setActive(false);
    }
  };

  return (
    <View style={styles.container}>
      <View ref={ref} collapsable={false}>
        {data.map((item, index) => {
          return currentIndex === index && <RenderItem item={item} key={index} />;
        })}
      </View>
      {overlay && (
        <Canvas style={StyleSheet.absoluteFill} pointerEvents={'none'}>
          <Mask
            mode="luminance"
            mask={
              <Group>
                <Circle cx={SCREEN_WIDTH / 2} cy={SCREEN_HEIGHT - 160} r={SCREEN_HEIGHT} color="white" />
                <Circle cx={SCREEN_WIDTH / 2} cy={SCREEN_HEIGHT - 160} r={mask} color="black" />
              </Group>
            }>
            <Image image={overlay} x={0} y={0} width={overlay.width() / pd} height={overlay.height() / pd} />
          </Mask>
        </Canvas>
      )}
      <CustomButton handlePress={handlePress} buttonVal={buttonVal} />
      <Pagination data={data} buttonVal={buttonVal} handlePressPagination={handlePressPagination} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  credit: {
    position: 'absolute',
    bottom: 22,
    color: 'white',
  },
});
