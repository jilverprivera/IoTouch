import { useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  View,
  Platform,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesome6 } from '@expo/vector-icons';
import { Canvas, LinearGradient, Rect, RoundedRect, vec } from '@shopify/react-native-skia';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Container } from '../../components/layout/container';
import { onAuthUser, onSetSession } from '../../modules/authentication/slices';
import { CustomTextInput } from '../../components/ui/text-input';
import supabase from '../../utils/lib/supabase';
import { useAppDispatch } from '../../utils/hooks';
import { FONT_FAMILY, SCREEN_WIDTH } from '../../utils/constants';
import { RootStackParamList } from '../stack-navigator';

export type FormProps = {
  email: string;
  password: string;
};

const formSchema = z.object({
  email: z.string().email('Ingrese correo electrónico válido.').min(1, 'Campo "Correo electrónico" es requerido.'),
  password: z.string().min(8, 'Campo "Contraseña" debe tener al menos 8 caracteres.'),
});

export function SignInScreen({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList> }) {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: 'jilverrivera1@gmail.com', password: '123456789' },
  });

  const onSubmit = useCallback<SubmitHandler<FormProps>>(async (form) => {
    try {
      formSchema.parse(form);
      const { email, password } = form;
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      const { session } = data;
      if (error) Alert.alert(error.message);
      if (!session) Alert.alert('No session founded!');
      dispatch(onSetSession(session));
      return dispatch(onAuthUser());
    } catch (error) {
      Alert.alert(error as string);
    }
  }, []);

  return (
    <Container initAtStart={true}>
      <View className="w-full flex items-start justify-center mx-auto mt-24 mb-12 px-4">
        <Text className="text-5xl mb-2 text-neutral-50" style={{ fontFamily: FONT_FAMILY.bold }}>
          Bienvenido
        </Text>
        <Text className="text-5xl text-neutral-50" style={{ fontFamily: FONT_FAMILY.bold }}>
          de nuevo.
        </Text>
      </View>

      <View className="w-11/12 flex flex-row items-center justify-between mb-4 ">
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ width: SCREEN_WIDTH / 2 - 24 }}
          className="flex flex-row items-center justify-center border border-neutral-800 bg-white rounded-xl h-14"
          disabled={isSubmitting}>
          <FontAwesome6 name="google" size={24} color="black" />
          <Text className="text-neutral-950 text-base ml-2" style={{ fontFamily: FONT_FAMILY.semibold }}>
            Iniciar sesión
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ width: SCREEN_WIDTH / 2 - 24 }}
          className="flex flex-row items-center justify-center border border-neutral-800 rounded-xl h-14"
          disabled={isSubmitting}>
          <FontAwesome6 name="github" size={24} color="white" />
          <Text className="text-white text-base ml-2" style={{ fontFamily: FONT_FAMILY.semibold }}>
            Iniciar sesión
          </Text>
        </TouchableOpacity>
      </View>

      <View className="w-11/12 mx-auto flex flex-row items-center justify-between my-4">
        <View className="w-40 h-0.5 bg-neutral-800" />
        <Text className="text-base text-neutral-500 tracking-tight" style={{ fontFamily: FONT_FAMILY.bold }}>
          o
        </Text>
        <View className="w-40 h-0.5 bg-neutral-800" />
      </View>

      <KeyboardAvoidingView
        className="mb-2"
        style={{ width: SCREEN_WIDTH * 0.91 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <CustomTextInput
          label="Correo electrónico"
          name="email"
          keyboardType="email-address"
          secureTextEntry={false}
          editable={!isSubmitting}
          errors={errors}
          getValues={getValues}
          setValue={setValue}
        />
        <CustomTextInput
          label="Contraseña"
          name="password"
          keyboardType="default"
          secureTextEntry={true}
          editable={!isSubmitting}
          errors={errors}
          getValues={getValues}
          setValue={setValue}
        />
      </KeyboardAvoidingView>

      <TouchableOpacity
        activeOpacity={0.7}
        className="mx-auto mb-4 flex flex-row items-center justify-center rounded-lg"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}>
        <Canvas style={{ height: 56, width: SCREEN_WIDTH * 0.91 }}>
          <RoundedRect x={0} y={0} width={SCREEN_WIDTH * 0.91} height={56} r={12}>
            <LinearGradient start={vec(0, 0)} end={vec(SCREEN_WIDTH * 0.91, 48)} colors={['#fde047', '#ec4899']} />
          </RoundedRect>
        </Canvas>
        <Text className="absolute text-lg text-white" style={[{ fontFamily: FONT_FAMILY.semibold }]}>
          Iniciar sesión
        </Text>
      </TouchableOpacity>

      <View className="flex flex-row items-center justify-center">
        <Text className="text-base text-neutral-500 tracking-tight" style={{ fontFamily: FONT_FAMILY.semibold }}>
          ¿Aún no tienes cuenta?
        </Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('SignUpScreen')}>
          <Text className="ml-1 text-base text-pink-500 tracking-tight" style={{ fontFamily: FONT_FAMILY.semibold }}>
            Registrarse ahora
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </Container>
  );
}
