const fetch = require("node-fetch");
const {
  makeRemoteExecutableSchema,
  introspectSchema
} = require("graphql-tools");
const { createHttpLink } = require("apollo-link-http");
const { ApolloServer } = require("apollo-server");

async function run() {
  const makeDatabaseServiceLink = () =>
    createHttpLink({
      uri: "http://127.0.0.1:4000/graphql",
      fetch
    });

  const schemaDefinition = await introspectSchema(makeDatabaseServiceLink());

  const executableSchema = makeRemoteExecutableSchema({
    schema: schemaDefinition,
    link: makeDatabaseServiceLink()
  });

  const server = new ApolloServer({ schema: executableSchema });

  server.listen({ port: 8080 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

run();
