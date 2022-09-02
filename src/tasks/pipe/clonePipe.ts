import { program } from "commander";
import { httpClient } from "../../infra/httpClient";
import { logger } from "../../infra/logger";

type ClonedPipeResponse = {
  data: { clonePipes: { pipes: { id: string }[] } };
  errors?: {
    message: string;
  }[];
};

export async function clonePipe(pipeId: string): Promise<string> {
  logger.info(`👷 Cloning pipe with ID ${pipeId}`);

  const mutation = `
    mutation {
      clonePipes(input: { pipe_template_ids: ${pipeId} }) {
        pipes {
          id
        }
      }
    }
  `;
  const { data } = await httpClient.post<ClonedPipeResponse>("/graphql", {
    query: mutation,
  });

  if (data.errors) {
    logger.error(`❌ Failed to clone pipe. ${data.errors[0].message}`);

    program.error(data.errors[0].message);
  }

  return data.data.clonePipes.pipes[0].id;
}
