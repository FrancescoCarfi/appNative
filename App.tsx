import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import News from './News';
import SingleNews from './SingleNews';
import FavoritesNews from './FavoritesNews';
import Login from './Login';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="News" component={News} />
          <Stack.Screen name="SingleNews" component={SingleNews} />
          <Stack.Screen name="FavoritesNews" component={FavoritesNews} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App; 








