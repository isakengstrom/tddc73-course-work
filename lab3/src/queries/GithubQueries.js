import { gql } from '@apollo/client'

export const REPOS_QUERY = gql`
  query ReposQuery($query: String!) {
    search(first: 10, type: REPOSITORY, query: $query) { 
      nodes {
        ... on Repository {
          id
          name
          description
          owner {
            login
          }
          forkCount
          stargazerCount
          updatedAt
          languages(orderBy: {field: SIZE, direction: DESC}, first: 1) {
            totalSize
            edges {
              size
              node {
                color
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const REPO_QUERY = gql`
  query RepoQuery($id: ID!) {
    node(id: $id) {
      id 
      ... on Repository {
        name
        description
        forkCount
        stargazerCount
        updatedAt
        owner {
          login
        }
        licenseInfo {
          name
        }
        ref(qualifiedName: "master") {
          target {
            ... on Commit {
              history {
                totalCount
              }
            }
          }
        }
        languages(orderBy: {field: SIZE, direction: DESC}, first: 3) {
          totalSize
          edges {
            size
            node {
              color
              id
              name
            }
          }
        }
      }
    }
  }
`;

export const COMMITS_QUERY = gql`
  query RepoQuery($id: ID!) {
    node(id: $id) {
      id 
      ... on Repository {
        ref(qualifiedName: "master") {
          target {
            ... on Commit {
              history(first: 100) {
                totalCount
                nodes {
                  id
                  messageHeadline
                  author {
                    name
                    date
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;