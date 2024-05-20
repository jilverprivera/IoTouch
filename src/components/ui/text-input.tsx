import { FieldErrors, FieldValues } from 'react-hook-form';
import { Text, TextInput, View, KeyboardTypeOptions } from 'react-native';
import { FONT_FAMILY } from '../../utils/constants';

type props<T extends FieldValues> = {
  label: string;
  name: keyof T;
  placeholder?: string;
  keyboardType: KeyboardTypeOptions;
  secureTextEntry: boolean;
  editable: boolean;
  errors: FieldErrors<T>;
  setValue: (field: keyof T, value: any) => void;
  getValues: (field: keyof T) => string;
};

export function CustomTextInput<T extends FieldValues>({
  label,
  name,
  placeholder,
  keyboardType,
  secureTextEntry = false,
  editable = false,
  errors,
  getValues,
  setValue,
}: props<T>) {
  return (
    <View className="w-full mx-auto mb-4">
      <Text className="pb-1 text-base text-white" style={{ fontFamily: FONT_FAMILY.semibold }}>
        {label}
      </Text>
      <TextInput
        id={name as string}
        key={name as string}
        placeholder={placeholder}
        autoCorrect={false}
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onChangeText={(value) => setValue(name, value)}
        defaultValue={getValues(name)}
        editable={editable}
        className="py-2.5 px-4 rounded-xl bg-neutral-800 border border-neutral-800 text-lg text-neutral-200"
      />
      {errors[name]?.message && typeof errors[name]?.message === 'string' && (
        <Text className="my-2">{errors[name]?.message as string}</Text>
      )}
    </View>
  );
}
