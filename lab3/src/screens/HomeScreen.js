import React from 'react'
import { View, Text, FlatList, Pressable} from 'react-native'
import { gql, useQuery } from '@apollo/client';
import DropDownPicker from 'react-native-dropdown-picker';
//import {Query} from 'react-apollo'

import Loading from '../components/Loading';

const MY_QUERY = gql`
  query {
    search(first: 5, type: REPOSITORY, query: "language: python") { 
      nodes {
        ... on Repository {
          name
        }
      }
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery(MY_QUERY);/*, {
    fetchPolicy: 'no-cache',
    variables: {
      query: 'stars:>1000 language:python'
    },
  });*/
  
  if(loading) {
    return <Loading />
  }

  if(error) { 
    console.log(error.graphQLErrors + '\n\n'+ error.networkError);
    //console.log(error.networkError.result.error);
    return (
        <Text>Error loading data..</Text>
  )}

  return (
    <View>
      {data.search.nodes.map(node => (
        <Text>{node.name}</Text>
      ))}
      <Text>TJOOO BREEE</Text>
    </View>
  )
}