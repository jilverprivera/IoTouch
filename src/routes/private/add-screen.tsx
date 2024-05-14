import { Text, TouchableOpacity, View } from 'react-native';
import { Container } from '../../components/layout/container';
import { FONT_FAMILY } from '../../utils/constants';
import { useState } from 'react';
import { CreateArea } from '../../modules/spaces/create-area-form';

export const AddScreen = () => {
  const buttonActions = [
    { label: 'Añadir espacio' },
    { label: 'Añadir controlador' },
    { label: 'Añadir dispositivo' },
    { label: 'Añadir compañero' },
  ];

  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  return (
    <Container initAtStart={true}>
      <View className=" top-4 flex flex-row items-center justify-between">
        {buttonActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            className={`w-20 h-20 flex flex-col items-center justify-center border rounded-xl mx-2 ${
              selectedButton === index ? 'bg-neutral-300 border-neutral-200' : 'bg-neutral-100 border-neutral-200'
            }`}
            onPress={() => setSelectedButton(index)}>
            <Text style={{ fontFamily: FONT_FAMILY.medium }} className="text-xs text-center">
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>{selectedButton === 0 && <CreateArea />}</View>
    </Container>
  );
};

// <View className="absolute bottom-28 flex flex-row items-center justify-between">
//   <TouchableOpacity className="bg-neutral-100 border-neutral-200 w-20 h-20 flex flex-col items-center justify-center border rounded-xl">
//     <Text style={{ fontFamily: FONT_FAMILY.medium }} className="text-xs text-center">
//       Añadir espacio
//     </Text>
//   </TouchableOpacity>
//   <TouchableOpacity className="bg-neutral-100 border-neutral-200 w-20 h-20 flex flex-col items-center justify-center border rounded-xl mx-2">
//     <Text style={{ fontFamily: FONT_FAMILY.medium }} className="text-xs text-center">
//       Añadir controlador
//     </Text>
//   </TouchableOpacity>
//   <TouchableOpacity className="bg-neutral-100 border-neutral-200 w-20 h-20 flex flex-col items-center justify-center border rounded-xl">
//     <Text style={{ fontFamily: FONT_FAMILY.medium }} className="text-xs text-center">
//       Añadir dispositivo
//     </Text>
//   </TouchableOpacity>
// </View>;
