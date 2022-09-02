import { Pipe, PipeEntity } from "../../domain/models/pipe";
import { httpClient } from "../../infra/httpClient";

type CreatePipeResponse = {
  data: {
    createPipe: {
      pipe: PipeEntity;
    };
  };
};

export async function createPipe(
  name: string,
  organizationId: string
): Promise<Pipe> {
  const query = `
    mutation {
      createPipe(input: { name: "${name}", organization_id: "${organizationId}" }) {
        pipe {
          phases {
            fields {
              id
              label
              type
            }
            id
            name
          }
          id
          uuid
        }
      }
    }
  `;

  const { data } = await httpClient.post<CreatePipeResponse>("/graphql", {
    query,
  });

  return new Pipe(data.data.createPipe.pipe);
}
