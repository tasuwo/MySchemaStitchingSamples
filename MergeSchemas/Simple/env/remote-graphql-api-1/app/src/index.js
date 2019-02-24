const { fetchItemById, fetchItemByType } = require("./resolvers");
const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    item(id: ID!): Item
    itemByType(type: String!): [Item!]!
  }
  type Item {
    id: ID!
    name: String
    type: String
    created_at: String
    updated_at: String
  }
`;

const resolvers = {
  Query: {
    item: (root, args, context, info) => {
      return fetchItemById(args.id);
    },
    itemByType: (root, args, context, info) => {
      return fetchItemByType(args.type);
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
