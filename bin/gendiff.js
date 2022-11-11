#!/usr/bin/env node

import { Command } from 'commander';
import { genDiff } from '../src/index.js';

const program = new Command();

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((file1, file2) => genDiff(file1, file2))
  .parse(process.argv);

