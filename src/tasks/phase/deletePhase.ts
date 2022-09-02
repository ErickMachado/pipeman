import { httpClient } from "../../infra/httpClient";

type PhaseDeletionResponse = {
  errors?: {
    message: string;
  }[];
};

export async function deletePhase(phaseId: string): Promise<void> {
  const mutation = `
    mutation {
      deletePhase(input: { id: "${phaseId}" }) {
        success
      }
    }
  `;

  const { data } = await httpClient.post<PhaseDeletionResponse>("/graphql", {
    query: mutation,
  });

  console.log(data);

  if (data.errors) console.log(data.errors[0].message);
}
