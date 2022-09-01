import { logger } from "../infra/logger";
import { clonePipe } from "../tasks/clonePipe";
import { fetchPipe } from "../tasks/fetchPipe";
import { createField } from "../tasks/fields/createField";
import { deleteField } from "../tasks/fields/deleteField";

export async function executeCloneCommand(productionPipeId: string) {
  const clonedPipeId = await clonePipe(productionPipeId);
  const productionPipe = await fetchPipe(productionPipeId);

  // ! This timeout is required because the cloned pipe is not instantlly ready
  setTimeout(async () => {
    const developmentPipe = await fetchPipe(clonedPipeId);

    // ! Delete all fields on the cloned pipe
    developmentPipe.phases.forEach((phase) => {
      phase.fields.forEach(async (field) => {
        await deleteField(developmentPipe.uuid, field.id);
      });
    });

    // ! Recreate the fields using the production pipe field IDs as label
    developmentPipe.phases.forEach((phase) => {
      productionPipe.phases.forEach(({ fields }) => {
        fields.forEach(async (field) => {
          if (field.id.startsWith("statement")) return;

          await createField(field.id, phase.id, field.type);
        });
      });
    });

    logger.info(
      `Pipe clone was successfully made. Here is the cloned pipe ID: ${developmentPipe.id}`
    );
  }, 10000);
}
