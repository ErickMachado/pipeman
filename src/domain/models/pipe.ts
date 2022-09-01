import { Phase } from "./phase";

export type PipeEntity = {
  id: string;
  name: string;
  phases: Phase[];
  uuid: string;
};

export class Pipe {
  public id: string;
  public phases: Phase[];
  public uuid: string;

  constructor(pipe: PipeEntity) {
    this.id = pipe.id;
    this.phases = pipe.phases;
    this.uuid = pipe.uuid;
  }
}
