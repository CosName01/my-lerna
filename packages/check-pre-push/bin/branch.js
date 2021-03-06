'use strict';

const { print_info } = require("../lib/print");
const { getConf } = require('../lib/getConfig');
const isGitAdded = require('current-git-branch');

const currentBranchName = isGitAdded();

async function checkBranch() {
    return new Promise(function(resolve, reject) {
        print_info('ð check', 'branch');
        // å¤æ­æ¯å¦ä¸ºæægit repository
        if (!currentBranchName) {
            reject('ä¸æ¯ä¸ä¸ªææçgit repository\n');
        }
        const { pattern, errorMsg } = getConf('check-pre-push');
        const validBranchNameRegExp = new RegExp(pattern, 'g');
        const result = validBranchNameRegExp.test(currentBranchName);
        if (result) {
            resolve();
        } else {
            const err = `${errorMsg} \n` +
                `åæ¯å: "${currentBranchName}" \n` +
                `Pattern:"${validBranchNameRegExp.toString()}" \n`;
            reject(err);
        }
    });
}

module.exports = {
    checkBranch
};
