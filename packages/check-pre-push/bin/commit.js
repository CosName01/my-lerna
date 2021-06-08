'use strict';

const { print_info } = require("../lib/print");
const { getConf } = require('../lib/getConfig');
const getCommitMsg = require("../lib/getCommitMsg");
const { commitTag } = getConf('check-pre-push');
const commit_tags_pattern = commitTag.join('|');
const commit_pattern_str = `^(${commit_tags_pattern})(\\([^\\)]*\\))?:`;
const COMMIT_PATTERN = new RegExp(commit_pattern_str);
const MERGE_COMMIT_PATTERN = /^Merge/;

async function checkCommitMsg() {
    return new Promise(function(resolve, reject) {
        print_info('check', 'commit_message');
        let { message } = getCommitMsg(); // commit message
        const messageMain = message.split('\n').shift();
        const result = COMMIT_PATTERN.test(messageMain);
        if (result) {
            resolve();
        } else {
            if (MERGE_COMMIT_PATTERN.test(messageMain)) {
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

