import React from 'react';
import { View, Text, FlatList, ScrollView} from 'react-native';
import { useQuery } from '@apollo/client';
import { Octicons, AntDesign, MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';

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

  // Function from: 
  // https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
  const formatBytes = (bytes, decimals = 1) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const formatPercentage = (part, total, decimals = 1) => {
    if (part === 0) return '0%';

    const dm = decimals < 0 ? 0 : decimals;
    return parseFloat(((part / total) * 100).toFixed(dm)) + '%';
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
              <Text style={[styles.repoName, {fontSize: 22}]}> {repo.name}</Text> 
            </View>
          </View>
        </View>

        {/* DESCRIPTION */}
        <View style={styles.onRepoDescriptionContainer}>
          <Text style={styles.subTitle}>Description</Text>
          <ScrollView style={styles.onRepoDescription}>
            <Text style={{color: ghBread, marginStart: 5,}}>{repo.description ? repo.description : 'No description available.'}</Text>
          </ScrollView>
        </View>

        {/* COMMITS */}
        <View style={styles.onRepoCommitsContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={[styles.countContainer, {marginStart: 0, marginBottom: 5,}]}>
              <MaterialIcons name="history" size={16} color={ghBread} />
              <Text style={{color: ghWhite}}> {repo.ref ? repo.ref.target.history.totalCount : '0'}</Text>
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
              <Feather name="server" size={16} color={ghBread} />
              <Text style={styles.repoCount}> {formatBytes(parseInt(repo.languages.totalSize))}</Text> 
            </View>
            <View style={styles.countContainer}>
              <MaterialCommunityIcons name="scale-balance" size={16} color={ghBread} />
              <Text style={styles.repoCount}> {repo.licenseInfo ? cutString(String(repo.licenseInfo.name), 15) : 'No license'}</Text> 
            </View>
          </View>
          <View style={styles.itemRow}>
            {repo.languages.edges.map(edge => (
              <View key={edge.node.id} style={styles.countContainer}>
                <View style={[styles.circle, {backgroundColor: edge.node.color}]}></View>
                <Text style={styles.repoCount}> {edge.node.name} ({formatPercentage(edge.size, repo.languages.totalSize )})</Text> 
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
