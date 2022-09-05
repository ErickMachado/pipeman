import { gql } from 'graphql-request'
import { graphqlClient } from '../../infra/graphqlClient'

type CreatePhaseResponse = {
  createPhase: {
    phase: {
      id: number
    }
  }
}

export async function createPhase(
  name: string,
  pipeId: number
): Promise<number> {
  const query = gql`
    mutation ($name: String!, $pipeId: ID!) {
      createPhase(input: { name: $name, pipe_id: $pipeId }) {
        phase {
          id
        }
      }
    }
  `

  const { createPhase } = await graphqlClient.request<CreatePhaseResponse>(
    query,
    { name, pipeId }
  )

  return createPhase.phase.id
}
