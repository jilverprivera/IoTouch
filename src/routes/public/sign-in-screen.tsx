import { useCallback } from 'react';
import { KeyboardAvoidingView, Text, View, Platform, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import Animated from 'react-native-reanimated';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container } from '../../components/layout';
import { CustomTextInput } from '../../components/ui/text-input';
import supabase from '../../utils/lib/supabase';
import { useAppDispatch } from '../../utils/hooks';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../utils/constants';
import { onAuthUser, onSetSession } from '../../config/redux/slices';

export type FormProps = {
  email: string;
  password: string;
};

const formSchema = z.object({
  email: z.string().email('Ingrese correo electrónico válido.').min(1, 'Campo "Correo electrónico" es requerido.'),
  password: z.string().min(8, 'Campo "Correo electrónico" debe tener al menos 8 caracteres.'),
});

export function SignInScreen() {
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
      <View className="flex items-center justify-center mx-auto my-24" style={{ width: SCREEN_WIDTH * 0.9 }}>
        <Text className="text-xl font-medium mb-2">Iniciar sesión</Text>
        <Text className="text-base font-medium">Bienvenido de nuevo</Text>
      </View>
      <KeyboardAvoidingView
        className="mb-12"
        style={{ width: SCREEN_WIDTH * 0.9 }}
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
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full mt-4 mx-auto flex flex-row items-center justify-center border border-gray-800 rounded-lg h-14 bg-gray-800"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}>
          <Text className="text-white">Iniciar sesión</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Container>
  );
}
