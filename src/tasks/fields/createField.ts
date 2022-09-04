import { gql } from "graphql-request";
import { graphqlClient } from "../../infra/graphqlClient";

type Params = {
  connectedRepoId: number;
  description: string;
  label: string;
  options: string[];
  phaseId: number;
  required: boolean;
  type: string;
};

export async function createField({
  connectedRepoId,
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
        }
      ) {
        clientMutationId
      }
    }
  `;

  await graphqlClient.request(query, {
    label,
    description,
    phaseId,
    type,
    connectedRepoId,
    required,
    options: normalizedOptions,
  });
}
