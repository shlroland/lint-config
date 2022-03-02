declare const config: {
    env: {
        es6: boolean;
        browser: boolean;
        node: boolean;
    };
    extends: string[];
    plugins: string[];
    settings: {
        'import/resolver': {
            node: {
                extensions: string[];
            };
        };
    };
    overrides: ({
        files: string[];
        parser: string;
        rules: {
            quotes: string[];
            'quote-props': string[];
            'comma-dangle': string[];
            'jsonc/sort-keys'?: undefined;
            'import/no-duplicates'?: undefined;
            '@typescript-eslint/no-var-requires'?: undefined;
            'no-console'?: undefined;
            'no-unused-expressions'?: undefined;
        };
    } | {
        files: string[];
        parser: string;
        rules?: undefined;
    } | {
        files: string[];
        parser: string;
        rules: {
            'jsonc/sort-keys': (string | {
                pathPattern: string;
                order: string[];
            } | {
                pathPattern: string;
                order: {
                    type: string;
                };
            })[];
            quotes?: undefined;
            'quote-props'?: undefined;
            'comma-dangle'?: undefined;
            'import/no-duplicates'?: undefined;
            '@typescript-eslint/no-var-requires'?: undefined;
            'no-console'?: undefined;
            'no-unused-expressions'?: undefined;
        };
    } | {
        files: string[];
        rules: {
            'import/no-duplicates': string;
            quotes?: undefined;
            'quote-props'?: undefined;
            'comma-dangle'?: undefined;
            'jsonc/sort-keys'?: undefined;
            '@typescript-eslint/no-var-requires'?: undefined;
            'no-console'?: undefined;
            'no-unused-expressions'?: undefined;
        };
        parser?: undefined;
    } | {
        files: string[];
        rules: {
            '@typescript-eslint/no-var-requires': string;
            quotes?: undefined;
            'quote-props'?: undefined;
            'comma-dangle'?: undefined;
            'jsonc/sort-keys'?: undefined;
            'import/no-duplicates'?: undefined;
            'no-console'?: undefined;
            'no-unused-expressions'?: undefined;
        };
        parser?: undefined;
    } | {
        files: string[];
        rules: {
            'no-console': string;
            quotes?: undefined;
            'quote-props'?: undefined;
            'comma-dangle'?: undefined;
            'jsonc/sort-keys'?: undefined;
            'import/no-duplicates'?: undefined;
            '@typescript-eslint/no-var-requires'?: undefined;
            'no-unused-expressions'?: undefined;
        };
        parser?: undefined;
    } | {
        files: string[];
        rules: {
            'no-unused-expressions': string;
            quotes?: undefined;
            'quote-props'?: undefined;
            'comma-dangle'?: undefined;
            'jsonc/sort-keys'?: undefined;
            'import/no-duplicates'?: undefined;
            '@typescript-eslint/no-var-requires'?: undefined;
            'no-console'?: undefined;
        };
        parser?: undefined;
    })[];
    rules: {
        'import/order': string;
        'import/first': string;
        'import/no-mutable-exports': string;
        'import/no-unresolved': string;
        'import/no-absolute-path': string;
        'import/no-extraneous-dependencies': (string | {
            devDependencies: string[];
        })[];
        'import/no-default-export': string;
        semi: string[];
        curly: string[];
        quotes: string[];
        'quote-props': string[];
        'no-unused-vars': string;
        'no-param-reassign': string;
        'array-bracket-spacing': string[];
        'brace-style': (string | {
            allowSingleLine: boolean;
        })[];
        'block-spacing': string[];
        camelcase: string;
        'comma-spacing': (string | {
            before: boolean;
            after: boolean;
        })[];
        'comma-style': string[];
        'comma-dangle': string[];
        'no-constant-condition': string;
        'no-debugger': string;
        'no-console': (string | {
            allow: string[];
        })[];
        'no-cond-assign': string[];
        'func-call-spacing': string[];
        'key-spacing': (string | {
            beforeColon: boolean;
            afterColon: boolean;
        })[];
        indent: (string | number | {
            SwitchCase: number;
            VariableDeclarator: number;
            outerIIFEBody: number;
        })[];
        'no-restricted-syntax': string[];
        'object-curly-spacing': string[];
        'no-return-await': string;
        'space-before-function-paren': string[];
        'no-var': string;
        'prefer-const': (string | {
            destructuring: string;
            ignoreReadBeforeAssign: boolean;
        })[];
        'prefer-arrow-callback': (string | {
            allowNamedFunctions: boolean;
            allowUnboundThis: boolean;
        })[];
        'object-shorthand': (string | {
            ignoreConstructors: boolean;
            avoidQuotes: boolean;
        })[];
        'prefer-rest-params': string;
        'prefer-spread': string;
        'prefer-template': string;
        'template-curly-spacing': string;
        'arrow-parens': (string | {
            requireForBlockBody: boolean;
        })[];
        'generator-star-spacing': string;
        'spaced-comment': (string | {
            line: {
                markers: string[];
                exceptions: string[];
            };
            block: {
                markers: string[];
                exceptions: string[];
                balanced: boolean;
            };
        })[];
        'array-callback-return': string;
        'block-scoped-var': string;
        'consistent-return': string;
        complexity: (string | number)[];
        eqeqeq: string[];
        'no-alert': string;
        'no-case-declarations': string;
        'no-multi-spaces': string;
        'no-multi-str': string;
        'no-with': string;
        'no-void': string;
        'no-useless-escape': string;
        'vars-on-top': string;
        'require-await': string;
        'no-return-assign': string;
        'operator-linebreak': string[];
        'unicorn/error-message': string;
        'unicorn/escape-case': string;
        'unicorn/no-array-instanceof': string;
        'unicorn/no-new-buffer': string;
        'unicorn/no-unsafe-regex': string;
        'unicorn/number-literal-case': string;
        'unicorn/prefer-exponentiation-operator': string;
        'unicorn/prefer-includes': string;
        'unicorn/prefer-starts-ends-with': string;
        'unicorn/prefer-text-content': string;
        'unicorn/prefer-type-error': string;
        'unicorn/throw-new-error': string;
        'no-use-before-define': (string | {
            functions: boolean;
            classes: boolean;
            variables: boolean;
        })[];
        'eslint-comments/disable-enable-pair': string;
        'import/no-named-as-default-member': string;
        'sort-imports': (string | {
            ignoreCase: boolean;
            ignoreDeclarationSort: boolean;
            ignoreMemberSort: boolean;
            memberSyntaxSortOrder: string[];
            allowSeparatedGroups: boolean;
        })[];
    };
};
export default config;
