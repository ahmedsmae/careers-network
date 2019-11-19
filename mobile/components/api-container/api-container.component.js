import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View } from 'react-native';
import PopupApi from '../popup-api/popup-api.component';

import { selectPopupApi } from '../../redux/api-utilities/api-utilities.selectors';

/**
 * This component is to merge the redux api to App.js file
 * without causing multible rerender to the whole app with every change in the redux api state
 *
 * @param {selector} popupApi
 */
const ApiContainer = ({ popupApi }) => {
  return <View>{popupApi.show && <PopupApi />}</View>;
};

const mapStateToProps = createStructuredSelector({
  popupApi: selectPopupApi
});

export default connect(mapStateToProps)(ApiContainer);
