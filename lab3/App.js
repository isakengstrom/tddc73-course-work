import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { GITHUB_ACCESS_TOKEN, GITHUB_ACCESS_TOKEN_NR2 } from '@env';
import HomeScreen from './src/screens/HomeScreen';
import RepoScreen from './src/screens/RepoScreen';
import { screenOptions, ghBackground } from './src/components/Styles';



const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: ghBackground,
    background: ghBackground,
  },
};

const httpLink = createHttpLink({ uri: 'https://api.github.com/graphql' });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: GITHUB_ACCESS_TOKEN_NR2 ? `Bearer ${GITHUB_ACCESS_TOKEN_NR2}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const App = () => {  
  return (
    <ApolloProvider client={client}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Stack.Screen 
            name="Home"
            component={HomeScreen}
            options={{ title: 'Trending repositories' }}
          />
          <Stack.Screen
            name="Repo"
            component={RepoScreen}
            options={({
              route: {
                params: {
                  repo: { name },
                },
              },
            }) => ({
              title: name,
              gestureResponseDistance: { horizontal: 500 },
            })}
          />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>     
    </ApolloProvider>
  );
}

export default App;