import Lister from 'listr';
import type { ListerCtx } from './types';
export declare const createTasks: (ctx: ListerCtx) => Promise<Lister<ListerCtx>>;
