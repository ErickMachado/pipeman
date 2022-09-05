import { clonePipes, fetchPipe } from '../tasks/pipe'
import chalk from 'chalk'
import { createField, deleteField } from '../tasks/fields'

const TIME_TO_PREPARE_PIPE_IN_MILLISECONDS = 40000

export async function executeCloneCommand(
  productionPipeId: number,
  options: any
) {
  console.log(chalk.yellow('› Fetching pipe 🔍'))
  const productionPipe = await fetchPipe(productionPipeId)

  console.log(chalk.yellow(`› Cloning pipe "${productionPipe.name}" 🛠️`))

  const developmentPipeId = await clonePipes([productionPipe.id])

  // ! This timeout is necessary because the cloned pipe is not immediately ready for use
  setTimeout(async () => {
    const developmentPipe = await fetchPipe(developmentPipeId)

    // * Delete all fields from all phases
    for (const phase of developmentPipe.phases) {
      for (const field of phase.fields) {
        await deleteField(developmentPipe.uuid, field.id)
      }
    }

    // * Delete all start form fields
    for (const field of developmentPipe.initialFormFields) {
      await deleteField(developmentPipe.uuid, field.id)
    }

    // * Recreate initial form fields
    for (const field of productionPipe.initialFormFields) {
      await createField({
        connectedRepoId: options.repoid,
        canConnectExisting: field.canConnectExisting,
        description: field.description,
        label: field.id,
        options: field.options,
        phaseId: developmentPipe.startFormPhaseId,
        required: field.required,
        type: field.type
      })
    }

    const findPhaseByName = (phaseName: string) => {
      const phase = developmentPipe.phases.find(
        (phase) => phase.name === phaseName
      )

      return phase
    }

    // * Recreate fields by phases
    for (const phase of productionPipe.phases) {
      for (const field of phase.fields) {
        const developmentPhase = findPhaseByName(phase.name)!

        await createField({
          connectedRepoId: options.repoid,
          canConnectExisting: field.canConnectExisting,
          description: field.description,
          label: field.id,
          options: field.options,
          phaseId: developmentPhase.id,
          required: field.required,
          type: field.type
        })
      }
    }

    console.log(
      chalk.green(
        `✓ Pipe "${productionPipe.name}" successfully cloned. You can access the copy on: https://app.pipefy.com/pipes/${developmentPipe.id}`
      )
    )
  }, TIME_TO_PREPARE_PIPE_IN_MILLISECONDS)
}
