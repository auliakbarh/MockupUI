import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

/**
 * Screen
 */
import Home from '../../screens';
import * as screenName from '../screenNames';
import config from '../../config';
import NavigationBUMA from './BUMA';
import NavigationABL from './ABL';

const Stack = createStackNavigator();

export default class SwitchAppNavigator extends Component {
  constructor(props) {
      super(props);

      this.state = {
          database: null,
      };
  }

  async componentDidMount(){
      this.setState({
          database: await this.props.database(),
      });
  }

  render() {
      const {database} = this.state;
      return (
          <Stack.Navigator
              initialRouteName={screenName.HOME}
              headerMode={'float'}
              screenOptions={{
                  headerTintColor: 'white',
                  headerStyle: {backgroundColor: config.color.common.darkRed},
              }}>
              <Stack.Screen name={screenName.HOME}>
                  {function({navigation, route}) {
                      return (
                          <Home navigation={navigation} route={route} database={database} />
                      );
                  }}
              </Stack.Screen>
              <Stack.Screen name={screenName.BUMA}>
                  {function() {
                      return <NavigationBUMA database={database} />;
                  }}
              </Stack.Screen>
              <Stack.Screen name={screenName.ABL}>
                  {function() {
                      return <NavigationABL database={database} />;
                  }}
              </Stack.Screen>
          </Stack.Navigator>
      );
  }
}
