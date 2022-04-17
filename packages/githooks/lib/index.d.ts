export interface HookItem {
    name: string;
    content: string;
}
export interface Config {
    hooks: Record<string, HookItem[]>;
}
declare const config: Config;
export default config;
