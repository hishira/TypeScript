import React, {useState} from 'react';
import styled from 'styled-components/native';
import {EmtryProductDTO, ProductDTO} from '../../schemas/product.schema';
import {ModalComponentProps} from '../../types/common/main';
import {Container} from '../Home/index';
const ModalWrapper = styled.Modal`
  border: 2px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const ModalContaierWrapper = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  border: 2px solid red;
  position: relative;
`;
const ModalContainer = styled(Container)`
  width: 60%;
  position: absolute;
  top: 30%;
  left: 20%;
  border-radius: 10px;
  background-color: #dfe0df;
  padding: 20px;
`;
const MainText = styled.Text`
  font-size: 20px;
`;
const NameInputeContainer = styled.View`
  display: flex;
  flex-direction: row;
`;
const Picker = styled.Picker`
  width: 100%;
  background: whitesmoke;
  margin-top: 10px;
  height: 50px;
`;
const NameText = styled.Text``;
const NameInput = styled.TextInput`
  background: whitesmoke;
  padding: 14px;
  border-radius: 5px;
  width: 100%;
  margin-top: 10px;
`;
const BoxContainer = styled(NameInputeContainer)`
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;
const Box = styled.View`
  display: flex;
  width: 30%;
`;
const BoxName = styled.Text`
  width: 100%;
  text-align: center;
`;
const BoxInput = styled.TextInput`
  width: 100%;
  background: whitesmoke;
  border-radius: 10px;
  padding: 5px;
  margin-top: 5px;
`;

export const Modal: React.FC<ModalComponentProps> = ({
  open,
  closehandle,
}: ModalComponentProps): JSX.Element => {
  const [newproduct, setnewproduct] = useState<ProductDTO>(EmtryProductDTO);

  const whetetostore = (type: string, value: string) => {
    switch (type) {
      case 'fat':
        setnewproduct({...newproduct, fatnumber: value});
        return;
      case 'carbo':
        setnewproduct({...newproduct, carbonumber: value});
        return;
      case 'protein':
        setnewproduct({...newproduct, proteinnumber: value});
        return;
    }
  };
  const boxnumberinpute = (textvalue: string, type: string): void => {
    if (/^\d{0,4}\.?\d{0,3}?$/gm.test(textvalue)) {
      console.log(textvalue);
      whetetostore(type, textvalue);
    }
  };
  return (
    <ModalWrapper
      visible={open}
      onRequestClose={closehandle}
      animationType="fade"
      onTouchStart={() => console.log('okokok')}
      transparent={true}>
      <ModalContaierWrapper>
        <ModalContainer>
          <MainText>Add new product</MainText>
          <NameInputeContainer>
            <NameInput placeholder="Product name" />
          </NameInputeContainer>
          <NameInputeContainer>
            <Picker
              onValueChange={(itemvalue: string, itemindex: number) =>
                setnewproduct({...newproduct, entity: itemvalue})
              }>
              <Picker.Item label="Gram" value="gram" />
              <Picker.Item label="Kilogram" value="Kg" />
            </Picker>
          </NameInputeContainer>
          <BoxContainer>
            <Box>
              <BoxName>Fat</BoxName>
              <BoxInput keyboardType="numbers-and-punctuation"></BoxInput>
            </Box>
            <Box>
              <BoxName>Carbo</BoxName>
              <BoxInput keyboardType="numbers-and-punctuation"></BoxInput>
            </Box>
            <Box>
              <BoxName>Protein</BoxName>
              <BoxInput
                keyboardType="numbers-and-punctuation"
                value={newproduct.proteinnumber.toString()}
                onChangeText={(text: string) =>
                  boxnumberinpute(text, 'protein')
                }></BoxInput>
            </Box>
          </BoxContainer>
        </ModalContainer>
      </ModalContaierWrapper>
    </ModalWrapper>
  );
};
