import React from 'react';
import styled from 'styled-components/native';
import {MealComponent} from '../../components/Meals/index';
import ThirdPart from '../../components/Meals/thirdpart';
const ScrollView = styled.View`
  background-color: #fff8ee;
  flex: 1;
`;

const MealView: React.FC = (): JSX.Element => {
  return (
    <ScrollView>
      <MealComponent />
      <ThirdPart />
    </ScrollView>
  );
};

export default MealView;
