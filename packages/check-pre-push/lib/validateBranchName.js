'use strict';

const { print_error } = require("./print");
const { getConf } = require('./getConfig');

function validateBranchName(branchName) {
    const { pattern, errorMsg } = getConf('check-pre-push');
    const validBranchNameRegExp = new RegExp(pattern, 'g');
    const result = validBranchNameRegExp.test(branchName);
    if (!result) {
        print_error(
            `${errorMsg} \n` +
            `分支名: "${branchName}" \n` +
            `Pattern:"${validBranchNameRegExp.toString()}" \n`
        );
    }
    return result;
}

module.exports.validateBranchName = validateBranchName;
