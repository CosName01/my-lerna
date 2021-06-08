'use strict';

const { print_info } = require("../lib/print");
const { getConf } = require('../lib/getConfig');
const getCommitMsg = require("../lib/getCommitMsg");

const { commitTag } = getConf('check-pre-push');
const COMMIT_PATTERN = new RegExp(`^(${commitTag.join('|')})(\\([^\\)]*\\))?:`);
const MERGE_COMMIT_PATTERN = /^Merge/;

async function checkCommitMsg() {
    return new Promise(function(resolve, reject) {
        print_info('check', 'commit_message');
        let { message, sourceFile } = getCommitMsg(); // commit message
        const result = COMMIT_PATTERN.test(message);
        console.log(message.split('\n').filter(function(str) {
            return str.indexOf('#') !== 0;
        }).join('\n'));
        if (result) {
            resolve();
        } else {
            if (MERGE_COMMIT_PATTERN.test(message)) {
                console.log('Merge commit detected.');
                resolve();
            }
            const err = `commit message不符合规范  \n` +
                `commit message: "${message}" \n` +
                `Pattern: ${COMMIT_PATTERN}`;
            reject(err);
        }
    });
}

module.exports = {
    checkCommitMsg
};

