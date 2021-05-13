import React from 'react';
import styled from 'styled-components/native';
const ScrollView = styled.ScrollView`
  background-color: #fff8ee;
`;
import {ProductComponent} from '../../components/Products/index';
const ProductView: React.FC = (): JSX.Element => {
  return (
    <ScrollView>
      <ProductComponent />
    </ScrollView>
  );
};
export default ProductView;
