/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Container, Button, ButtonText, ButtonGroup} from '../Home/index';
import {IProduct, ProductRealm} from '../../schemas/product.schema';
import {Product} from './product';
import {Modal} from './modal';
const ProductContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
`;

export const ProductComponent: React.FC = (): JSX.Element => {
  const [products, setproducts] = useState<Realm.Results<IProduct> | []>([]);
  const [refresh, setrefresh] = useState<boolean>(false);
  const [modalopen, setmodalopen] = useState<boolean>(false);
  useEffect(() => {
    let allproducts: Realm.Results<IProduct> = ProductRealm.objects('Product');
    console.log(allproducts);
    setproducts(allproducts);
  }, [refresh]);

  const deleteHandle: Function = (product: IProduct): void => {
    ProductRealm.write(() => {
      ProductRealm.delete(product);
      setrefresh(!refresh);
    });
  };
  const modalclose = (): void => {
    setmodalopen(false);
  };
  return (
    <Container>
      <Modal open={modalopen} closehandle={modalclose} />
      {products !== null ? (
        <ProductContainer>
          {products.map((product: IProduct) => (
            <Product product={product} deleteHandle={deleteHandle} />
          ))}
        </ProductContainer>
      ) : null}
      <Button>
        <ButtonText onPress={() => setmodalopen(true)}>
          Add new product
        </ButtonText>
      </Button>
    </Container>
  );
};
