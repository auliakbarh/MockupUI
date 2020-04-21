import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import scale from '../../../config/scale';
import config from '../../../config';
import {getDate, getTime} from '../../../utils/DateFormat';
import styles from '../styles/ListHazardStyle';

const HazardItem = ({hazards, onPress}) => (
  <TouchableOpacity onPress={() => onPress(hazards)} style={styles.listHazard}>
    <View style={styles.iconListHazard}>
      <Icon
        name={'hazard-lights'}
        size={scale(23)}
        color={config.color.common.darkRed}
      />
    </View>
    <View style={styles.descListHazard}>
      <Text>{hazards.judulHazard}</Text>
      <Text>{`${hazards.lokasi} - ${hazards.subLokasi}`}</Text>
    </View>
    <View style={styles.timeListHazard}>
      <Text style={styles.time}>{getDate(hazards.createdAt)}</Text>
      <Text style={styles.time}>{getTime(hazards.createdAt)}</Text>
    </View>
  </TouchableOpacity>
);
export default HazardItem
