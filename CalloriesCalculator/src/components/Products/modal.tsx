/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {EmtryProductDTO, ProductDTO} from '../../schemas/product.schema';
import {ModalComponentProps} from '../../types/common/main';
import {Container, ButtonGroup, Button, ButtonText} from '../Home/index';
import {Product, IProduct} from '../../schemas/product.schema';
import {GeneralRealm} from '../../schemas/general.schema';
const Modal = styled.Modal``;
const ModalContaierWrapper = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  background-color: rgba(1, 1, 1, 0.5);
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
  flex-wrap: wrap;
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
const ModelButton = styled(Button)`
  padding: 10px;
`;
const ModalButtonGroup = styled(ButtonGroup)`
  margin-top: 20px;
`;
export const ModalComponent: React.FC<ModalComponentProps> = ({
  open,
  closehandle,
  refresh,
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

  const getCalloriesValueByType: Function = (type: string): string => {
    return type === 'fat'
      ? newproduct.fatnumber
      : type === 'carbo'
      ? newproduct.carbonumber
      : newproduct.proteinnumber;
  };
  const boxnumberinpute = (textvalue: string, type: string): void => {
    if (/^\d{0,4}(\.{1}\d{0,3})?$/gm.test(textvalue)) {
      console.log(textvalue);
      whetetostore(type, textvalue);
    } else {
      whetetostore(type, getCalloriesValueByType(type));
    }
  };

  const cancelHandle: Function = (): void => {
    setnewproduct(EmtryProductDTO);
    closehandle();
  };

  const addHandle: Function = (): void => {
    console.log(newproduct);
    GeneralRealm.write(() => {
      let new_prod: Product = new Product(
        newproduct.name,
        parseFloat(newproduct.calories),
        parseFloat(newproduct.fatnumber),
        parseFloat(newproduct.carbonumber),
        parseFloat(newproduct.proteinnumber),
        newproduct.entity,
      );
      GeneralRealm.create('Product', new_prod);
      setnewproduct(EmtryProductDTO);
      refresh();
      closehandle();
    });
  };
  const caloriesset: Function = (newvalue: string): void => {
    if (/^\d{0,4}(\.{1}\d{0,3})?$/gm.test(newvalue)) {
      setnewproduct({...newproduct, calories: newvalue});
    } else {
      setnewproduct({...newproduct, calories: newproduct.calories});
    }
  };
  return (
    <Modal
      visible={open}
      onRequestClose={closehandle}
      animationType="fade"
      onTouchStart={() => console.log('okokok')}
      transparent={true}>
      <ModalContaierWrapper>
        <ModalContainer>
          <MainText>Add new product</MainText>
          <NameInputeContainer>
            <NameInput
              onChangeText={(text: string) =>
                setnewproduct({...newproduct, name: text})
              }
              placeholder="Product name"
            />
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
              <BoxInput
                keyboardType="decimal-pad"
                value={newproduct.fatnumber}
                onChangeText={(text: string) => boxnumberinpute(text, 'fat')}
              />
            </Box>
            <Box>
              <BoxName>Carbo</BoxName>
              <BoxInput
                keyboardType="decimal-pad"
                value={newproduct.carbonumber}
                onChangeText={(text: string) => boxnumberinpute(text, 'carbo')}
              />
            </Box>
            <Box>
              <BoxName>Protein</BoxName>
              <BoxInput
                keyboardType="decimal-pad"
                value={newproduct.proteinnumber}
                onChangeText={(text: string) =>
                  boxnumberinpute(text, 'protein')
                }
              />
            </Box>
            <Box>
              <BoxName>Calories</BoxName>
              <BoxInput
                keyboardType="decimal-pad"
                value={newproduct.calories.toString()}
                onChangeText={(text: string) => {
                  caloriesset(text);
                }}
              />
            </Box>
          </BoxContainer>
          <ModalButtonGroup>
            <ModelButton onPress={() => addHandle()}>
              <ButtonText>Add</ButtonText>
            </ModelButton>
            <ModelButton onPress={() => cancelHandle()}>
              <ButtonText>Cancel</ButtonText>
            </ModelButton>
          </ModalButtonGroup>
        </ModalContainer>
      </ModalContaierWrapper>
    </Modal>
  );
};
