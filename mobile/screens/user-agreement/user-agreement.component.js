import React from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, Divider } from 'react-native-paper';
import { CB_Title, C_Paragraph, CB_Paragraph } from '../../components';

const UserAgreement = ({ navigation }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="User Agreement" />
      </Appbar.Header>

      <ScrollView
        style={{ marginHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <CB_Title>Employee</CB_Title>
        <C_Paragraph>
          <CB_Paragraph style={{ color: 'red' }}>
            Lorem ipsum dolor
          </CB_Paragraph>{' '}
          sit, amet consectetur adipisicing elit. Vero quidem, consectetur quis
          id asperiores cupiditate magnam numquam non, aperiam maxime facere,
          perspiciatis eaque assumenda. Commodi, impedit fuga. Ipsam quis vel
          suscipit doloribus dolorum aperiam. Consequuntur praesentium delectus
          neque velit numquam ipsum! Iusto voluptas quia accusamus amet ducimus
          expedita consequatur blanditiis!
        </C_Paragraph>

        <Divider style={{ marginTop: 20 }} />
        <CB_Title>Employer</CB_Title>
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
        <CB_Title>Admin</CB_Title>
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
    </>
  );
};

export default UserAgreement;
