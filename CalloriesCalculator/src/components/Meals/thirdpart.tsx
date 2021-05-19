import React from 'react';
import styled from 'styled-components/native';
import {Button, ButtonText} from '../Home/index';
const View = styled.View`
  width: 100%;
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  flex: 1;
`;
const ThirdPart: React.FC = () => {
  return (
    <View>
      <Button>
        <ButtonText>Add new meal</ButtonText>
      </Button>
    </View>
  );
};

export default ThirdPart;
