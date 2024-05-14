import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Container } from '../../components/layout/container';
import { Greetings } from '../../modules/dashboard';
import { FONT_FAMILY, WINDOW_WIDTH } from '../../utils/constants';

const data = [
  { id: 1, name: 'Area 1' },
  { id: 2, name: 'Area 2' },
  { id: 3, name: 'Area 3' },
  { id: 4, name: 'Area 4' },
  { id: 5, name: 'Area 5' },
  { id: 6, name: 'Area 6' },
  { id: 7, name: 'Area 7' },
  { id: 8, name: 'Area 8' },
];
const data2 = [
  { id: 1, name: 'Area 1' },
  { id: 2, name: 'Area 2' },
  { id: 3, name: 'Area 3' },
  { id: 4, name: 'Area 4' },
];

const Item = () => {
  return (
    <View
      style={{
        width: (WINDOW_WIDTH * 0.9 - 16) / 2,
        height: (WINDOW_WIDTH * 0.9 - 16) / 2,
      }}
      className="flex items-center justify-center mb-4 mr-4 border border-neutral-700  bg-neutral-900 rounded-xl"
    />
  );
};

export const DashboardScreen = () => {
  return (
    <Container initAtStart={true}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Greetings />
        <View className="w-full px-4 pt-4 bg-neutral-800 rounded-2xl mt-4">
          <View className="flex flex-row items-center justify-between mb-4">
            <Text className="text-2xl" style={{ fontFamily: FONT_FAMILY.semibold }}>
              Espacios
            </Text>
            <TouchableOpacity className="py-2 px-4">
              <Text className="text-base text-gray-500" style={{ fontFamily: FONT_FAMILY.semibold }}>
                Añadir espacio
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={{ width: WINDOW_WIDTH * 0.9 }}
            className="mx-auto "
            data={data}
            numColumns={2}
            renderItem={Item}
            keyExtractor={(item) => item.id.toString()} // Convert the id to a string
          />
        </View>

        <View className="w-full px-4 pt-4 bg-white rounded-2xl mt-4 mb-8">
          <View className="flex flex-row items-center justify-between mb-4">
            <Text className="text-2xl " style={{ fontFamily: FONT_FAMILY.semibold }}>
              Espacios compartidos
            </Text>
            <TouchableOpacity className="py-2 px-4 ">
              <Text className="text-base text-gray-500" style={{ fontFamily: FONT_FAMILY.semibold }}>
                Ver todos (8)
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={{ width: WINDOW_WIDTH * 0.9 }}
            className="mx-auto "
            data={data2}
            numColumns={2}
            renderItem={Item}
            keyExtractor={(item) => item.id.toString()} // Convert the id to a string
          />
        </View>
      </ScrollView>
    </Container>
  );
};
