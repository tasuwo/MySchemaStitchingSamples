const fetch = require("node-fetch");
const {
  delegateToSchema,
  makeRemoteExecutableSchema,
  introspectSchema
} = require("graphql-tools");
const { createHttpLink } = require("apollo-link-http");
const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");

async function run() {
  // Remote Schema を用意する
  const makeDatabaseServiceLink = () =>
    createHttpLink({
      uri: "http://127.0.0.1:4000/graphql",
      fetch
    });
  const remoteSchemaDefinition = await introspectSchema(
    makeDatabaseServiceLink()
  );
  const remoteExecutableSchema = makeRemoteExecutableSchema({
    schema: remoteSchemaDefinition,
    link: makeDatabaseServiceLink()
  });

  // Custom Schema から　Remote Schema を参照する
  const typeDefs = importSchema("./app.graphql");
  const resolvers = {
    Query: {
      hogeItems: (root, args, context, info) => {
        return delegateToSchema({
          schema: remoteExecutableSchema,
          operation: "query",
          fieldName: "itemByType",
          args: { type: "hoge" },
          context,
          info
        });
      }
    }
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  server.listen({ port: 8080 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

run();
