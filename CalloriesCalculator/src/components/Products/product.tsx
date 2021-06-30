/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Button, ButtonText, ButtonGroup} from '../Home/index';
import {ProductComponentProps} from '../../types/common/main';
const ProductContainer = styled.View`
  width: 40%;
  background-color: #f8eada;
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
  border: 1px solid lightgray;
`;
const TableBody = styled(TableHead)``;
const TableBodyRow = styled(Row)`
  background-color: whitesmoke;
`;
const ProductButtonGroup = styled(ButtonGroup)`
  margin-top: 0px;
  flex-wrap: nowrap;
`;
const SmallerButtonText = styled(ButtonText)`
  font-size: 15px;
`;
const ProductButtonOne = styled(Button)`
  padding: 10px;
  border-radius: 0;
  border-bottom-left-radius: 10px;
  width: 50%;
  border-color: #dfe0df;
  background-color: #fff8ea;
`;
const ProductButtonSecond = styled(Button)`
  padding: 10px;
  border-radius: 0;
  border-bottom-right-radius: 10px;
  width: 50%;
  border-color: #dfe0df;
  background-color: #fff8ea;
`;
const ProductInfo = styled.View`
  display: flex;
  padding: 20px;
  padding-bottom: 5px;
`;
export const Product: React.FC<ProductComponentProps> = ({
  product,
  deleteHandle,
  editfunction,
}: ProductComponentProps): JSX.Element => {
  return (
    <ProductContainer elevation={3}>
      <ProductInfo>
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
      </ProductInfo>
      <ProductButtonGroup>
        <ProductButtonOne onPress={() => editfunction(product)}>
          <SmallerButtonText>Edit</SmallerButtonText>
        </ProductButtonOne>
        <ProductButtonSecond>
          <SmallerButtonText onPress={() => deleteHandle(product)}>
            Delete
          </SmallerButtonText>
        </ProductButtonSecond>
      </ProductButtonGroup>
    </ProductContainer>
  );
};
