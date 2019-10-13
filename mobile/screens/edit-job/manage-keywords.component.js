import React, { useState } from 'react';
import { View } from 'react-native';
import {
  TextInput,
  Text,
  Caption,
  IconButton,
  Chip,
  Colors
} from 'react-native-paper';

import AppColors from '../../constants/colors';

const ManageKeywords = ({ keywords, onAddKeyword, onRemoveKeyword }) => {
  const [showAddKeyword, setShowAddKeyword] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ margin: 10, marginBottom: 0, fontSize: 16 }}>
            Keywords
          </Text>
          <Caption style={{ marginLeft: 10 }}>
            Keywords will help employee to reach out your jobs
          </Caption>
        </View>

        <IconButton
          style={{ marginRight: 30 }}
          icon='add'
          size={30}
          onPress={() => setShowAddKeyword(true)}
        />
      </View>

      {showAddKeyword && (
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
            alignItems: 'center',
            marginHorizontal: 10
          }}
        >
          <TextInput
            mode='outlined'
            autoFocus
            placeholder='keyword'
            style={{ flex: 1, backgroundColor: 'transparent' }}
            value={newKeyword}
            onChangeText={setNewKeyword}
          />
          {newKeyword.trim().length > 0 && (
            <IconButton
              style={{ color: 'green', marginRight: 20 }}
              icon='check'
              size={30}
              color={Colors.green500}
              onPress={() => {
                onAddKeyword(newKeyword);
                setShowAddKeyword(false);
                setNewKeyword('');
              }}
            />
          )}
        </View>
      )}

      {keywords && keywords.length > 0 && (
        <View
          style={{
            margin: 10,
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            flexDirection: 'row'
          }}
        >
          {keywords.map((word, index) => (
            <Chip
              key={index}
              onClose={onRemoveKeyword.bind(this, index)}
              style={{
                margin: 2,
                backgroundColor: AppColors.ACCENT
              }}
            >
              {word}
            </Chip>
          ))}
        </View>
      )}
    </View>
  );
};

export default ManageKeywords;
