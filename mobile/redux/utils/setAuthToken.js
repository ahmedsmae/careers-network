import axios from 'axios';
import { AsyncStorage } from 'react-native';

export default setAuthToken = async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
