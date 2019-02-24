const fetch = require("node-fetch");
const {
  makeRemoteExecutableSchema,
  introspectSchema,
  mergeSchemas
} = require("graphql-tools");
const { createHttpLink } = require("apollo-link-http");
const { ApolloServer } = require("apollo-server");

const getRemoteExecutableSchema = async endpoint => {
  const makeDatabaseServiceLink = () =>
    createHttpLink({
      uri: endpoint,
      fetch
    });

  const schemaDefinition = await introspectSchema(makeDatabaseServiceLink());

  return makeRemoteExecutableSchema({
    schema: schemaDefinition,
    link: makeDatabaseServiceLink()
  });
};

async function run() {
  const executableSchema1 = await getRemoteExecutableSchema(
    "http://localhost:4001/graphql"
  );
  const executableSchema2 = await getRemoteExecutableSchema(
    "http://localhost:4002/graphql"
  );
  const mergedExecutableSchema = mergeSchemas({
    schemas: [executableSchema1, executableSchema2]
  });

  const server = new ApolloServer({ schema: mergedExecutableSchema });

  server.listen({ port: 8080 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

run();
