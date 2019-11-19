import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';
import { CB_Title, C_Paragraph } from '../../components';

const AboutApp = () => {
  return (
    <ScrollView
      style={{ marginHorizontal: 10 }}
      showsVerticalScrollIndicator={false}
    >
      <CB_Title>Careers Network</CB_Title>
      <C_Paragraph>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quidem,
        consectetur quis id asperiores cupiditate magnam numquam non, aperiam
        maxime facere, perspiciatis eaque assumenda. Commodi, impedit fuga.
        Ipsam quis vel suscipit doloribus dolorum aperiam. Consequuntur
        praesentium delectus neque velit numquam ipsum! Iusto voluptas quia
        accusamus amet ducimus expedita consequatur blanditiis!
      </C_Paragraph>

      <Divider style={{ marginTop: 20 }} />
      <CB_Title>Technologies Used</CB_Title>
      <C_Paragraph>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quidem,
        consectetur quis id asperiores cupiditate magnam numquam non, aperiam
        maxime facere, perspiciatis eaque assumenda. Commodi, impedit fuga.
        Ipsam quis vel suscipit doloribus dolorum aperiam. Consequuntur
        praesentium delectus neque velit numquam ipsum! Iusto voluptas quia
        accusamus amet ducimus expedita consequatur blanditiis!
      </C_Paragraph>
      <C_Paragraph>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero quidem,
        consectetur quis id asperiores cupiditate magnam numquam non, aperiam
        maxime facere, perspiciatis eaque assumenda. Commodi, impedit fuga.
        Ipsam quis vel suscipit doloribus dolorum aperiam. Consequuntur
        praesentium delectus neque velit numquam ipsum! Iusto voluptas quia
        accusamus amet ducimus expedita consequatur blanditiis!
      </C_Paragraph>
    </ScrollView>
  );
};

export default AboutApp;
