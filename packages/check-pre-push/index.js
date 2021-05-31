#!/usr/bin/env node

'use strict';

const execSync = require('child_process').execSync;
const branchName = require('current-git-branch');
const {
    validateBranchName,
} = require('./lib/checkBranchName');
const currentBranchName = branchName();
const SUCCESS_CODE = 0;
const FAILED_CODE = 1;

let message = execSync('git show -s --format=%s').toString().trim();
let message2 = execSync('git show -s --format=%b').toString().trim();
console.log(message)
console.log(message2)

// validate whether it is a git repository
if (!currentBranchName) {
    console.error('\x1b[31m%s\x1b[0m', 'Error: not a git repository\n');
    process.exitCode = FAILED_CODE;
    return;
}
try {
    const result = validateBranchName(currentBranchName);
    process.exitCode = result ? SUCCESS_CODE : FAILED_CODE;
} catch (error) {
    console.error('\x1b[31m%s\x1b[0m', error.message + '\n');
    process.exitCode = FAILED_CODE;
}
