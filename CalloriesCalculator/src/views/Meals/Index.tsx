import React from 'react';
import styled from 'styled-components/native';
import {MealComponent} from '../../components/Meals/index';
const ScrollView = styled.ScrollView`
  background-color: #fff8ee;
`;

const MealView: React.FC = (): JSX.Element => {
  return (
    <ScrollView>
      <MealComponent />
    </ScrollView>
  );
};

export default MealView;
