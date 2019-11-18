import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View } from 'react-native';
import PopupApi from '../popup-api/popup-api.component';

import { selectPopupApi } from '../../redux/api-utilities/api-utilities.selectors';

const ApiContainer = ({ popupApi }) => {
  return <View>{popupApi.show && <PopupApi />}</View>;
};

const mapStateToProps = createStructuredSelector({
  popupApi: selectPopupApi
});

export default connect(mapStateToProps)(ApiContainer);
