import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Button from '../components/Button';
import scale from '../config/scale';
import config from '../config';
import * as screenName from '../router/screenNames';

export default ({navigation, route, database}) => {
  const [isSync, setIsSync] = React.useState(false);

  const clear = database => {
      database.write(() => {
          database.deleteAll();
      });
  }

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
        onPress={() => console.log('sync function not set yet')}
        disabled={isSync}
      />
      <Button
        onPress={() => clear(database)}
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
