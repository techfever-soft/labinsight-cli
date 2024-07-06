#!/usr/bin/env node

import { analyze } from "../src/commands/analyze";
import { explore } from "../src/commands/explore";
import { init } from "../src/commands/init";
import { program } from "commander";

program.version("0.1.0");

program
  .command("init")
  .description("Initialize a new .labinsight file")
  .action(init);

program
  .command("explore")
  .description("Explores the project to generate a report")
  .action(explore);

program
  .command("analyze")
  .description("Basic analysis of the project files")
  .action(analyze);

program.parse(process.argv);
