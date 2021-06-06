import React, {useState} from 'react';
import styled from 'styled-components/native';
import {MealComponent} from '../../components/Meals/index';
import ThirdPart from '../../components/Meals/thirdpart';
import {ModalMeal} from '../../components/Meals/modalmeal';
const ScrollView = styled.View`
  background-color: #fff8ee;
  flex: 1;
`;

const MealView: React.FC = (): JSX.Element => {
  const [modalopen, setmodalopen] = useState<boolean>(false);
  return (
    <ScrollView>
      <ModalMeal
        open={modalopen}
        closehandle={() => setmodalopen(false)}
        refresh={() => console.log('hi')}
      />
      <MealComponent />
      <ThirdPart clickhandle={() => setmodalopen(true)} />
    </ScrollView>
  );
};

export default MealView;
