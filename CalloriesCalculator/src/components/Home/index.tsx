/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styled from 'styled-components/native';
import {Product, IProduct} from '../../schemas/product.schema';
import {GeneralRealm} from '../../schemas/general.schema';
import {HomeComponentProps} from '../../types/common/main';
export const Container = styled.View`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  background-color: #fff8ee;
`;
export const Button = styled.TouchableOpacity`
  border: 1px solid #a98c66;
  border-radius: 10px;
  padding: 25px;
  width: 40%;
  margin-top: 10px;
  background-color: #eab15b;
`;
export const ButtonText = styled.Text`
  width: 100%;
  color: #504538;
  font-size: 22px;
  text-align: center;
  font-weight: bold;
`;
const Image = styled.Image`
  width: 300px;
  height: 300px;
  margin-top: 20px;
`;
export const ButtonGroup = styled.View`
  display: flex;
  width: 100%;
  margin-top: 40px;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
`;
export const HomeComponent: React.FC<HomeComponentProps> = ({
  savedProductHandle,
  mealNavigateHandle,
}: HomeComponentProps): JSX.Element => {
  const clickHandle = (): void => {
    GeneralRealm.write(() => {
      let products: Realm.Results<IProduct> = GeneralRealm.objects('Product');
      if (products.length <= 0) {
        let p1: Product = new Product('p1', 12.32);
        GeneralRealm.create(Product.schema.name, p1);
      }
    });
    /*ProductRealm.write(() => {
      ProductRealm.deleteAll();
    });
    */
    savedProductHandle();
    console.log('hi');
  };
  return (
    <Container>
      <Image source={require('../../../public/path16.png')} />
      <ButtonGroup>
        <Button>
          <ButtonText>Callendar</ButtonText>
        </Button>
        <Button onPress={clickHandle}>
          <ButtonText>Saved products</ButtonText>
        </Button>
        <Button onPress={mealNavigateHandle}>
          <ButtonText>Saved meals</ButtonText>
        </Button>
      </ButtonGroup>
    </Container>
  );
};
