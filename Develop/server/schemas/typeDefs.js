const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!  # Note: In a real-world scenario, never store passwords as plain text. Always use proper hashing.
    savedBooks: [Book]!
  }

  type Book {
    _id: ID!
    title: String!
    author: String!
    description: String!
    image: String!
    link: String!
  }

  type Tech {
    _id: ID!
    name: String!
  }

  type Matchup {
    _id: ID!
    tech1: String!
    tech2: String!
    tech1_votes: Int
    tech2_votes: Int
  }

  type Query {
    tech: [Tech]
    matchups(_id: String): [Matchup]
    me: User  # Retrieve the currently logged-in user
    books: [Book]  # Retrieve all books
    bookSearch(query: String!): [Book]  # Search for books
  }

  type Mutation {
    createMatchup(tech1: String!, tech2: String!): Matchup
    createVote(_id: String!, techNum: Int!): Matchup
    signup(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    saveBook(bookInput: BookInput!): User
    removeBook(bookId: ID!): User
    logout: String  # Return a message indicating successful logout
  }

  input BookInput {
    title: String!
    author: String!
    description: String!
    image: String!
    link: String!
  }
`;

module.exports = typeDefs;