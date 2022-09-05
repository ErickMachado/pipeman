import { gql } from 'graphql-request'
import { graphqlClient } from '../../infra/graphqlClient'

export async function deletePhase(phaseId: number): Promise<void> {
  const query = gql`
    mutation ($phaseId: ID!) {
      deletePhase(input: { id: $phaseId }) {
        success
      }
    }
  `

  await graphqlClient.request(query, {
    phaseId
  })
}
