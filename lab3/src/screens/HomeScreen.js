import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, FlatList, Pressable, TextInput} from 'react-native'
import { gql, useQuery } from '@apollo/client';
import { Picker } from '@react-native-picker/picker';
import { Ionicons, Octicons, AntDesign } from '@expo/vector-icons';

import Loading from '../components/Loading';
import styles, { ghWhite, ghBread } from '../components/Styles';


const MY_QUERY = gql`
  query ReposQuery($query: String!) {
    search(first: 20, type: REPOSITORY, query: $query) { 
      nodes {
        ... on Repository {
          name
          id
          description
          nameWithOwner
          owner {
            login
          }
          forkCount
          stargazerCount
          languages(orderBy: {field: SIZE, direction: DESC}, first: 1) {
            nodes {
              name
              color
            }
          }
        }
      }
    }
  }
`;

const initialStates = {
  activeField: 0,
  language: 'any', 
  stars: '0',
  forks: '0',
}

export default () => {
  const [state, setState] = useState(initialStates);

  const updateState = (stateName, value) => {
    setState({
      ...state,
      [stateName]: value
    });
  };

  const { loading, error, data } = useQuery(MY_QUERY, {
    variables: {
      query: `stars:>1000 forks:>1000 ${ state.language == 'any' ? '' : 'language:' + state.language }`
    }
  });
  
  if(error) { 
    console.log(error.graphQLErrors + '\n\n'+ error.networkError);
    //console.log(error.networkError.result.error);
    return <Text>Error loading data..</Text>
  }

  // Debug function which loads query on a save from every file
  useEffect(() => {
    setTimeout(() => {
      if(state.language == 'any'){
        updateState('language', 'c')
        updateState('language', 'any')
      }
      else 
        updateState('language', 'any')
    }, 1000)
  }, [])
  
  const showList = () => {
    
    if(loading) {
      return <Loading />
    }

    return(
      <FlatList
        data={data.search.nodes}
        renderItem={({ item }) => (
          <RepoItem
            repo={item}
            onPress={() => navigation.navigate('Repository', { repo: item })}
          />
        )}
        keyExtractor={(repo) => repo.id.toString()}
      />
    );  
  }
  
  const RepoItem = ({ repo, onPress }) => {
    const { name, description, forkCount, stargazerCount, owner, languages } = repo
    const desc = String(description);

    return (
      <Pressable style={styles.repoContainer} onPress={onPress}>
        <View style={styles.itemTop}>
          <Octicons name="repo" size={20} color={ghBread} />
          <View style={{marginLeft: 5,}}>
            <Text style={styles.repoName}> {name}</Text> 
            <Text style={styles.repoOwner}>{owner.login}/</Text> 
          </View>
        </View>
        <View style={styles.itemMiddle}>
          <Text style={styles.repoDescription}>
            {desc.length > 125 ? desc.substring(0,125) + '..' : desc}
          </Text> 
        </View>
        <View style={styles.itemBottom}>
          <View style={styles.countContainer}>
            <Octicons name="repo-forked" size={16} color={ghBread} />
            <Text style={styles.repoCount}> {forkCount}</Text> 
          </View>
          <View style={styles.countContainer}>
            <AntDesign name="staro" size={16} color={ghBread} />
            <Text style={styles.repoCount}> {stargazerCount}</Text>
          </View>
          {languages.nodes.map(node => (
            <View style={styles.countContainer}>
              <View style={[styles.circle, {backgroundColor: node.color}]}></View>
              <Text style={styles.repoCount}> {node.name}</Text> 
            </View>
          ))}
        </View>
      </Pressable>
    )
  }

  return (
    <View style={styles.contentContainer}>
      {showList()}
      
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={state.language}
          onValueChange={(value) => updateState('language', value)}
          style={styles.picker}
          itemStyle={styles.picker}
        >
          <Picker.Item color={ghWhite} label="Any Language" value="any"/>
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
          <Picker.Item label="Ruby" value="ruby"/>
        </Picker>
      </View>
    </View>
  )
}