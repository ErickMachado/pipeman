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
  .description("Create a fully identical version of production pipe")
  .argument("pipeId", "The production pipe ID")
  .action(executeCloneCommand);

program.parse();
