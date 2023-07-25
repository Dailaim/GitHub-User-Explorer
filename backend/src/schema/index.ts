export const schema = `#graphql

  type User {
    id: ID
    githubID: Int!
    login: String!
    avatarUrl: String!
    apiUrl: String!
    htmlUrl: String!
    name: String!
    location: String
    publicRepos: Int
    followers: Int
    following: Int
    save: Boolean
  }

  type UserSearchResult {
    githubID: Int!
    login: String!
    avatarUrl: String!
    apiUrl: String!
    htmlUrl: String!
    save: Boolean
  }

  input UserInput {
    githubID: Int!
    login: String!
    avatarUrl: String!
    apiUrl: String!
    htmlUrl: String!
    name: String!
    location: String
    publicRepos: Int
    followers: Int
    following: Int
  }


  input UserSearchInput {
    login: String!
  }

  type Query {
    searchUser(username: String!): [UserSearchResult] 
    getUser(username: String!): User
    getSavedUsers: [User]
  }

  type Mutation {
    saveUser(user: UserInput, search: UserSearchInput ): User
    deleteUser(githubID: Int!): User
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
