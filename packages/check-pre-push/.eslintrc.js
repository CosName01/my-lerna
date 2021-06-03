module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12
    },
    "globals": {
        "process": true
    },
    "rules": {
        semi: ['warn', 'always'],
        // 函数名后的空格（禁用）
        'space-before-function-paren': ['error', 'never'],
        // 尾随逗号，兼容低版本IE
        'comma-dangle': ['error', {
            arrays: 'never',
            objects: 'never',
            imports: 'never',
            exports: 'never',
            functions: 'never'
        }]
    }
};
