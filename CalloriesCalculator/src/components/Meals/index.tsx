import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {GeneralRealm} from '../../schemas/general.schema';
import {IMeal} from './../../schemas/meal.schema';
const Meals = styled.View`
  display: flex;
`;
export const MealComponent: React.FC = (): JSX.Element => {
  const [meals, setmeals] = useState<Realm.Results<IMeal> | []>([]);
  useEffect(() => {
    let allmeal: Realm.Results<IMeal> = GeneralRealm.objects('Meal');
    console.log(allmeal);
    setmeals(allmeal);
  }, []);
  return <Meals></Meals>;
};
