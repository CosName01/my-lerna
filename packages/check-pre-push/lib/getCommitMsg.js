'use strict';

const fs = require('fs');
const path = require('path');
const getGitFolder = require('./getGitFolder');
const { print_error } = require("./print");

// 获取.git目录
let gitDirectory = '.git';
try {
    gitDirectory = getGitFolder();
} catch (err) {
    print_error(err);
}

const bufferToString = function(buffer) {
    const hasToString = buffer && typeof buffer.toString === 'function';
    return hasToString && buffer.toString();
};

// 获取file内容
const getFileContent = function(filePath) {
    try {
        const buffer = fs.readFileSync(filePath);
        return bufferToString(buffer);
    } catch (err) {
        // ENOENT: Error No Entry  ENAMETOOLONG: Error Name To Long
        if (err?.code !== 'ENOENT' && err.code !== 'ENAMETOOLONG') {
            throw err;
        }
    }
};

// 默认获取.git 下的COMMIT_EDITMSG文件
const getCommitMsg = function(file = 'COMMIT_EDITMSG') {
    if (!gitDirectory || !file) {
        return null;
    }
    file = path.resolve(gitDirectory, file);
    const message = getFileContent(file);

    return (!message) ? null : {
        message: message,
        sourceFile: file
    };
};

module.exports = getCommitMsg;

// var validate = function(msgFileOrText) {
//     var commit = getCommit(msgFileOrText);
//
//     if (!validateMessage(commit.message, commit.sourceFile) && commitErrorLogPath) {
//         fs.appendFileSync(commitErrorLogPath, commit.message + '\n');
//         process.exit(1);
//     }
//
//     process.exit(0);
// };
//
// validate(commitMsgFileOrText);
