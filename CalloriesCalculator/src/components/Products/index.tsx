/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Container, Button, ButtonText} from '../Home/index';
import {IProduct, ProductRealm} from '../../schemas/product.schema';
const ProductContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
`;
const Product = styled.View`
  width: 40%;
  padding: 20px;
  background-color: #dfe0df;
  border-radius: 10px;
`;
const ProductName = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 5px;
  width: 100%;
`;
const Calories = styled(ProductName)``;
const Text = styled.Text`
  width: 40%;
  text-align: left;
`;
const RightText = styled(Text)`
  width: 60%;
  text-align: right;
`;
const NormalText = styled.Text``;
const TableHead = styled.View`
  display: flex;
  flex-direction: row;
`;
const Row = styled.View`
  display: flex;
  flex-direction: row;
`;
const Column = styled.View`
  width: 33.3%;
  border: 1px solid slategray;
`;
const TableBody = styled(TableHead)``;
const TableBodyRow = styled(Row)`
  background-color: #fff8ee;
`;
export const ProductComponent: React.FC = (): JSX.Element => {
  const [products, setproducts] = useState<Realm.Results<IProduct> | []>([]);
  useEffect(() => {
    let allproducts: Realm.Results<IProduct> = ProductRealm.objects('Product');
    console.log(allproducts);
    setproducts(allproducts);
  }, []);
  return (
    <Container>
      {products !== null ? (
        <ProductContainer>
          {products.map((product: IProduct) => (
            <Product key={product._id}>
              <ProductName>
                <Text>Product name: </Text>
                <RightText>{product.name}</RightText>
              </ProductName>
              <Calories>
                <Text>Calories</Text>
                <RightText>
                  {product.calories} / 100 {product.entity}
                </RightText>
              </Calories>
              <TableHead>
                <Row>
                  <Column>
                    <NormalText>Fat</NormalText>
                  </Column>
                  <Column>
                    <NormalText>Carbo</NormalText>
                  </Column>
                  <Column>
                    <NormalText>Protein</NormalText>
                  </Column>
                </Row>
              </TableHead>
              <TableBody>
                <TableBodyRow>
                  <Column>
                    <NormalText>{product.fatnumber}</NormalText>
                  </Column>
                  <Column>
                    <NormalText>{product.carbonumber}</NormalText>
                  </Column>
                  <Column>
                    <NormalText>{product.proteinnumber}</NormalText>
                  </Column>
                </TableBodyRow>
              </TableBody>
            </Product>
          ))}
        </ProductContainer>
      ) : null}
      <Button>
        <ButtonText>Add new product</ButtonText>
      </Button>
    </Container>
  );
};
