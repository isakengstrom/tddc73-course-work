import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Pressable } from 'react-native'
import { useQuery } from '@apollo/client';
import { Picker } from '@react-native-picker/picker';
import { Octicons, AntDesign } from '@expo/vector-icons';

import { REPOS_QUERY } from '../queries/GithubQueries';
import Loading from '../components/Loading';
import styles, { ghWhite, ghBread } from '../components/Styles';

const initialStates = {
  activeField: 0,
  language: 'any', 
  stars: '0',
  forks: '0',
}

export default ({ navigation }) => {
  const [state, setState] = useState(initialStates);

  const updateState = (stateName, value) => {
    setState({
      ...state,
      [stateName]: value
    });
  };

  const { loading, error, data } = useQuery(REPOS_QUERY, {
    variables: {
      //query: `user:bioengstrom ${ state.language == 'any' ? '' : 'language:' + state.language }`
      query: `stars:>1000 forks:>1000 ${ state.language == 'any' ? '' : 'language:' + state.language }`
    }
  });
  
  if(error) { 
    return <Text>Error loading data..</Text>
  }

  // Debug function which loads query on a save from every file. Works similar to componentDidMount()
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
      return <Loading itemType={'repositories'}/>
    }

    return(
      <FlatList
        data={data.search.nodes}
        renderItem={({ item }) => (
          <RepoItem
            repo={item}
            onPress={() => navigation.navigate('Repo', { repo: item })} 
          />
        )}
        keyExtractor={(repo) => repo.id.toString()}
      />
    );  
  }
  
  const RepoItem = ({ repo, onPress }) => {
    const { name, description, forkCount, stargazerCount, owner, languages, updatedAt } = repo
    const desc = description ? String(description) : 'No description available.';

    return (
      <Pressable style={styles.reposContainer} onPress={onPress}>
        <View style={styles.itemTop}>
          <Octicons name="repo" size={20} color={ghBread} />
          <View style={{marginLeft: 5,}}>
            <Text style={styles.repoOwner}>{owner.login}/</Text> 
            <Text style={styles.repoName}> {name}</Text> 
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
          {languages.edges.map(edge => (
            <View key={edge.node.id} style={styles.countContainer}>
              <View style={[styles.circle, {backgroundColor: edge.node.color}]}></View>
              <Text style={styles.repoCount}> {edge.node.name}</Text> 
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