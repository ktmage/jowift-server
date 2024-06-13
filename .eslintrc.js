module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        '@typescript-eslint/naming-convention': [
            'warn',
             // 型エイリアス
            {
              selector: 'typeAlias',
              format: ['PascalCase'],
              suffix: ['Type'],
            },
            // booleanを返す関数、変数、引数は特定のprefixを持たせる
            {
              selector: ['variable', 'function', 'parameter'],
              types: ['boolean'],
              format: ['PascalCase'],
              prefix: ['is', 'should', 'has', 'need'],
              //disabledとrequiredは例外的にprefixを必要としない
              filter: {
                regex: 'disabled|required',
                match: false,
              },
            },
            // 変数、関数、引数、メソッド、引数
            {
              selector: ['variable', 'function', 'parameter', 'method'],
              format: ['camelCase'],
            },
            // プロパティ
            {
              selector: ['property'],
              format: ['camelCase', 'snake_case'],
            },
            // 定数
            {
              selector: 'variable',
              format: ['camelCase', 'UPPER_CASE'],
              modifiers: ['const'],
            },
            // クラス
            {
              selector: 'class',
              format: ['PascalCase'],
            },
        ]
    }
}
