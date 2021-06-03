#!/usr/bin/env node

'use strict';

const { print_info, print_error } = require("../lib/print");
const {execSync } = require('child_process');
const { getConf } = require('../lib/getConfig');

const SUCCESS_CODE = 0;
const FAILED_CODE = 1;

print_info('check', 'commit_message');
let message = execSync('git show -s --format=%s').toString().trim(); // commit message
const { commitTag } = getConf('check-pre-push');
const commit_tags_pattern = commitTag.join('|');
const commit_pattern_str = `^(${commit_tags_pattern})(\\([^\\)]*\\))?:`;
const commit_pattern = new RegExp(commit_pattern_str);
const result = commit_pattern.test(message);
if (result) {
    process.exitCode = SUCCESS_CODE;
    console.log('ok');
} else {
    print_error(`commit message不符合规范  \n` +
        `commit message: "${message}" \n` +
        `Pattern: ${commit_pattern}`
    );
    process.exitCode = FAILED_CODE;
}
