import { gql } from "graphql-request";
import { Pipe, PipeEntity } from "../../domain/models/pipe";
import { graphqlClient } from "../../infra/graphqlClient";

type ClonePipeResponse = {
  clonePipes: {
    pipes: PipeEntity[];
  };
};

export async function clonePipe(pipeIds: number[]): Promise<number> {
  const query = gql`
    mutation ($pipeId: [ID]!) {
      clonePipes(input: { pipe_template_ids: $pipeId }) {
        pipes {
          id
        }
      }
    }
  `;

  const { clonePipes } = await graphqlClient.request<ClonePipeResponse>(query, {
    pipeId: pipeIds,
  });

  return clonePipes.pipes[0].id;
}
