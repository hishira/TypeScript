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
type ThirdPartProps = {
  clickhandle: Function;
};
const ThirdPart: React.FC<ThirdPartProps> = ({clickhandle}) => {
  return (
    <View>
      <Button onPress={clickhandle}>
        <ButtonText>Add new meal</ButtonText>
      </Button>
    </View>
  );
};

export default ThirdPart;
