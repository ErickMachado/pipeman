#! /usr/bin/env node

import { Command } from 'commander'
import { executeCloneCommand } from './useCases/clonePipe'

const program = new Command()

program
  .name('Pipeman')
  .description("Manage Pipefy's pipes via CLI")
  .version('0.1.0')

program
  .command('clone')
  .description("Create a fully identical version of a Pipefy's pipe")
  .argument('pipeId', 'The ID of the pipe that will be cloned')
  .action(executeCloneCommand)

program.parse()
