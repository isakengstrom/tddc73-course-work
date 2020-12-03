import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';

import HomeScreen from './src/screens/HomeScreen';
import { screenOptions } from './src/components/Styles';

const Stack = createStackNavigator();

const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Stack.Screen 
            name="Home"
            component={HomeScreen}
            options={{ title: 'The HomeScreen' }}
          />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>     
    </ApolloProvider>
  );
}

export default App;