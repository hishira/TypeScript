import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';
import styled from 'styled-components/native';
import {FirstTypeProps} from '../../types/common/main';
const PartView = styled.View`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const Image = styled.ImageBackground`
  width: 100%;
  height: 175px;
  border-radius: 10px;
  border-top-left-radius: 10px;
`;
const Button = styled.TouchableOpacity`
  width: 30%;
  height: 240px;
`;
const ButtonText = styled.Text`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 20px;
  padding: 20px 10px 5px 10px;
  background-color: whitesmoke;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
const FirstPart: React.FC<FirstTypeProps> = ({
  selectMealType,
}: FirstTypeProps): JSX.Element => {
  const fadeAnimation: Animated.Value = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation]);
  return (
    <Animated.View style={{opacity: fadeAnimation}}>
      <PartView>
        <Button onPress={() => selectMealType('breakfast')}>
          <Image
            imageStyle={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}
            source={{
              uri: 'https://images.pexels.com/photos/3851068/pexels-photo-3851068.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}
          />
          <ButtonText>Breakfast</ButtonText>
        </Button>
        <Button onPress={() => selectMealType('dinner')}>
          <Image
            imageStyle={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}
            source={{
              uri: 'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}
          />
          <ButtonText>Dinner</ButtonText>
        </Button>
        <Button onPress={() => selectMealType('supper')}>
          <Image
            imageStyle={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}
            source={{
              uri: 'https://images.pexels.com/photos/4103374/pexels-photo-4103374.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}
          />
          <ButtonText>Supper</ButtonText>
        </Button>
      </PartView>
    </Animated.View>
  );
};
export default FirstPart;
