import {StackNavigationProp} from '@react-navigation/stack';
import {IProduct, EditProductDTO} from '../../schemas/product.schema';
export type RootStackConfiguration = {
  Home: undefined;
  Product: undefined;
};
type ScreenNavigation = StackNavigationProp<RootStackConfiguration>;
export type Params = {
  navigation: ScreenNavigation;
};
export type HomeComponentProps = {
  savedProductHandle: Function;
};
export type ProductComponentProps = {
  product: IProduct;
  deleteHandle: Function;
  editfunction: (product: IProduct) => void;
};
export type ModalComponentProps = {
  open: boolean;
  closehandle: () => void;
  refresh: Function;
};
type ExtendedToModal = {
  product: EditProductDTO;
};
export type EditModalProps = ModalComponentProps & ExtendedToModal;
