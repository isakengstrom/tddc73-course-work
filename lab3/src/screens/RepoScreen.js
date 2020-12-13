import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import { Octicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import Moment from 'react-moment';

import Loading from '../components/Loading';
import styles, {ghBread, ghWhite} from '../components/Styles';

const REPO_QUERY = gql`
  query RepoQuery($id: ID!) {
    node(id: $id) {
      id ... on Repository {
        name
        description
        owner {
          login
        }
        forkCount
        stargazerCount
        updatedAt
        languages(orderBy: {field: SIZE, direction: DESC}, first: 1) {
          nodes {
            name
            color
            id
          }
        }
        licenseInfo {
          name
        }
        commitComments {
          totalCount
        }
      }
    }
  }
`;

export default ({ route, navigation }) => {

  const { loading, error, data } = useQuery(REPO_QUERY, {
    variables: {
      id: route.params.repo.id, 
    }
  })
  
  if(loading) {
    return <Loading />
  }
  if(error) {
    return <Text>Error loading data..</Text>
  }

  return (
    <View style={styles.repoContainer}>
      <View style={styles.itemTop}>
        <Octicons name="repo" size={20} color={ghBread} />
        <View style={{marginLeft: 5,}}>
          <Text style={styles.repoName}> {data.node.name}</Text> 
          <Text style={styles.repoOwner}>{data.node.owner.login}/</Text> 
        </View>
      </View>
      <View style={styles.repoDetails}>
  <Text style={{color: ghWhite}}>{data.node.description}{'\n'}</Text>
        <Text style={{color: ghWhite}}>Commits: {data.node.commitComments.totalCount}</Text>
        <Text style={{color: ghWhite}}>License: {data.node.licenseInfo.name}</Text>
        <Text style={{color: ghWhite}}>Last update: {data.node.updatedAt}</Text>
      </View>
      <View style={styles.itemBottom}>
          <View style={styles.countContainer}>
            <Octicons name="repo-forked" size={16} color={ghBread} />
            <Text style={styles.repoCount}>{data.node.forkCount}</Text> 
          </View>
          <View style={styles.countContainer}>
            <AntDesign name="staro" size={16} color={ghBread} />
            <Text style={styles.repoCount}>{data.node.stargazerCount}</Text>
          </View>
          {data.node.languages.nodes.map(node => (
            <View key={node.id} style={styles.countContainer}>
              <View style={[styles.circle, {backgroundColor: node.color}]}></View>
              <Text style={styles.repoCount}>{node.name}</Text> 
            </View>
          ))}
        </View>
    </View>
  )
}

// <Moment format="YYYY/MM/DD">{data.node.updatedAt}</Moment>