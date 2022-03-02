declare const config: {
    '*.{ts,tsx}': import("./operators").ContextualLinterFn;
    '*.{js,jsx}': import("./operators").ContextualLinterFn;
    '*.{css,scss,sass,less}': import("./operators").ContextualLinterFn;
    '*.{md,mdx}': import("./operators").ContextualLinterFn;
};
export default config;
