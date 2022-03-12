declare const config: {
    hooks: {
        'commit-msg': "commitlint -E HUSKY_GIT_PARAMS";
        'pre-commit': "lint-staged";
    };
};
export default config;
