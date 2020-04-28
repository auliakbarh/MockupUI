import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Picker,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import config from '../../config';
import scale from '../../config/scale';
import {textStyles} from '../../config/styles';

import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import endpoint from '../../config/endpoint';
import {getUNIXTS} from '../../utils/UNIXTS';

const myIcon = (
  <Icon
    name="hazard-lights"
    size={scale(50)}
    color={config.color.common.darkRed}
  />
);

const HazardFormComponent = ({database, navigation, route}) => {
  const [judulHazard, setJudulHazard] = React.useState('');
  const [detailLaporan, setDetailLaporan] = React.useState('');
  const [lokasi, setLokasi] = React.useState('Lain-lain');
  const [subLokasi, setSubLokasi] = React.useState('Lain-lain');
  const [detailLokasi, setDetailLokasi] = React.useState('');

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const submit = database => {
    setIsSubmitting(true);

    const lastUser = database.objects('Hazard').sorted('id', true)[0];
    const highestId = lastUser == null ? 0 : lastUser.id;

    let data = {
      created_at: getUNIXTS(),
      waktuLaporan: getUNIXTS(),
      judulHazard,
      detailLaporan,
      lokasi,
      subLokasi,
      detailLokasi,
    };

    data.id = highestId == null ? 1 : highestId + 1;

    console.log('data', data)

    let newHazard = null;

    function validation(data, isNumber = false) {
      if (isNumber && typeof data === 'number') {
        return data !== 0;
      }
      return data !== '';
    }

    try {
      if (
          validation(data.waktuLaporan, true) &&
          validation(data.judulHazard) &&
          validation(data.detailLaporan) &&
          validation(data.lokasi) &&
          validation(data.subLokasi) &&
          validation(data.detailLokasi)
      ) {
        console.log('do insert record to database.');
        database.write(() => {
          newHazard = database.create('Hazard', data);
          console.log(newHazard)
        });
      }
    } catch (e) {
      console.log(e);
    }

    if (newHazard) {
      Alert.alert('Pemberitahuan', 'Data berhasil disimpan.');
      setIsSubmitting(false);
      setJudulHazard('');
      setDetailLaporan('');
      setLokasi('Lain-lain');
      setSubLokasi('Lain-lain');
      setDetailLokasi('');
    } else {
      Alert.alert('Pemberitahuan', 'Data gagal disimpan.');
      setIsSubmitting(false);
    }

    return null;
  };

  const submitToAPI = async () => {
    setIsSubmitting(true);

    const data = {
      waktuLaporan: getUNIXTS(),
      judulHazard,
      detailLaporan,
      lokasi,
      subLokasi,
      detailLokasi,
    };

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const url = `${config.api}${endpoint.submit}`;
    const requestBody = {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
      timeout: 500,
    };

    const result = await fetch(url, requestBody)
      .then(response => response.json())
      .then(responseJson => {
        return (
          responseJson.status === 200 &&
          responseJson.message === 'Success created'
        );
      })
      .catch(error => {
        console.error(error);
        return false;
      });

    if (result) {
      Alert.alert('Pemberitahuan', 'Data berhasil dikirim.');
      setIsSubmitting(false);
    } else {
      Alert.alert('Pemberitahuan', 'Data gagal dikirim.');
      setIsSubmitting(false);
    }
  };

  const generate = async database => {
    try {
      setIsGenerating(true);

      const doneGenerating = false;

      if (doneGenerating) {
        setIsGenerating(false);
        Alert.alert('Pemberitahuan', 'Berhasil generate dummy data');
      } else {
        setIsGenerating(false);
        Alert.alert('Pemberitahuan', 'Gagal generate dummy data');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={config.color.common.darkRed}
      />
      <View style={styles.mainContainer}>
        <View style={styles.centeredContent}>
          {myIcon}
          <Text style={styles.text}>Hazard Form</Text>
        </View>

        <TextInput
          placeholder={'Judul Hazard'}
          onChangeText={text => setJudulHazard(text)}
          value={judulHazard}
        />
        <TextInput
          placeholder={'Detail Laporan'}
          onChangeText={text => setDetailLaporan(text)}
          value={detailLaporan}
        />
        <View style={styles.lokasi}>
          <Text style={{flex: 1}}>Lokasi</Text>
          <Picker
            // mode={'dropdown'}
            selectedValue={lokasi}
            style={{flex: 3, height: 50}}
            onValueChange={(itemValue, itemIndex) => setLokasi(itemValue)}>
            <Picker.Item label="Lain-lain" value="Lain-lain" />
            <Picker.Item label="Neo SOHO" value="Neo SOHO" />
          </Picker>
        </View>

        <View style={styles.lokasi}>
          <Text style={{flex: 1}}>Sub Lokasi</Text>
          <Picker
            selectedValue={subLokasi}
            style={{flex: 3, height: 50}}
            onValueChange={itemValue => setSubLokasi(itemValue)}>
            <Picker.Item label="Lain-lain" value="Lain-lain" />
            <Picker.Item label="Lantai 30" value="Lantai 30" />
            <Picker.Item label="Lobby" value="Lobby" />
          </Picker>
        </View>

        <TextInput
          placeholder={'Detail Lokasi'}
          onChangeText={text => setDetailLokasi(text)}
          value={detailLokasi}
        />

        <Button
          onPress={() => submit(database)}
          disabled={isSubmitting}
          buttonStyle={styles.saveButton}
          textStyle={styles.saveButtonText}
          placeholder={'Submit'}
        />
        <Button
          onPress={() => generate(database)}
          disabled={isGenerating}
          buttonStyle={[styles.saveButton, {marginTop: scale(5)}]}
          textStyle={styles.saveButtonText}
          placeholder={'Generate Dummy Data'}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flex: 1,
    padding: scale(30),
    backgroundColor: config.color.background,
  },
  lokasi: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: scale(6),
  },
  centeredContent: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...textStyles.main,
    fontSize: config.fontSize.xlarge,
    marginTop: scale(8),
    marginBottom: scale(32),
  },
  saveButton: {
    // borderRadius: scale(8),
    backgroundColor: config.color.common.darkRed,
    padding: scale(12),
    margin: scale(5),
    marginTop: scale(32),
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: config.fontSize.medium,
    textAlign: 'center',
  },
});

export default HazardFormComponent;
