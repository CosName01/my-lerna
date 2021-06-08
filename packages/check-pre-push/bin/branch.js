'use strict';

const { print_info } = require("../lib/print");
const { getConf } = require('../lib/getConfig');
const isGitAdded = require('current-git-branch');

const currentBranchName = isGitAdded();

async function checkBranch() {
    return new Promise(function(resolve, reject) {
        print_info('🔍 check', 'branch');
        // 判断是否为有效git repository
        if (!currentBranchName) {
            reject('不是一个有效的git repository\n');
        }
        const { pattern, errorMsg } = getConf('check-pre-push');
        const validBranchNameRegExp = new RegExp(pattern, 'g');
        const result = validBranchNameRegExp.test(currentBranchName);
        if (result) {
            resolve();
        } else {
            const err = `${errorMsg} \n` +
                `分支名: "${currentBranchName}" \n` +
                `Pattern:"${validBranchNameRegExp.toString()}" \n`;
            reject(err);
        }
    });
}

module.exports = {
    checkBranch
};
