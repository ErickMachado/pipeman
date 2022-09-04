import { gql } from "graphql-request";
import { graphqlClient } from "../../infra/graphqlClient";

type Params = {
  connectedRepoId: string;
  canConnectExisting: boolean;
  description: string;
  label: string;
  options: string[];
  phaseId: number;
  required: boolean;
  type: string;
};

export async function createField({
  connectedRepoId,
  canConnectExisting,
  description,
  label,
  options,
  phaseId,
  required,
  type,
}: Params) {
  const normalizedOptions = options.map((option) =>
    option.replace(/[\\"]/g, "")
  );

  const query = gql`
    mutation (
      $label: String!
      $phaseId: ID!
      $type: ID!
      $connectedRepoId: ID
      $required: Boolean
      $options: [String]
      $description: String
      $canConnectExisting: Boolean
    ) {
      createPhaseField(
        input: {
          label: $label
          phase_id: $phaseId
          type: $type
          connectedRepoId: $connectedRepoId
          required: $required
          options: $options
          description: $description
          canConnectExisting: $canConnectExisting
        }
      ) {
        clientMutationId
      }
    }
  `;

  await graphqlClient.request(query, {
    label,
    canConnectExisting,
    description,
    phaseId,
    type,
    connectedRepoId,
    required,
    options: normalizedOptions,
  });
}
