/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {EditProductDTO, UpdateProductDTO} from '../../schemas/product.schema';
import {EditModalProps} from '../../types/common/main';
import {Container, ButtonGroup, Button, ButtonText} from '../Home/index';
import {
  ProductRealm,
  Product,
  IProduct,
  EmptyEditProductDto,
} from '../../schemas/product.schema';
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
export const EditModalComponent: React.FC<EditModalProps> = ({
  open,
  closehandle,
  refresh,
  product,
}: EditModalProps): JSX.Element => {
  const [editedproduct, seteditedproduct] = useState<EditProductDTO>(product);

  useEffect(() => {
    seteditedproduct(product);
  }, [product]);
  const whetetostore = (type: string, value: string) => {
    switch (type) {
      case 'fat':
        seteditedproduct({...editedproduct, fatnumber: value});
        return;
      case 'carbo':
        seteditedproduct({...editedproduct, carbonumber: value});
        return;
      case 'protein':
        seteditedproduct({...editedproduct, proteinnumber: value});
        return;
    }
  };

  const getCalloriesValueByType: Function = (type: string): string => {
    return type === 'fat'
      ? editedproduct.fatnumber
      : type === 'carbo'
      ? editedproduct.carbonumber
      : editedproduct.proteinnumber;
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
    seteditedproduct(EmptyEditProductDto);
    closehandle();
  };

  const converttoupdateproduct: Function = (): UpdateProductDTO => {
    let up: UpdateProductDTO = {
      _id: editedproduct._id,
      name: editedproduct.name,
      fatnumber: parseFloat(editedproduct.fatnumber),
      carbonumber: parseFloat(editedproduct.carbonumber),
      proteinnumber: parseFloat(editedproduct.proteinnumber),
      calories: parseFloat(editedproduct.calories),
      entity: editedproduct.entity,
    };
    return up;
  };
  const edithandle: Function = (): void => {
    ProductRealm.write(() => {
      let producttoupdate = ProductRealm.objects('Product').filter(prod =>
        prod._id.equals(editedproduct._id),
      )[0];
      console.log(producttoupdate);
      const updatedprod = converttoupdateproduct(editedproduct);
      producttoupdate.name = updatedprod.name;
      producttoupdate.fatnumber = updatedprod.fatnumber;
      producttoupdate.carbonumber = updatedprod.carbonumber;
      producttoupdate.proteinnumber = updatedprod.proteinnumber;
      producttoupdate.calories = updatedprod.calories;
      producttoupdate.entity = updatedprod.entity;

    });
  };
  const caloriesset: Function = (newvalue: string): void => {
    if (/^\d{0,4}(\.{1}\d{0,3})?$/gm.test(newvalue)) {
      seteditedproduct({...editedproduct, calories: newvalue});
    } else {
      seteditedproduct({...editedproduct, calories: editedproduct.calories});
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
          <MainText>Edit product</MainText>
          <NameInputeContainer>
            <NameInput
              value={editedproduct.name}
              onChangeText={(text: string) =>
                seteditedproduct({...editedproduct, name: text})
              }
              placeholder="Product name"
            />
          </NameInputeContainer>
          <NameInputeContainer>
            <Picker
              onValueChange={(itemvalue: string, itemindex: number) =>
                seteditedproduct({...editedproduct, entity: itemvalue})
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
                value={editedproduct.fatnumber}
                onChangeText={(text: string) => boxnumberinpute(text, 'fat')}
              />
            </Box>
            <Box>
              <BoxName>Carbo</BoxName>
              <BoxInput
                keyboardType="decimal-pad"
                value={editedproduct.carbonumber}
                onChangeText={(text: string) => boxnumberinpute(text, 'carbo')}
              />
            </Box>
            <Box>
              <BoxName>Protein</BoxName>
              <BoxInput
                keyboardType="decimal-pad"
                value={editedproduct.proteinnumber}
                onChangeText={(text: string) =>
                  boxnumberinpute(text, 'protein')
                }
              />
            </Box>
            <Box>
              <BoxName>Calories</BoxName>
              <BoxInput
                keyboardType="decimal-pad"
                value={editedproduct.calories.toString()}
                onChangeText={(text: string) => {
                  caloriesset(text);
                }}
              />
            </Box>
          </BoxContainer>
          <ModalButtonGroup>
            <ModelButton onPress={() => edithandle()}>
              <ButtonText>Edit</ButtonText>
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
