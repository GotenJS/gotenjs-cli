#!/usr/bin/env node
const program = require("commander");
const shell = require("shelljs");
const cliNode = require("./src/cli-node");
const cliReact = require("./src/cli-react");
const cliAngular = require("./src/cli-angular");

shell.config.silent = true;

const collect = (val, memo) => {
    memo.push(val);
    return memo;
};

const functions = {
    collect
};

cliNode.addNodeCommands(program, functions);
cliReact.addReactCommands(program, functions);
cliAngular.addAngularCommands(program, functions);

program.parse(process.argv);
