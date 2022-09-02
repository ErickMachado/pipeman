import { Field } from "./field";

export type Phase = {
  cardsCanBeMovedToPhases: { id: string }[];
  color: string;
  fields: Field[];
  id: number;
  name: string;
};
