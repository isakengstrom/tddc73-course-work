import React from 'react'
import { View, Text, FlatList, Pressable} from 'react-native'
import { gql, useQuery } from '@apollo/client';
import DropDownPicker from 'react-native-dropdown-picker';

import Loading from '../components/Loading';
import styles, { mainGrey } from '../components/Styles';

const MY_QUERY = gql`
  query {
    search(first: 5, type: REPOSITORY, query: "language: python") { 
      nodes {
        ... on Repository {
          name
          id
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
    return <Text>Error loading data..</Text>
    
  }

  return (
    <View>
      <Text style={{color: mainGrey, fontWeight: '800' }}>Fetched data:</Text>
      {data.search.nodes.map(node => (
        <Text key={node.id}>{node.name}</Text>
      ))}
    </View>
  )
}