declare const config: {
    extends: string[];
    plugins: string[];
    rules: {
        'prettier/prettier': (string | {
            singleQuote: boolean;
            trailingComma: string;
            semi: boolean;
        })[];
    };
};
export default config;
