import React, {useState} from 'react';
import styled from 'styled-components/native';
import FirstPart from './firstpart';
import SecondPart from './secondpart';
const Meals = styled.ScrollView`
  display: flex;
  height: 100%;
  flex: 1;
`;
export const MealComponent: React.FC = (): JSX.Element => {
  const [mealtype, setmealtype] = useState<string>('breakfast');

  const selectMealTypeHandle: Function = (mealtypevalue: string): void => {
    setmealtype(mealtypevalue);
  };

  return (
    <Meals>
      <FirstPart selectMealType={selectMealTypeHandle} />
      <SecondPart mealtype={mealtype} />
    </Meals>
  );
};
