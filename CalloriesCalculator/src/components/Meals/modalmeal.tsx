import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {GeneralRealm} from '../../schemas/general.schema';
import {
  Modal,
  ModalContaierWrapper,
  ModalContainer,
  MainText,
  NameInputeContainer,
  Picker,
} from '../Products/modal';
import {ModalComponentProps} from '../../types/common/main';
import {EmptyEditProductDto, IProduct} from '../../schemas/product.schema';
import {Button, ButtonText} from '../Home/index';
const MealView = styled.View`
  width: 75%;
  background-color: white;
  border-radius: 10px;
`;
const MealPiker = styled(Picker)`
  width: 90%;
  align-self: center;
  margin-top: 5px;
`;
const MealContainer = styled(NameInputeContainer)`
  margin-top: 15px;
  width: 100%;
`;
const ProductContainer = styled(MealContainer)`
  display: flex;
  justify-content: space-between;
`;
const ProductText = styled.Text`
  font-size: 15px;
  width: 22%;
`;
const ProductChoicerBackground = styled.View`
  width: 70%;
  background-color: white;
  border-radius: 10px;
  margin-right: 10px;
`;
const ProductChoicer = styled(MealPiker)`
  width: 100%;
`;
const ProductButton = styled(Button)`
  padding: 5px;
  margin: 0px;
  width: 8%;
  border-radius: 30px;
`;
const ProductButtonText = styled(ButtonText)`
  font-size: 20px;
`;
export const ModalMeal: React.FC<ModalComponentProps> = ({
  open,
  closehandle,
  refresh,
}: ModalComponentProps): JSX.Element => {
  const [products, setproducts] = useState<Realm.Results<IProduct> | []>([]);
  const [selectedproducts, setselectedproducts] = useState<IProduct[]>([]);
  const [productselect, setproductselect] = useState<IProduct | null>(null);
  const productAddToList = (): void => {};
  const setselectedProductHandle = (productid: string): void => {
    console.log(productid);
    let product = products.filter((p: IProduct) => p._id.equals(productid))[0];
    console.log(product);
    setproductselect(product);
  };

  const addproduct = () => {
    setselectedproducts([...selectedproducts, productselect]);
  };
  useEffect(() => {
    let allProducts: Realm.Results<IProduct> = GeneralRealm.objects('Product');
    setproducts(allProducts);
  }, []);
  return (
    <Modal
      visible={open}
      onRequestClose={closehandle}
      animationType="fade"
      transparent={true}>
      <ModalContaierWrapper>
        <ModalContainer>
          <MainText>Add new meal</MainText>
          <MealContainer>
            <MainText>Food Type: </MainText>
            <MealView>
              <MealPiker>
                <MealPiker.Item label="Breakfast" value="Breakfast" />
                <MealPiker.Item label="Dinner" value="Dinner" />
                <MealPiker.Item label="Supper" value="Supper" />
              </MealPiker>
            </MealView>
          </MealContainer>
          <ProductContainer>
            <ProductText>Product</ProductText>
            <ProductChoicerBackground>
              <ProductChoicer
                onValueChange={(itemvalue: string, itemindex: number) =>
                  setselectedProductHandle(itemvalue)
                }>
                {products.map((product: IProduct) => (
                  <ProductChoicer.Item
                    label={product.name}
                    value={product._id}
                  />
                ))}
              </ProductChoicer>
            </ProductChoicerBackground>
            <ProductButton onPress={addproduct}>
              <ProductButtonText>+</ProductButtonText>
            </ProductButton>
          </ProductContainer>
        </ModalContainer>
      </ModalContaierWrapper>
    </Modal>
  );
};
