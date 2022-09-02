import { gql } from "graphql-request";
import { Pipe, PipeEntity } from "../../domain/models/pipe";
import { graphqlClient } from "../../infra/graphqlClient";

type FetchPipeResponse = {
  pipe: PipeEntity;
};

export async function fetchPipe(pipeId: number): Promise<Pipe> {
  const query = gql`
    query ($pipeId: ID!) {
      pipe(id: $pipeId) {
        phases {
          fields {
            id
            label
            options
            required
            type
          }
          cards_can_be_moved_to_phases {
            id
          }
          color
          id
          name
        }
        name
        id
        uuid
      }
    }
  `;
  const { pipe } = await graphqlClient.request<FetchPipeResponse>(query, {
    pipeId,
  });

  return new Pipe(pipe);
}
