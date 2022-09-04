import { gql } from "graphql-request";
import { InitialFormField, Pipe, PipeEntity } from "../../domain/models/pipe";
import { graphqlClient } from "../../infra/graphqlClient";
import { httpClient } from "../../infra/httpClient";

type CreatePipeResponse = {
  createPipe: {
    pipe: PipeEntity;
  };
};

export async function createPipe(
  name: string,
  organizationId: string,
  initialFormFields: InitialFormField[]
) {
  const formFields = initialFormFields.map((field) => ({
    label: field.id,
    required: field.required,
    type_id: field.type,
  }));

  const query = gql`
    mutation (
      $name: String!
      $organizationId: ID!
      $startFromFields: [PhaseFieldInput]
    ) {
      createPipe(
        input: {
          name: $name
          organization_id: $organizationId
          start_form_fields: $startFromFields
        }
      ) {
        pipe {
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
    }
  `;

  const { createPipe } = await graphqlClient.request<CreatePipeResponse>(
    query,
    {
      name,
      organizationId,
      startFromFields: formFields,
    }
  );

  return new Pipe(createPipe.pipe);
}
