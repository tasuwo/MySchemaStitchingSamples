const fetch = require("node-fetch");
const {
  makeRemoteExecutableSchema,
  introspectSchema,
  mergeSchemas
} = require("graphql-tools");
const { createHttpLink } = require("apollo-link-http");
const { ApolloServer, gql } = require("apollo-server");

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
  const itemSchema = await getRemoteExecutableSchema(
    "http://localhost:4001/graphql"
  );
  const userSchema = await getRemoteExecutableSchema(
    "http://localhost:4002/graphql"
  );

  const linkTypeDefs = gql`
    extend type User {
      items: [Item]
    }

    extend type Item {
      owner: User
    }
  `;

  const mergedExecutableSchema = mergeSchemas({
    schemas: [itemSchema, userSchema, linkTypeDefs],
    resolvers: {
      User: {
        items: {
          fragment: `... on User { id }`,
          resolve(user, args, context, info) {
            return info.mergeInfo.delegateToSchema({
              schema: itemSchema,
              operation: "query",
              fieldName: "itemByUserId",
              args: {
                id: user.id
              },
              context,
              info
            });
          }
        }
      },
      Item: {
        owner: {
          fragment: `... on Item { user_id }`,
          resolve(item, args, context, info) {
            return info.mergeInfo.delegateToSchema({
              schema: userSchema,
              operation: "query",
              fieldName: "user",
              args: {
                id: item.user_id
              },
              context,
              info
            });
          }
        }
      }
    }
  });

  const server = new ApolloServer({ schema: mergedExecutableSchema });

  server.listen({ port: 8080 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

run();
