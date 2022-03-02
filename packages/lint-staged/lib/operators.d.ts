export interface ContextualLinterFn {
    (filenames: string[], commands: string[]): string[];
}
export interface CombinableLinterFn {
    (next: ContextualLinterFn): ContextualLinterFn;
}
export interface LinterFn {
    (filenames: string[]): string | string[];
}
export interface WrapFn {
    (linterFn: LinterFn): CombinableLinterFn;
}
export declare const finish: ContextualLinterFn;
export declare const wrap: WrapFn;
