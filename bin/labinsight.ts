#!/usr/bin/env node

import { analyze } from "../src/commands/analyze";
import { init } from "../src/commands/init";
import { program } from "commander";
import { login } from "../src/commands/login";
import { logout } from "../src/commands/logout";
import { lint } from "../src/commands/lint";

program.version("0.1.3");

/**
 * Initialize a new .labinsight file
 */
program
  .command("init")
  .description("Initialize a new .labinsight file")
  .action(init);

/**
 * Analyze the project basically
 */
program
  .command("analyze")
  .description("Basic analysis of the project files")
  .action(analyze);

/**
 * Lint the project files using ESLint
 */
program
  .command("lint")
  .description("Lint the project files using ESLint")
  .action(lint);

/**
 * Login to the LabInsight account
 */
program
  .command("login")
  .description("Login to your LabInsight account")
  .action(login);

/**
 * Logout from the LabInsight account
 */
program
  .command("logout")
  .description("Logout from your LabInsight account")
  .action(logout);

program.parse(process.argv);
