import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {SecondTypeProps} from '../../types/common/main';
import {GeneralRealm} from '../../schemas/general.schema';
import {IMeal} from '../../schemas/meal.schema';
const PartView = styled.View`
`;
const SecondPart: React.FC<SecondTypeProps> = ({
  mealtype,
}: SecondTypeProps): JSX.Element => {
  useEffect(() => {
    let currenttypemeal: Realm.Results<IMeal> = GeneralRealm.objects('Meal');
    let filteredmeals: Realm.Results<IMeal> = currenttypemeal.filtered(
      `type = "${mealtype}"`,
    );
    console.log(filteredmeals);
  }, [mealtype]);
  return <PartView></PartView>;
};
export default SecondPart;
