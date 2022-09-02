import { createPhase, deletePhase } from "../tasks/phase";
import { createField } from "../tasks/fields";
import { createPipe, fetchPipe } from "../tasks/pipe";

export async function executeCloneCommand(productionPipeId: number) {
  const productionPipe = await fetchPipe(productionPipeId);
  const pipeName = `${productionPipe.name} - ${new Date().toISOString()}`;
  const developmentPipe = await createPipe(pipeName, "153855");
  const defaultPhases = developmentPipe.phases;

  for (const phase of productionPipe.phases) {
    const phaseId = await createPhase(phase.name, developmentPipe.id);

    for (const field of phase.fields) {
      await createField({
        connectedRepoId: developmentPipe.id,
        label: field.id,
        options: field.options,
        phaseId,
        required: field.required,
        type: field.type,
      });
    }
  }

  for (const phase of defaultPhases) {
    await deletePhase(phase.id);
  }
}
