import chalk from "chalk";
import { program } from "commander";
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
            canConnectExisting
            description
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
        start_form_fields {
          description
          options
          required
          id
          type
        }
        startFormPhaseId
        name
        id
        uuid
      }
    }
  `;
  const { pipe } = await graphqlClient.request<FetchPipeResponse>(query, {
    pipeId,
  });

  if (!pipe) {
    console.log(chalk.red(`✕ Pipe with ID ${pipeId} does not exists`));

    program.error("");
  }

  return new Pipe(pipe);
}
