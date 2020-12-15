import React from 'react';
import { View, Text, FlatList} from 'react-native';
import { useQuery } from '@apollo/client';
import { MaterialIcons } from '@expo/vector-icons';

import moment from 'moment';

import Loading from './Loading';
import styles, {ghBread, ghWhite, ghBorder, ghBackground} from './Styles';
import { COMMITS_QUERY } from '../queries/GithubQueries';
const CommitContainer = ({repoId}) => {

  const { loading, error, data } = useQuery(COMMITS_QUERY, {
    variables: {
      id: repoId, 
    }
  })

  const CommitItem = ({commit}) => {
    const { messageHeadline, author } = commit

    return (
      <View style={styles.commitContainer}>
        <View style={styles.commitHeader}>
          <Text style={{color: ghBorder}}>By </Text>
          <Text style={{color: ghBread}}>{author.name}</Text>
          <Text style={{color: ghBorder}}>, on </Text>
          <Text style={{color: ghBread}}>{moment(author.date).format("MMM DD, YYYY")}</Text>
          <Text style={{color: ghBorder}}>:</Text>
        </View>
        <Text style={styles.commitMessage}>{messageHeadline}</Text>
      </View>
    )
  }

  const showCommits = () => {
    if(loading) {
      return <Loading itemType={'commits'} />
    }
    else {
      return( 
        <FlatList
          data={data.node.ref.target.history.nodes}
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
  
    
  if(error) {
    return <Text>Error loading commit history..</Text>
  }
  else {
    return(
      <View style={styles.onRepoCommits}>
        {showCommits()}
      </View>
    );  
  }
} 

export default CommitContainer;