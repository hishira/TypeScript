/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styled from 'styled-components/native';
import {ProduceRealm, Product, IProduct} from '../../schemas/product.schema';
const Container = styled.View`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
`;
const Button = styled.TouchableOpacity`
  border: 1px solid slategray;
  border-radius: 10px;
  padding: 10px;
  width: 40%;
  margin-top: 10px;
`;
const Text = styled.Text`
  width: 100%;
  text-align: center;
`;
const Image = styled.Image`
  width: 300px;
  height: 300px;
`;
export const HomeComponent: React.FC = (): JSX.Element => {
  const clickHandle = () => {
    ProduceRealm.write(() => {
      let p1: Product = new Product('p1', 12.32);
      ProduceRealm.create(Product.schema.name, p1);
    });
    let products: Realm.Results<IProduct> = ProduceRealm.objects('Product');
    for (const i of products) {
      console.log(i.proteinnumber);
    }
    ProduceRealm.write(() => {
      ProduceRealm.deleteAll();
    });
    console.log('hi');
  };
  return (
    <Container>
      <Image source={require('../../../public/path16.png')} />
      <Button>
        <Text>Callendar</Text>
      </Button>
      <Button onPress={clickHandle}>
        <Text>Saved meals</Text>
      </Button>
    </Container>
  );
};
