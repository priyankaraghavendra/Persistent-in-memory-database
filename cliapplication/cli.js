#!/usr/bin/env node

const yargs = require("yargs");
const minimist = require('minimist');
const executeQuery = require("../query_engine");

const options = yargs
    .usage("Usage: -q <SQL command>")
    .usage("Usage: -h <help>")
    .option("q", { alias: "query", describe: "Enter the SQL query", type: "string", demandOption: true })
    .option("h", { alias: "help", describe: "A description of the commands supported by the database", type: "string" })
    .argv;

const enteredQuery = `${options.q}`;

const args = minimist(process.argv.slice(2));
const cmd = args._[0];

switch (cmd) {
    case '-q':
        const result = executeQuery(enteredQuery);
        console.log(result);
        break;
    case '-h':
        require('./help');
        break;
}

// var fileOperation = process.argv.slice(4);

// switch (fileOperation[0]){
//   case '-q':
//    const result = executeQuery(enteredQuery);
//    console.log(result);
//    break;

//   case '-h':
//    require('./help');
//    break;
// }

