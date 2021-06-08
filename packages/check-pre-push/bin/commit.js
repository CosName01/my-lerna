'use strict';

const { print_info } = require("../lib/print");
const { getConf } = require('../lib/getConfig');
const getCommitMsg = require("../lib/getCommitMsg");


async function checkCommitMsg() {
    return new Promise(function(resolve, reject) {
        print_info('check', 'commit_message');
        let { message, sourceFile } = getCommitMsg(); // commit message
        const { commitTag } = getConf('check-pre-push');
        const commit_tags_pattern = commitTag.join('|');
        const commit_pattern_str = `^(${commit_tags_pattern})(\\([^\\)]*\\))?:`;
        const commit_pattern = new RegExp(commit_pattern_str);
        const result = commit_pattern.test(message);
        if (result) {
            resolve();
        } else {
            const err = `commit message不符合规范  \n` +
                `commit message: "${message}" \n` +
                `Pattern: ${commit_pattern}`;
            reject(err);
        }
    });
}

module.exports = {
    checkCommitMsg
};

