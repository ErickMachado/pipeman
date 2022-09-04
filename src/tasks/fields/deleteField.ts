import { gql } from "graphql-request";
import { graphqlClient } from "../../infra/graphqlClient";

export async function deleteField(pipeUUID: string, fieldId: string) {
  const query = gql`
    mutation ($fieldId: ID!, $pipeUUID: ID!) {
      deletePhaseField(input: { id: $fieldId, pipeUuid: $pipeUUID }) {
        success
      }
    }
  `;

  await graphqlClient.request(query, {
    fieldId,
    pipeUUID,
  });
}
