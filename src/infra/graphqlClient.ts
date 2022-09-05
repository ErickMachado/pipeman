import { GraphQLClient } from 'graphql-request'

const PIPEFY_API = 'https://api.pipefy.com/graphql'
const PIPEFY_TOKEN = process.env.PIPEFY_TOKEN

export const graphqlClient = new GraphQLClient(PIPEFY_API, {
  headers: {
    authorization: `Bearer ${PIPEFY_TOKEN}`
  }
})
