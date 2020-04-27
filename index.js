/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import RouterApp from './src/router';
import {name as appName} from './app.json';

import database from './src/database';

const App = RouterApp({database});

AppRegistry.registerComponent(appName, () => App);
