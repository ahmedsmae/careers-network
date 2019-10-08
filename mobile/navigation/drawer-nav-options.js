import { Dimensions } from 'react-native';
import Colors from '../constants/colors';

import CustomDrawer from '../components/custom-drawer/custom-drawer.component';

export default drawerNavOptions = {
  contentComponent: CustomDrawer,
  drawerWidth: Dimensions.get('window').width * 0.7,
  drawerPosition: 'left',
  contentOptions: {
    activeTintColor: Colors.ACCENT,
    labelStyle: {
      fontFamily: 'open-sans-bold'
    }
  }
};
