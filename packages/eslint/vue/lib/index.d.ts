declare const config: {
    overrides: {
        files: string[];
        parser: string;
        parserOptions: {
            parser: string;
        };
        rules: {
            'no-unused-vars': string;
            'no-undef': string;
            '@typescript-eslint/no-unused-vars': string;
        };
    }[];
    extends: string[];
    rules: {
        'vue/max-attributes-per-line': string;
        'vue/no-v-html': string;
        'vue/require-prop-types': string;
        'vue/require-default-prop': string;
        'vue/multi-word-component-names': string;
    };
};
export default config;
