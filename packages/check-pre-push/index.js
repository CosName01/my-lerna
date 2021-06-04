#!/usr/bin/env node

'use strict';

const { print_error } = require("./lib/print");
const { checkBranch } = require('./bin/branch.js');
const { checkCommitMsg } = require('./bin/commit.js');

const SUCCESS_CODE = 0;
const FAILED_CODE = 1;

console.log('args:', process.argv);
checkBranch().then(() => {
    console.log('👌');
    checkCommitMsg().then(() => {
        console.log('👌');
        process.exitCode = SUCCESS_CODE;
    }).catch(err => {
        print_error(err);
        process.exitCode = FAILED_CODE;
    });
}).catch(err => {
    print_error(err);
    process.exitCode = FAILED_CODE;
});
