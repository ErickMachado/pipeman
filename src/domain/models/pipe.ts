import { Phase } from "./phase";

export type PipeEntity = {
  id: number;
  name: string;
  phases: Phase[];
  uuid: string;
};

export class Pipe {
  public id: number;
  public name: string;
  public phases: Phase[];
  public uuid: string;

  constructor(pipe: PipeEntity) {
    this.id = pipe.id;
    this.name = pipe.name;
    this.phases = pipe.phases;
    this.uuid = pipe.uuid;
  }
}
