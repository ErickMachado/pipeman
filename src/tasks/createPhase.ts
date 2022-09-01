import { httpClient } from "../infra/httpClient";

export async function createPhase(name: string, pipeId: string): Promise<void> {
  const query = `
    mutation {
      createPhase(input: { name: "${name}", pipe_id: "${pipeId}" }) {
        clientMutationId
      }
    }
  `;

  const { data } = await httpClient.post("/graphql", { query });

  console.log(data);
}
