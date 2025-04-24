import { app } from 'electron';
import path from 'path';
import { __dirname } from '../index';
import { getBunExecutablePath } from './index';

export const getBunPath = (): string => {
    // Use the system-installed Bun
    return 'bun';
};

// ... existing code ...
