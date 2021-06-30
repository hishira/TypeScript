/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Container, Button, ButtonText, ButtonGroup} from '../Home/index';
import {
  EditProductDTO,
  EmptyEditProductDto,
  IProduct,
} from '../../schemas/product.schema';
import {GeneralRealm} from '../../schemas/general.schema';
import {Product} from './product';
import {ModalComponent} from './modal';
import {EditModalComponent} from './editmodal';
const ProductContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 10px;
`;

export const ProductComponent: React.FC = (): JSX.Element => {
  const [products, setproducts] = useState<Realm.Results<IProduct> | []>([]);
  const [refresh, setrefresh] = useState<boolean>(false);
  const [modalopen, setmodalopen] = useState<boolean>(false);
  const [editmodalopen, seteditmodalopen] = useState<boolean>(false);
  const [producttoedit, setproducttoedit] =
    useState<EditProductDTO>(EmptyEditProductDto);
  useEffect(() => {
    let allproducts: Realm.Results<IProduct> = GeneralRealm.objects('Product');
    console.log(allproducts);
    setproducts(allproducts);
  }, [refresh]);

  const deleteHandle: Function = (product: IProduct): void => {
    GeneralRealm.write(() => {
      GeneralRealm.delete(product);
      setrefresh(!refresh);
    });
  };

  const modalclose = (): void => {
    setmodalopen(false);
  };

  const editmodalclose = (): void => {
    seteditmodalopen(false);
  };

  const refrechfunc: Function = (): void => {
    setrefresh(!refresh);
  };

  const changeProductToEditProductDTO: Function = (
    iproduct: IProduct,
  ): EditProductDTO => {
    const editedProduct: EditProductDTO = {
      _id: iproduct._id,
      name: iproduct.name,
      fatnumber: iproduct.fatnumber.toString(),
      carbonumber: iproduct.carbonumber.toString(),
      proteinnumber: iproduct.carbonumber.toString(),
      calories: iproduct.calories.toString(),
      entity: iproduct.entity,
    };
    console.log(editedProduct);
    return editedProduct;
  };
  const editButtonClick: (product: IProduct) => void = (
    product: IProduct,
  ): void => {
    seteditmodalopen(true);
    setproducttoedit(changeProductToEditProductDTO(product));
  };
  return (
    <Container>
      <EditModalComponent
        open={editmodalopen}
        refresh={refrechfunc}
        closehandle={editmodalclose}
        product={producttoedit}
      />
      <ModalComponent
        open={modalopen}
        closehandle={modalclose}
        refresh={refrechfunc}
      />
      {products !== null ? (
        <ProductContainer>
          {products.map((product: IProduct) => (
            <Product
              key={product._id.toHexString()}
              product={product}
              deleteHandle={deleteHandle}
              editfunction={editButtonClick}
            />
          ))}
        </ProductContainer>
      ) : null}
      <Button onPress={() => setmodalopen(!modalopen)}>
        <ButtonText>Add new product</ButtonText>
      </Button>
    </Container>
  );
};
