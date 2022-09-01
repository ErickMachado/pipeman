import { httpClient } from "../../infra/httpClient";

export async function deleteField(pipeUUID: string, fieldId: string) {
  const mutation = `
    mutation {
      deletePhaseField(input: { id: "${fieldId}", pipeUuid: "${pipeUUID}" }) {
        success
      }
    }
  `;

  await httpClient.post("/graphql", { query: mutation });
}
