#!/usr/bin/env node
/* eslint-disable ts/no-unused-expressions */

import inquirer from "inquirer";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { version } from "../package.json";

yargs(hideBin(process.argv))
  .scriptName("shlroland-lint")
  .command(
    "$0",
    "cli tool to setup lint tool",
    (yargs) => {
      return yargs.option("interactive", {
        alias: "I",
        type: "boolean",
        description: "Interactive selection of packages to install",
      });
    },
    (argv) => {
      if (argv.interactive) {
        inquirer
          .prompt([
            {
              type: "list",
              name: "lintTools",
              message:
                "Please select the linter and formatter tool to install:",
              choices: [
                {
                  name: "eslint (default)",
                  value: "eslint-default",
                  description:
                    "will install eslint with stylistic rules and external formatters",
                },
                {
                  name: "eslint (no external)",
                  value: "eslint-no-external",
                  description:
                    "will install eslint without no external formatters",
                },
                {
                  name: "eslint (no formatter)",
                  value: "eslint-no-formatter",
                  description:
                    "will install eslint without stylistic and formatters",
                },
                {
                  name: "eslint and prettier",
                  value: "eslint-prettier",
                  description:
                    "will install eslint without stylistic rules and prettier as formatter",
                },
              ],
              default: "eslint-default",
            },
            {
              type: "checkbox",
              name: "gitTools",
              message: "Please select the git related lint tools to install:",
              choices: [
                { name: "commitlint", value: "commitlint" },
                { name: "czg", value: "czg" },
                { name: "lint-staged", value: "lint-staged" },
                { name: "husky", value: "husky" },
              ],
              default: ["commitlint", "czg", "lint-staged", "husky"],
            },
          ])
          .then((answers) => {
            console.log(answers);
            // const tools = [...answers.tools, ...answers.gitTools];
            // installPackages(tools)
          });
      } else {
        console.log("no interactive");
        // installPackages('all')
      }
    },
  )
  .alias("v", "version")
  .version(version)
  .help("h", "help info").argv;
