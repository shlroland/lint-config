export declare enum Client {
    pnpm = "pnpm",
    yarn = "yarn",
    npm = "npm"
}
export declare type ClientType = keyof typeof Client;
export interface ListerCtx {
    client: ClientType;
}
