import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Button from '../components/Button';
import scale from '../config/scale';
import config from '../config';
import * as screenName from '../router/screenNames';
import {isRxDatabase, isRxCollection} from 'rxdb';

import seederABL from '../utils/dummy-data/seeder10k.json';
import schemas from "../database/schemas";

export default ({navigation, route, database}) => {
  const [isSync, setIsSync] = React.useState(false);
  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={config.color.common.darkRed}
      />
      <Button
        placeholder={'Sentinel ABL'}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
        onPress={() => navigation.navigate(screenName.ABL)}
      />
      <Button
        placeholder={'Sentinel BUMA'}
        buttonStyle={[styles.button, {marginTop: scale(5)}]}
        textStyle={styles.buttonText}
        onPress={() => navigation.navigate(screenName.BUMA)}
      />
      <Button
        placeholder={'Sync'}
        buttonStyle={[styles.buttonSync, {marginTop: scale(5)}]}
        textStyle={styles.buttonText}
        onPress={async () => {
            setIsSync(true)
            console.log('database', isRxDatabase(database));
            console.log('isRxCollection abl:', isRxCollection(database.abl));

            if(!isRxCollection(database.abl)){
                await database.collection({
                    name: 'abl',
                    schema: schemas.ABL,
                })
                console.log('isRxCollection abl (!):', isRxCollection(database.abl));
            }

            await database.abl.pouch.bulkDocs({docs: seederABL})

            console.log('done do bulkDocs');

            setIsSync(false)
        }}
        disabled={isSync}
      />
      <Button
        onPress={async () => {
            console.log('run remove collection')

            await database.abl.remove();
            await database.buma.remove();
            if(!isRxCollection(database.abl)){
                await database.collection({
                    name: 'abl',
                    schema: schemas.ABL,
                })
                console.log('isRxCollection abl:', isRxCollection(database.abl));
            }
            if(!isRxCollection(database.buma)){
                await database.collection({
                    name: 'buma',
                    schema: schemas.BUMA,
                })

                console.log('isRxCollection buma:', isRxCollection(database.buma));
            }
        }}
        buttonStyle={[styles.buttonSync, {marginTop: scale(5)}]}
        textStyle={styles.saveButtonText}
        placeholder={'Reset Database'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flex: 1,
    padding: scale(30),
    backgroundColor: config.color.background,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: config.color.common.darkRed,
    padding: scale(12),
    margin: scale(5),
    marginTop: scale(32),
  },
  buttonSync: {
    backgroundColor: config.color.common.gray,
    padding: scale(12),
    margin: scale(5),
    marginTop: scale(32),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: config.fontSize.medium,
    textAlign: 'center',
  },
});
