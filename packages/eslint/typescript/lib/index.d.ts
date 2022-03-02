declare const config: {
    extends: string[];
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
        'import/named': string;
        '@typescript-eslint/semi': string[];
        '@typescript-eslint/ban-ts-comment': (string | {
            'ts-ignore': string;
        })[];
        '@typescript-eslint/member-delimiter-style': (string | {
            multiline: {
                delimiter: string;
            };
        })[];
        '@typescript-eslint/type-annotation-spacing': {}[];
        '@typescript-eslint/consistent-type-imports': (string | {
            prefer: string;
            disallowTypeAnnotations: boolean;
        })[];
        '@typescript-eslint/consistent-type-definitions': string[];
        '@typescript-eslint/consistent-indexed-object-style': string[];
        '@typescript-eslint/prefer-ts-expect-error': string;
        'no-useless-constructor': string;
        indent: string;
        '@typescript-eslint/indent': (string | number)[];
        'no-unused-vars': string;
        '@typescript-eslint/no-unused-vars': string;
        'no-redeclare': string;
        '@typescript-eslint/no-redeclare': string;
        'no-use-before-define': string;
        '@typescript-eslint/no-use-before-define': (string | {
            functions: boolean;
            classes: boolean;
            variables: boolean;
        })[];
        'brace-style': string;
        '@typescript-eslint/brace-style': (string | {
            allowSingleLine: boolean;
        })[];
        'comma-dangle': string;
        '@typescript-eslint/comma-dangle': string[];
        'object-curly-spacing': string;
        '@typescript-eslint/object-curly-spacing': string[];
        '@typescript-eslint/camelcase': string;
        '@typescript-eslint/explicit-function-return-type': string;
        '@typescript-eslint/explicit-member-accessibility': string;
        '@typescript-eslint/no-explicit-any': string;
        '@typescript-eslint/no-parameter-properties': string;
        '@typescript-eslint/no-empty-interface': string;
        '@typescript-eslint/ban-ts-ignore': string;
        '@typescript-eslint/no-empty-function': string;
        '@typescript-eslint/no-non-null-assertion': string;
        '@typescript-eslint/explicit-module-boundary-types': string;
        '@typescript-eslint/ban-types': string;
        '@typescript-eslint/no-namespace': string;
    };
};
export default config;
