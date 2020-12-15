import React from 'react';
import { View, Text, FlatList, ScrollView} from 'react-native';
import { useQuery } from '@apollo/client';
import { Octicons, AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import moment from 'moment';

import CommitsContainer from '../components/CommitsContainer';
import Loading from '../components/Loading';
import styles, {ghBread, ghWhite, ghBorder, ghBackground} from '../components/Styles';

import { REPO_QUERY } from '../queries/GithubQueries';

export default ({ route }) => {
  
  const { loading, error, data } = useQuery(REPO_QUERY, {
    variables: {
      id: route.params.repo.id, 
    }
  })

  const cutString = (str, limit) => {
    if(str.length > limit)
      return(str.substring(0,limit) + '..');
     
    return str;
  }
  
  if(error) {
    return <Text>Error loading repository..</Text>
  }

  if(loading) {
    return <Loading itemType={'repository'}/>
  }
  else {
    const repo = data.node;

    return (
      <View style={styles.repoContainer}>

        {/* TITLE */}
        <View style={styles.onRepoTopContainer}>
          <View style={styles.itemTop}>
            <Octicons name="repo" size={20} color={ghBread} />
            <View style={{marginLeft: 5,}}>
              <Text style={styles.repoOwner}>{repo.owner.login}/</Text> 
              <Text style={styles.repoName}> {repo.name}</Text> 
            </View>
          </View>
        </View>

        {/* DESCRIPTION */}
        <View style={styles.onRepoDescriptionContainer}>
          <Text style={styles.subTitle}>Description</Text>
          <ScrollView style={styles.onRepoDescription}>
            <Text style={{color: ghBread, marginStart: 5,}}>{repo.description}{/*Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.*/}</Text>
          </ScrollView>
        </View>

        {/* COMMITS */}
        <View style={styles.onRepoCommitsContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={[styles.countContainer, {marginStart: 0, marginBottom: 5,}]}>
              <MaterialIcons name="history" size={16} color={ghBread} />
              <Text style={{color: ghWhite}}> {repo.ref.target.history.totalCount}</Text>
              <Text style={{color: ghBread}}> commits</Text>
            </View>
          </View>
          <CommitsContainer repoId={route.params.repo.id} />
        </View>

        {/* DETAILS */}
        <View style={styles.onRepoDetailsContainer}>
          <View style={styles.itemRow}>
            <View style={styles.countContainer}>
              <AntDesign name="staro" size={16} color={ghBread} />
              <Text style={styles.repoCount}> {repo.stargazerCount}</Text>
            </View>
            <View style={styles.countContainer}>
              <Octicons name="repo-forked" size={16} color={ghBread} />
              <Text style={styles.repoCount}> {repo.forkCount}</Text> 
            </View>
            <View style={styles.countContainer}>
              <MaterialCommunityIcons name="scale-balance" size={16} color={ghBread} />
              <Text style={styles.repoCount}> {cutString(String(repo.licenseInfo.name), 20)}</Text> 
            </View>
          </View>
          <View style={styles.itemRow}>
            {repo.languages.edges.map(edge => (
              <View key={edge.node.id} style={styles.countContainer}>
                <View style={[styles.circle, {backgroundColor: edge.node.color}]}></View>
                <Text style={styles.repoCount}> {edge.node.name}</Text> 
              </View>
            ))}
          </View>
          <Text style={[styles.repoCount, {color: ghWhite, marginHorizontal: 10,}]}>
            Updated {moment(repo.updatedAt).format("MMM DD, YYYY")}
          </Text>
        </View>

      </View>
    )
  }  
}
