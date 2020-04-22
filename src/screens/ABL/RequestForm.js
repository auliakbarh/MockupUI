import React from 'react';
import {View, Text, StyleSheet, StatusBar, Picker, Alert} from 'react-native';

import config from '../../config';
import scale from '../../config/scale';
import {textStyles} from '../../config/styles';
import TextInput from '../../components/TextInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/Button';

const RequestForm = ({database, navigation, route}) => {
  const [tipeRequest, setTipeRequest] = React.useState('Perizinan');
  const [judulRequest, setJudulRequest] = React.useState('');
  const [alasan, setAlasan] = React.useState('');

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSyncing, setIsSyncing] = React.useState(false);
  const submit = async database => {
    setIsSubmitting(true);

    const data = {
      judulRequest,
      tipeRequest,
      alasan,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    console.log('data:', data);

    const dump = await database.abl.dump();
    const id = (dump.docs.length + 1).toString();

    let result = await database.abl.insert({
      id,
      judulRequest: data.judulRequest,
      detailLaporan: 'Dummy detail laporan',
      lokasi: 'dummy location',
      subLokasi: 'dummy sublocation',
      detailLokasi: 'dummy detail lokasi',
      createdAt: data.createdAt.toString(),
      createdBy: 'dummy created by',
      updatedAt: data.updatedAt.toString(),
      updatedBy: 'dummy updated by',
      deletedBy: '',
    });

    console.log('result', result);

    try {
      if (result) {
        Alert.alert('Pemberitahuan', 'Data berhasil disimpan.');
        setIsSubmitting(false);
        setTipeRequest('Perizinan');
        setJudulRequest('');
        setAlasan('');
      } else {
        Alert.alert('Pemberitahuan', 'Data gagal disimpan.');
        setIsSubmitting(false);
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'Data gagal disimpan.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={config.color.background}
      />
      <View style={styles.mainContainer}>
        <View style={styles.centeredContent}>
          <Icon name="rocket" size={50} color={config.color.common.darkRed} />
          <Text style={styles.text}>Request Form</Text>
        </View>

        <TextInput
          placeholder={'Judul Request'}
          onChangeText={text => setJudulRequest(text)}
          value={judulRequest}
        />

        <View style={styles.lokasi}>
          <Text style={{flex: 1}}>Tipe Request</Text>
          <Picker
            // mode={'dropdown'}
            selectedValue={tipeRequest}
            style={{flex: 3, height: 50}}
            onValueChange={(itemValue, itemIndex) => setTipeRequest(itemValue)}>
            <Picker.Item label="Perizinan" value="Perizinan" />
            <Picker.Item label="Pengajuan" value="Pengajuan" />
            <Picker.Item label="Lain-lain" value="Lain-lain" />
          </Picker>
        </View>

        <TextInput
          placeholder={'Alasan'}
          onChangeText={text => setAlasan(text)}
          value={alasan}
        />

        <Button
          onPress={() => submit(database)}
          disabled={isSubmitting}
          buttonStyle={styles.saveButton}
          textStyle={styles.saveButtonText}
          placeholder={'Submit'}
        />
      </View>
    </>
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
    // borderRadius: scale(16),
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

export default RequestForm;
