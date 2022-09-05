import { Field } from './field'
import { Phase } from './phase'

export type PipeEntity = {
  id: number
  name: string
  phases: Phase[]
  start_form_fields: Field[]
  startFormPhaseId: number
  uuid: string
}

export class Pipe {
  public initialFormFields: Field[]
  public id: number
  public name: string
  public phases: Phase[]
  public startFormPhaseId: number
  public uuid: string

  constructor(pipe: PipeEntity) {
    this.initialFormFields = pipe.start_form_fields
    this.id = pipe.id
    this.name = pipe.name
    this.phases = pipe.phases
    this.startFormPhaseId = pipe.startFormPhaseId
    this.uuid = pipe.uuid
  }
}
