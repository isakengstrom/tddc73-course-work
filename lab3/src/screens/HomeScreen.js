import React, { useState } from 'react'
import { ScrollView, View, Text, FlatList, Pressable} from 'react-native'
import { gql, useQuery } from '@apollo/client';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

import Loading from '../components/Loading';
import styles, { mainGrey } from '../components/StylesNew';

const MY_QUERY = gql`
  query ReposQuery($query: String!) {
    search(first: 10, type: REPOSITORY, query: $query) { 
      nodes {
        ... on Repository {
          name
          id
          description
          owner {
            login
          }
          forkCount
          stargazerCount
        }
      }
    }
  }
`;

export default () => {
  const [ language, setLanguage ] = useState('any');

  const { loading, error, data } = useQuery(MY_QUERY, {
    variables: {
      query: `stars:>1000 forks:>1000 ${ language == 'any' ? '' : language }`
    }
  });
  
  if(loading) {
    return <Loading />
  }
  
  if(error) { 
    console.log(error.graphQLErrors + '\n\n'+ error.networkError);
    //console.log(error.networkError.result.error);
    return <Text>Error loading data..</Text>
  }

  return (
    <View style={styles.contentContainer}>
      
      {/*<Text style={styles.pageDescription}>TRENDING REPOSITORIES</Text>*/}

      <ScrollView>
        {data.search.nodes.map(node => (
          <Pressable key={node.id} style={styles.repositoryContainer}>
            <Text style={styles.repoName}>{node.name}</Text> 
            <Text style={styles.repoOwner}>{node.owner.login}</Text> 
            <Text style={styles.repoDescription}>{node.description}</Text> 
            <Text style={styles.repoCount}>Stars {node.stargazerCount} | Forks {node.forkCount}</Text> 
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={language}
          onValueChange={(value) => setLanguage(value)}
          style={styles.picker}
        >
          <Picker.Item label="Any Language" value="any"/>
          <Picker.Item label="C" value="c"/>
          <Picker.Item label="C#" value="c#"/>
          <Picker.Item label="C++" value="c++"/>
          <Picker.Item label="JavaScript" value="javascript"/>
          <Picker.Item label="React" value="React"/>
          <Picker.Item label="React Native" value="react native"/>
          <Picker.Item label="Python" value="python"/>
          <Picker.Item label="Java" value="java"/>
          <Picker.Item label="HTML" value="html"/>
          <Picker.Item label="PHP" value="php"/>
          <Picker.Item label="CSS" value="css"/>
        </Picker>
      </View>
    </View>
  )
}