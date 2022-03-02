declare const config: {
    extends: string[];
    plugins: string[];
    settings: {
        react: {
            version: string;
        };
    };
    rules: {
        'jsx-quotes': string[];
        'react/prop-types': string;
        'react/react-in-jsx-scope': string;
        'react/display-name': string;
        'react-hooks/rules-of-hooks': string;
        'react-hooks/exhaustive-deps': string;
    };
};
export default config;
