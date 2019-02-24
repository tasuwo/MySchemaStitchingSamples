const { fetchUserById, fetchUserByRole } = require("./resolvers");
const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    user(id: ID!): User
    userByRole(role: String!): [User!]!
  }
  type User {
    id: ID!
    name: String
    role: String
    created_at: String
    updated_at: String
  }
`;

const resolvers = {
  Query: {
    user: (root, args, context, info) => {
      return fetchUserById(args.id);
    },
    userByRole: (root, args, context, info) => {
      return fetchUserByRole(args.type);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatResponse: (response, query) => {
    console.log(`GraphQL query response: ${JSON.stringify(response)}`);
    return response;
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
