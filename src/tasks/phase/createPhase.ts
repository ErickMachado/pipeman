import { httpClient } from "../../infra/httpClient";

export async function createPhase(
  name: string,
  pipeId: number
): Promise<number> {
  const query = `
    mutation {
      createPhase(input: { name: "${name}", pipe_id: "${pipeId}" }) {
        phase {
          id
        }
      }
    }
  `;

  const { data } = await httpClient.post("/graphql", { query });

  return data.data.createPhase.phase.id;
}
