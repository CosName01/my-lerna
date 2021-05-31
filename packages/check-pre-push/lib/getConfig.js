'use strict';
const { cosmiconfigSync } = require('cosmiconfig');
const defaultConfig = require('../config/config');

module.exports = {
    getConf(startDir = '', endDir = '', clearCaches = false) {
        const explorerSync = cosmiconfigSync('validate-branch-name', {
            endDir,
        });
        const {
            config = {},
        } = explorerSync.search(startDir) || {};
        if (clearCaches) explorerSync.clearCaches();
        return Object.assign({}, defaultConfig, config);
    },
};
