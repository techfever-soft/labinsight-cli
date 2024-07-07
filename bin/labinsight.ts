#!/usr/bin/env node

import { analyze } from "../src/commands/analyze";
import { explore } from "../src/commands/explore";
import { init } from "../src/commands/init";
import { program } from "commander";

program.version("0.1.2");

/**
 * Initialize a new .labinsight file
 */
program
  .command("init")
  .description("Initialize a new .labinsight file")
  .action(init);

/**
 * Explore the project root
 * @deprecated
 */
// program
//   .command("explore")
//   .description("Explores the project to generate a report")
//   .action(explore);

/**
 * Analyze the project basically
 */
program
  .command("analyze")
  .description("Basic analysis of the project files")
  .action(analyze);

program.parse(process.argv);
