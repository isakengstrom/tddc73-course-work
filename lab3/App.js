import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';

import HomeScreen from './src/screens/HomeScreen';
import { screenOptions } from './src/components/Styles';
import {setContext} from '@apollo/client/link/context';
import { GITHUB_PERSONAL_ACCESS_TOKEN } from '@env';

const Stack = createStackNavigator();

const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' })

/*const authLink = setContext((_, {headers}) => {
  console.log('setContext ' + 'c7e9f17f5b24a3c0acc5e900fe5bb5d312b19e3a');
  return {
    headers: {
      ...headers,
      authorization: `Bearer c7e9f17f5b24a3c0acc5e900fe5bb5d312b19e3a`,
    },
  };
});*/

const client = new ApolloClient({
  link: httpLink,
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
    });
  },
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