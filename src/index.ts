#! /usr/bin/env node

import { Command } from "commander";
import { executeCloneCommand } from "./useCases/clonePipe";

const program = new Command();

program
  .name("Pipeman")
  .description("CLI to manage development pipe clones")
  .version("0.1.0");

program
  .command("clone")
  .description("Clone a Pipefy's clone")
  .argument("pipeId", "The ID of the pipe that will be cloned")
  .action(executeCloneCommand);

program.parse();
