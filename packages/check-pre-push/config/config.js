'use strict';

module.exports = {
    pattern: '^(master|develop){1}$|^(feature|fix|hotfix|release)/.+$',
    errorMsg: '分支名不符合规范，请重新命名',
    commitTag: ['feat', 'fix', 'docs', 'style', 'ref', 'test', 'chore']
};
