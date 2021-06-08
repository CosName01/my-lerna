'use strict';

const fs = require('fs');
const path = require('path');
const findParentDir = require('find-parent-dir');

function getGitFolder() {
    const dir = findParentDir.sync(process.cwd(), '.git');
    if (!dir) throw new Error('Cannot find .git folder');
    let gitDir = path.join(dir, '.git');
    const stats = fs.lstatSync(gitDir);
    if (!stats.isDirectory()) {
        throw new Error('.git is not a directory');
    }
    return gitDir;
}

module.exports = getGitFolder;
