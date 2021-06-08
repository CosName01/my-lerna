#!/usr/bin/env node

'use strict';

const { print_error } = require("./lib/print");
const { checkBranch } = require('./bin/branch.js');
const { checkCommitMsg } = require('./bin/commit.js');

const SUCCESS_CODE = 0;
const FAILED_CODE = 1;

function checkSuccess(info) {
    console.log('👌');
    info && console.log(info);
    process.exitCode = SUCCESS_CODE;
}
function checkFail(err) {
    print_error(err);
    process.exitCode = FAILED_CODE;
}

async function check() {
    const args = process.argv.slice(2).filter(arg => arg.includes('--')); // 参数
    if (args.includes('--msg')) {
        checkCommitMsg().then((res) => {
            checkSuccess(res);
        }).catch(err => {
            checkFail(err);
        });
    } else if (args.includes('--branch')) {
        checkBranch().then(() => {
            checkSuccess();
        }).catch(err => {
            checkFail(err);
        });
    } else {
        try {
            await checkBranch();
            console.log('👌');
            await checkCommitMsg();
            checkSuccess();
        } catch (err) {
            checkFail(err);
        }
    }
}
check();
