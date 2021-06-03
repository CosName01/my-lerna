#!/usr/bin/env node

'use strict';

const { validateBranchName } = require('../lib/validateBranchName');
const branchName = require('current-git-branch');
const { print_info, print_error } = require("../lib/print");

const currentBranchName = branchName();
const SUCCESS_CODE = 0;
const FAILED_CODE = 1;

// 判断是否为有效git repository
print_info('check', 'branch');
if (!currentBranchName) {
    print_error('不是一个有效的git repository\n');
    return FAILED_CODE;
}
try {
    const result = validateBranchName(currentBranchName);
    if (result) {
        process.exitCode = SUCCESS_CODE;
        console.log('ok');
    } else {
        process.exitCode = FAILED_CODE;
    }
} catch (error) {
    print_error(error.message + '\n');
    return FAILED_CODE;
}
