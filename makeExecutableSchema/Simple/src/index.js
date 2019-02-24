const { makeExecutableSchema } = require("graphql-tools");
const { fetchItemById, fetchItemByType } = require("./resolvers");
const { graphql } = require("graphql");

const typeDefs = `
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

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const query1 = `
  query {
    item(id: "2") {
      id
      name
    }
  }
`;
graphql(schema, query1).then(result =>
  console.log(JSON.stringify(result, null, 2))
);

const query2 = `
  query {
    itemByType(type: "hoge") {
      id
      name
    }
  }
`;
graphql(schema, query2).then(result =>
  console.log(JSON.stringify(result, null, 2))
);
