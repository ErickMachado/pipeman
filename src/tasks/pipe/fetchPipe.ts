import { Pipe, PipeEntity } from "../../domain/models/pipe";
import { httpClient } from "../../infra/httpClient";

type FetchPipeResponse = {
  data: {
    pipe: PipeEntity;
  };
};

export async function fetchPipe(pipeId: number): Promise<Pipe> {
  const query = `
    query {
      pipe(id: ${pipeId}) {
        phases {
          fields {
            id
            label
            options
            required
            type
          }
          id
          name
        }
        name
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
