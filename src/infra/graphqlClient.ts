import { GraphQLClient } from "graphql-request";

const PIPEFY_API = "https://api.pipefy.com/graphql";
const PIPEFY_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDIxMDM5NjMsImVtYWlsIjoiZXJpY2subWFjaGFkb0B0ZXJyYW1hZ25hLmNvbS5iciIsImFwcGxpY2F0aW9uIjozMDAxODYyNDh9fQ.6WHPV-yOXf9R4AQS4rlwMUmsbb8Ao513C5-xTKVgNN2kCMCoqLwZCeDXkSmYacV7otICqC9-MloPSRRlJHT3Dg";

export const graphqlClient = new GraphQLClient(PIPEFY_API, {
  headers: {
    authorization: `Bearer ${PIPEFY_TOKEN}`,
  },
});
