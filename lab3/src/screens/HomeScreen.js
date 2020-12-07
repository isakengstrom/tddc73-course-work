import React from 'react'
import { View, Text, FlatList, Pressable} from 'react-native'
import { gql, useQuery } from '@apollo/client';
import DropDownPicker from 'react-native-dropdown-picker';

import Loading from '../components/Loading';


const MY_QUERY = gql`
query fetchRepos($query: String!) {
  search(type: REPOSITORY, query: $query, first: 1) {
    nodes {
      ... on Repository {
        id
        owner 
      }
    }
  }
}
`;

export default () => {
  const { data, loading, error } = useQuery(MY_QUERY, {
    variables: {
      query: 'stars:>1000 language:python'
    }
  }
  );
  /*console.log(useQuery(MY_QUERY, {
    variables: {
      query: 'stars:>1000 language:python'
    }
  }
  ));*/

  //console.log(data.search.edges.node.id.toString())

  if(loading) {
    return <Loading />
  }
  console.log(data);


  return (
    <View></View>
  )
}