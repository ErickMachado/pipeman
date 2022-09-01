import { Pipe, PipeEntity } from "../domain/models/pipe";
import { httpClient } from "../infra/httpClient";

type FetchPipeResponse = {
  data: {
    pipe: PipeEntity;
  };
};

export async function fetchPipe(pipeId: string): Promise<Pipe> {
  const query = `
    query {
      pipe(id: ${pipeId}) {
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
  `;
  const { data } = await httpClient.post<FetchPipeResponse>("/graphql", {
    query,
  });

  return new Pipe(data.data.pipe);
}
