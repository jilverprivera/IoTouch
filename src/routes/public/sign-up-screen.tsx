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
import { zodResolver } from '@hookform/resolvers/zod';
import { Canvas, LinearGradient, RoundedRect, vec } from '@shopify/react-native-skia';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { z } from 'zod';
import { Container } from '../../components/layout/container';
import { CustomTextInput } from '../../components/ui/text-input';
import { onAuthUser, onSetSession } from '../../modules/authentication/slices';
import supabase from '../../utils/lib/supabase';
import { useAppDispatch } from '../../utils/hooks';
import { FONT_FAMILY, SCREEN_WIDTH } from '../../utils/constants';
import { LocationDropdown } from '../../modules/authentication/components/location-dropdown';
import { RootStackParamList } from '../stack-navigator';

type FormProps = {
  firstName: string;
  secondName: string;
  firstSurname: string;
  secondSurname: string;
  location: string;
  email: string;
  password: string;
};

const formSchema = z.object({
  firstName: z.string().min(2, 'Campo "Primer nombre" debe tener al menos 2 caracteres.'),
  secondName: z.string(),
  firstSurname: z.string().min(2, 'Campo "Primer apellido" debe tener al menos 2 caracteres.'),
  secondSurname: z.string(),
  email: z.string().email('Ingrese correo electrónico válido.').min(1, 'Campo "Correo electrónico" es requerido.'),
  password: z.string().min(8, 'Campo "Contraseña" debe tener al menos 8 caracteres.'),
});

export function SignUpScreen({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList> }) {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      secondName: '',
      firstSurname: '',
      secondSurname: '',
      email: 'jilverrivera1@gmail.com',
      password: '123456789',
    },
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
          Crear
        </Text>
        <Text className="text-5xl text-neutral-50" style={{ fontFamily: FONT_FAMILY.bold }}>
          cuenta.
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ width: SCREEN_WIDTH * 0.91 }}
        className="mb-2">
        <View className="flex flex-row items-center justify-between">
          <View style={{ width: SCREEN_WIDTH / 2 - 24 }}>
            <CustomTextInput
              label="Primer nombre"
              name="firstName"
              keyboardType="default"
              secureTextEntry={false}
              editable={!isSubmitting}
              errors={errors}
              getValues={getValues}
              setValue={setValue}
            />
          </View>
          <View style={{ width: SCREEN_WIDTH / 2 - 24 }}>
            <CustomTextInput
              label="Segundo nombre"
              name="secondName"
              keyboardType="default"
              secureTextEntry={false}
              editable={!isSubmitting}
              errors={errors}
              getValues={getValues}
              setValue={setValue}
            />
          </View>
        </View>

        <View className="flex flex-row items-center justify-between">
          <View style={{ width: SCREEN_WIDTH / 2 - 24 }}>
            <CustomTextInput
              label="Primer apellido"
              name="firstSurname"
              keyboardType="default"
              secureTextEntry={false}
              editable={!isSubmitting}
              errors={errors}
              getValues={getValues}
              setValue={setValue}
            />
          </View>
          <View style={{ width: SCREEN_WIDTH / 2 - 24 }}>
            <CustomTextInput
              label="Segundo apellido"
              name="secondSurname"
              keyboardType="default"
              secureTextEntry={false}
              editable={!isSubmitting}
              errors={errors}
              getValues={getValues}
              setValue={setValue}
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="pb-1 text-base text-white" style={{ fontFamily: FONT_FAMILY.semibold }}>
            Ubicación
          </Text>
          <LocationDropdown />
        </View>

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
        // onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}>
        <Canvas style={{ height: 56, width: SCREEN_WIDTH * 0.91 }}>
          <RoundedRect x={0} y={0} width={SCREEN_WIDTH * 0.91} height={56} r={12}>
            <LinearGradient start={vec(0, 0)} end={vec(SCREEN_WIDTH * 0.91, 48)} colors={['#fde047', '#ec4899']} />
          </RoundedRect>
        </Canvas>
        <Text className="absolute text-lg text-white" style={[{ fontFamily: FONT_FAMILY.semibold }]}>
          Registrarse
        </Text>
      </TouchableOpacity>

      <View className="flex flex-row items-center justify-center">
        <Text className="text-base text-neutral-500 tracking-tight" style={{ fontFamily: FONT_FAMILY.semibold }}>
          ¿Tienes cuenta?
        </Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('SignInScreen')}>
          <Text className="ml-1 text-base text-pink-500 tracking-tight" style={{ fontFamily: FONT_FAMILY.semibold }}>
            Inicia sesión
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </Container>
  );
}
