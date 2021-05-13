import {StackNavigationProp} from '@react-navigation/stack';
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
