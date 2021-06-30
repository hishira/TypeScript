import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeView from './src/views/Home/Index';
import ProductView from './src/views/Products/Index';
import MealView from './src/views/Meals/Index';
import {RootStackConfiguration} from './src/types/common/main';
const App = () => {
  const Stack = createStackNavigator<RootStackConfiguration>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeView} />
        <Stack.Screen name="Product" component={ProductView} />
        <Stack.Screen name="Meal" component={MealView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
