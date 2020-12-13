import { gql } from '@apollo/client'

export const REPOS_QUERY = gql`
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
          updatedAt
          languages(orderBy: {field: SIZE, direction: DESC}, first: 1) {
            nodes {
              name
              color
              id
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

        ref(qualifiedName: "master") {
          target {
            ... on Commit {
              history {
                totalCount
              }
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

        ref(qualifiedName: "master") {
          target {
            ... on Commit {
              history(first: 1) {
                totalCount
                nodes {
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