import React from 'react';
import styled from 'styled-components/native';
const ScrollView = styled.ScrollView`
  background-color: #fff8ee;
`;
import {HomeComponent} from '../../components/Home/index';
import {Params} from '../../types/common/main';
const HomeView: React.FC<Params> = ({navigation}: Params): JSX.Element => {
  const savedProductsHandle: Function = (): void => {
    navigation.navigate('Product');
  };
  const mealNavigateHandle: Function = (): void => {
    navigation.navigate('Meal');
  };
  return (
    <ScrollView>
      <HomeComponent
        savedProductHandle={savedProductsHandle}
        mealNavigateHandle={mealNavigateHandle}
      />
    </ScrollView>
  );
};
export default HomeView;
