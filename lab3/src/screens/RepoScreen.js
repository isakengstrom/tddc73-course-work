import React from 'react'
import { View, Text, FlatList, ScrollView } from 'react-native'
import { useQuery } from '@apollo/client'
import { Octicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import moment from 'moment';

import Loading from '../components/Loading';
import styles, {ghBread, ghWhite, ghBorder, ghBackground} from '../components/Styles';

import { REPO_QUERY, COMMITS_QUERY } from '../queries/GithubQueries';

export default ({ route }) => {
  
  const { loading: loadingR, error: errorR, data: dataR } = useQuery(REPO_QUERY, {
    variables: {
      id: route.params.repo.id, 
    }
  })

  const { loading: loadingC, error: errorC, data: dataC } = useQuery(COMMITS_QUERY, {
    variables: {
      id: route.params.repo.id, 
    }
  })

  const cutString = (str, limit) => {
    if(str.length > limit)
      return(str.substring(0,limit) + '..');
     
    return str;
  }

  const CommitItem = ({commit}) => {
    const { messageHeadline, author } = commit

    return (
      <View>
        <Text style={{color: ghBread}}>{author.date}</Text>
      </View>
    )
  }

  const showCommits = () => {
    
    if(errorC) {
      return <Text>Error loading commit history..</Text>
    }
    if(loadingC) {
      return <Loading itemType={'commits'} />
    }
    else {
      return(
        <FlatList
          data={dataC.node.ref.target.history.nodes}
          style={styles.about}
          renderItem={({ item }) => (
            <CommitItem
              commit={item}
            />
          )}
          keyExtractor={(commit) => commit.id.toString()}
        />
      );  
    }
    
  }
  
  if(errorR) {
    return <Text>Error loading repository..</Text>
  }

  if(loadingR) {
    return <Loading itemType={'repository'}/>
  }
  else {
    const repo = dataR.node;

    return (
      <View style={styles.repoContainer}>
        <View style={styles.repoTopContainer}>
          <View style={styles.itemTop}>
            <Octicons name="repo" size={20} color={ghBread} />
            <View style={{marginLeft: 5,}}>
              <Text style={styles.repoOwner}>{repo.owner.login}/</Text> 
              <Text style={styles.repoName}> {repo.name}</Text> 
            </View>
          </View>
        </View>
        <View style={styles.repoAboutContainer}>
          <Text style={{color: ghBorder}}>Description</Text>
          <ScrollView style={styles.about}>
            <Text style={{color: ghWhite, marginStart: 5,}}>{repo.description}{/*Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.*/}</Text>
          </ScrollView>
        </View>
        <View style={styles.repoCommitsContainer}>
          <Text style={{color: ghBorder}}>Commits </Text>
          {showCommits()}
        </View>
        <View style={styles.repoDetailsContainer}>
          <Text style={{color: ghWhite}}>Commits: {repo.ref.target.history.totalCount}</Text>
          <View style={styles.countContainer}>
            <MaterialCommunityIcons name="scale-balance" size={16} color={ghBread} />
            <Text style={styles.repoCount}>License: {cutString(String(repo.licenseInfo.name), 20)}</Text> 
            </View>
          <Text style={{color: ghWhite}}>Last update: {repo.updatedAt}</Text>
          <View style={styles.itemBottom}>
            <View style={styles.countContainer}>
              <Octicons name="repo-forked" size={16} color={ghBread} />
              <Text style={styles.repoCount}> {repo.forkCount}</Text> 
            </View>
            <View style={styles.countContainer}>
              <AntDesign name="staro" size={16} color={ghBread} />
              <Text style={styles.repoCount}> {repo.stargazerCount}</Text>
            </View>
            {repo.languages.edges.map(edge => (
              <View key={edge.node.id} style={styles.countContainer}>
                <View style={[styles.circle, {backgroundColor: edge.node.color}]}></View>
                <Text style={styles.repoCount}> {edge.node.name}</Text> 
              </View>
            ))}
          </View>
        </View>
      </View>
    )
  }

  

  
}

// <Moment format="YYYY/MM/DD">{dataR.node.updatedAt}</Moment>