import { Alert, FlatList, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { FONT_FAMILY, SCREEN_WIDTH, WINDOW_WIDTH } from '../../utils/constants';
import { CustomTextInput } from '../../components/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { useEffect, useState } from 'react';
import supabase from '../../utils/lib/supabase';
import { onGetAreaTypes } from '../../config/redux/slices';
import { convertToCamelCase } from '../../utils/helpers/convert-to-camel-case';

export type FormProps = {
  label: string;
  areaTypeId: string;
};

const formSchema = z.object({
  label: z.string().min(1, 'Campo "Nombre de espacio" es requerido.'),
  areaTypeId: z.string().min(1, 'Campo "Tipo de espacio" es requerido.'),
});

export const CreateArea = () => {
  const dispatch = useAppDispatch();
  const { areaTypes } = useAppSelector((state) => state.common);
  const [selected, setSelected] = useState<string | null>(null);

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { label: '', areaTypeId: '' },
  });

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('area_type').select('*');
      if (error) Alert.alert(error.message);
      const convertedData = data?.map((item) => convertToCamelCase(item));
      dispatch(onGetAreaTypes(convertedData));
    })();
  }, []);

  const handleAreaTypePress = (areaTypeId: string) => {
    setSelected(areaTypeId);
    setValue('areaTypeId', areaTypeId);
  };

  return (
    <KeyboardAvoidingView
      className="mb-12 mt-8 "
      style={{ width: SCREEN_WIDTH * 0.91 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <CustomTextInput
        label="Correo electrónico"
        name="label"
        keyboardType="default"
        secureTextEntry={false}
        editable={!isSubmitting}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
      />

      <View className="w-full mx-auto mt-2">
        <Text className="pb-1 font-medium text-base" style={{ fontFamily: FONT_FAMILY.regular }}>
          Tipo de espacio
        </Text>
        <FlatList
          style={{ width: WINDOW_WIDTH * 0.9 }}
          className="mx-auto bg-white rounded-lg"
          data={areaTypes}
          numColumns={1}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              className={`w-full p-3 border-neutral-200 ${index !== areaTypes.length - 1 ? 'border-b' : ''} ${
                item.id === selected ? 'bg-neutral-200' : 'bg-transparent'
              }`}
              onPress={() => handleAreaTypePress(item.id)}>
              <Text
                className="text-sm"
                style={{ fontFamily: item.id === selected ? FONT_FAMILY.semibold : FONT_FAMILY.regular }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
        {errors['areaTypeId']?.message && typeof errors['areaTypeId']?.message === 'string' && (
          <Text className="my-2">{errors['areaTypeId']?.message as string}</Text>
        )}
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        className="w-full mt-4 mx-auto flex flex-row items-center justify-center border border-gray-800 rounded-lg h-14 bg-neutral-900"
        // onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}>
        <Text className="text-white text-base" style={{ fontFamily: FONT_FAMILY.semibold }}>
          Crear espacio
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
