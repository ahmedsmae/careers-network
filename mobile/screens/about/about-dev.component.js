import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';
import { CB_Title, C_Paragraph, CB_Paragraph } from '../../components';

const AboutDev = () => {
  return (
    <ScrollView
      style={{ marginHorizontal: 10 }}
      showsVerticalScrollIndicator={false}
    >
      <CB_Title>Developer</CB_Title>
      <C_Paragraph>
        <CB_Paragraph style={{ color: 'red' }}>Lorem ipsum dolor</CB_Paragraph>{' '}
        sit, amet consectetur adipisicing elit. Vero quidem, consectetur quis id
        asperiores cupiditate magnam numquam non, aperiam maxime facere,
        perspiciatis eaque assumenda. Commodi, impedit fuga. Ipsam quis vel
        suscipit doloribus dolorum aperiam. Consequuntur praesentium delectus
        neque velit numquam ipsum! Iusto voluptas quia accusamus amet ducimus
        expedita consequatur blanditiis!
      </C_Paragraph>

      <Divider style={{ marginTop: 20 }} />
      <CB_Title>Education</CB_Title>
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

      <Divider style={{ marginTop: 20 }} />
      <CB_Title>Experience</CB_Title>
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

export default AboutDev;
