import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { MaterialIcons } from '@expo/vector-icons';
import { FONT_FAMILY, SCREEN_WIDTH } from '../../../utils/constants';
import { countryData } from '../../../utils/data/country-data';

export const LocationDropdown = () => {
  return (
    <SelectDropdown
      data={countryData}
      onSelect={(selectedItem) => console.log(selectedItem)}
      renderButton={(selectedItem, isOpened) => (
        <View style={{ ...styles.dropdownButtonStyle }}>
          <Text style={{ ...styles.dropdownButtonTxtStyle, fontFamily: FONT_FAMILY.medium }}>
            {(selectedItem && selectedItem.name) || 'Selecciona país'}
          </Text>
          <MaterialIcons name={isOpened ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} color="#fafafa" />
        </View>
      )}
      renderItem={(item, _i, isSelected) => (
        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#404040' }) }}>
          <Text style={{ ...styles.dropdownItemTxtStyle, fontFamily: FONT_FAMILY.medium }}>{item.name}</Text>
        </View>
      )}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: SCREEN_WIDTH * 0.91,
    height: 56,
    backgroundColor: '#262626',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    color: '#fafafa',
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#fafafa',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    width: SCREEN_WIDTH * 0.91,
    backgroundColor: '#262626',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: SCREEN_WIDTH * 0.91,
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    color: '#fafafa',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
