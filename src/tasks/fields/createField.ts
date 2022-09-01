import { program } from "commander";
import { httpClient } from "../../infra/httpClient";

type CreateFieldResponse = {
  errors?: {
    message: string;
    locations: any;
  }[];
};

export async function createField(
  label: string,
  phaseId: string,
  type: string
) {
  const mutation = `
    mutation {
      createPhaseField(input: { label: "${label}",  phase_id: ${phaseId},  type: "${type}"}) {
        clientMutationId
      }
    }  
  `;

  const { data } = await httpClient.post<CreateFieldResponse>("/graphql", {
    query: mutation,
  });

  if (data.errors) {
    console.log({
      error: data.errors,
      message: `Error creating the field ${label}`,
    });
  }
}
