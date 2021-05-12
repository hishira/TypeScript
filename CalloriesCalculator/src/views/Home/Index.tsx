import React from 'react';
import {ScrollView} from 'react-native';
import {HomeComponent} from '../../components/Home/index';
const HomeView: React.FC = (): JSX.Element => {
  return (
    <ScrollView>
      <HomeComponent />
    </ScrollView>
  );
};
export default HomeView;
