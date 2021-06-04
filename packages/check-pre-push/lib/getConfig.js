'use strict';
const { cosmiconfigSync } = require('cosmiconfig');
const defaultConfig = require('../config/config');
module.exports = {
    getConf(key= '', startDir = '', endDir = '', clearCaches = false) {
        if (!key) {
            return {};
        }
        const explorerSync = cosmiconfigSync(key, {
            endDir
        });
        const {
            config = {}
        } = explorerSync.search(startDir) || {};
        if (clearCaches) explorerSync.clearCaches();
        return Object.assign({}, defaultConfig, config);
    }
};
