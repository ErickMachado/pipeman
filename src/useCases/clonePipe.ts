import { clonePipes, fetchPipe } from "../tasks/pipe";
import chalk from "chalk";
import { createField, deleteField } from "../tasks/fields";

const TEST_DATABASE_ID = "nGxocpj9";

export async function executeCloneCommand(productionPipeId: number) {
  console.log(chalk.yellow("› Fetching production pipe 🔍"));
  const productionPipe = await fetchPipe(productionPipeId);

  console.log(chalk.yellow("› Creating development pipe 🛠️"));

  const developmentPipeId = await clonePipes([productionPipe.id]);

  setTimeout(async () => {
    const developmentPipe = await fetchPipe(developmentPipeId);

    // * Delete all fields from all phases
    for (const phase of developmentPipe.phases) {
      for (const field of phase.fields) {
        await deleteField(developmentPipe.uuid, field.id);
      }
    }

    // * Delete all start form fields
    for (const field of developmentPipe.initialFormFields) {
      await deleteField(developmentPipe.uuid, field.id);
    }

    // * Recreate initial form fields
    for (const field of productionPipe.initialFormFields) {
      await createField({
        connectedRepoId: TEST_DATABASE_ID,
        canConnectExisting: field.canConnectExisting,
        description: field.description,
        label: field.id,
        options: field.options,
        phaseId: developmentPipe.startFormPhaseId,
        required: field.required,
        type: field.type,
      });
    }

    const findPhaseByName = (phaseName: string) => {
      const phase = developmentPipe.phases.find(
        (phase) => phase.name === phaseName
      );

      return phase;
    };

    // * Recreate fields by phases
    for (const phase of productionPipe.phases) {
      for (const field of phase.fields) {
        const developmentPhase = findPhaseByName(phase.name)!;

        await createField({
          connectedRepoId: TEST_DATABASE_ID,
          canConnectExisting: field.canConnectExisting,
          description: field.description,
          label: field.id,
          options: field.options,
          phaseId: developmentPhase.id,
          required: field.required,
          type: field.type,
        });
      }
    }

    console.log(
      chalk.green(
        `✓ Development pipe successfully created. You can access it on: https://app.pipefy.com/pipes/${developmentPipe.id}`
      )
    );
  }, 40000);
}
