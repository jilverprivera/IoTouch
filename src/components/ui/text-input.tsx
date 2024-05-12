import { FieldErrors, FieldValues } from 'react-hook-form';
import { Text, TextInput, View, KeyboardTypeOptions } from 'react-native';

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
    <View className="w-full mx-auto">
      <Text className="pb-1 font-medium">{label}</Text>
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
        className="py-2 px-4 rounded-lg bg-white"
      />
      {errors[name]?.message && typeof errors[name]?.message === 'string' && (
        <Text className="my-2">{errors[name]?.message as string}</Text>
      )}
    </View>
  );
}
