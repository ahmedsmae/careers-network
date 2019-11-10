import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import AboutAppScreen from '../screens/about/about-app.component';
import AboutDevScreen from '../screens/about/about-dev.component';

import Colors from '../constants/colors';

export default aboutNavigator = createMaterialTopTabNavigator(
  {
    AboutApp: {
      screen: AboutAppScreen,
      navigationOptions: {
        tabBarLabel: 'Application'
      }
    },
    AboutDev: {
      screen: AboutDevScreen,
      navigationOptions: {
        tabBarLabel: 'Developer'
      }
    }
  },
  {
    tabBarOptions: {
      labelStyle: {
        paddingTop: 25,
        fontSize: 14,
        fontWeight: 'bold',
        paddingBottom: 5
      },
      style: {
        backgroundColor: Colors.PRIMARY
      }
    }
  }
);
