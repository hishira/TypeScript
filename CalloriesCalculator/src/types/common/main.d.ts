import {StackNavigationProp} from '@react-navigation/stack';
import {IProduct, EditProductDTO} from '../../schemas/product.schema';
export type RootStackConfiguration = {
  Home: undefined;
  Product: undefined;
  Meal: undefined;
};
type ScreenNavigation = StackNavigationProp<RootStackConfiguration>;
export type Params = {
  navigation: ScreenNavigation;
};
export type HomeComponentProps = {
  savedProductHandle: Function;
  mealNavigateHandle: Function;
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

export type FirstTypeProps = {
  selectMealType: Function;
};
export type SecondTypeProps = {
  mealtype: string;
};
