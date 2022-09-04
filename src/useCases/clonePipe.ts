import { createPhase, deletePhase } from "../tasks/phase";
import { createField } from "../tasks/fields";
import { createPipe, fetchPipe } from "../tasks/pipe";
import chalk from "chalk";

export async function executeCloneCommand(productionPipeId: number) {
  console.log(chalk.yellow("› Fetching production pipe"));
  const productionPipe = await fetchPipe(productionPipeId);

  console.log(chalk.yellow("› Creating development pipe"));

  const currentDate = new Date().toISOString().split("T")[0];
  const pipeName = `${productionPipe.name} - ${currentDate}`;
  const developmentPipe = await createPipe(
    pipeName,
    "153855",
    productionPipe.initialFormFields
  );
  const defaultPhases = developmentPipe.phases;

  console.log(chalk.yellow(`› Cloning phases and fields from production pipe`));
  for (const phase of productionPipe.phases) {
    const phaseId = await createPhase(phase.name, developmentPipe.id);

    for (const field of phase.fields) {
      if (field.id.toLowerCase().startsWith("statement")) continue;

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

  console.log(chalk.yellow("› Cleaning house"));
  for (const phase of defaultPhases) {
    await deletePhase(phase.id);
  }

  console.log(
    chalk.green(
      `✓ Development pipe was successfully create. You can access on: https://app.pipefy.com/pipes/${developmentPipe.id}`
    )
  );
}
