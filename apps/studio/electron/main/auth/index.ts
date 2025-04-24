import { MainChannels } from '@onlook/models/constants';
import type { AuthTokens } from '@onlook/models/settings';
import { mainWindow } from '..';
import { getMockAuthTokens } from './mock';

// Disable real auth and use mock implementation
export async function getRefreshedAuthTokens(): Promise<AuthTokens> {
    return getMockAuthTokens();
}

// Disable real auth and use mock implementation
export async function signIn(provider: 'github' | 'google') {
    console.log('Mock sign in with provider:', provider);
    return;
}

// Disable real auth and use mock implementation
export async function signOut() {
    console.log('Mock sign out');
    mainWindow?.webContents.send(MainChannels.USER_SIGNED_OUT);
    return;
}

// Disable real auth and use mock implementation
export async function handleAuthCallback(url: string) {
    console.log('Mock auth callback:', url);
    return;
}

// Disable real auth and use mock implementation
export function setupAuthAutoRefresh() {
    console.log('Mock auth auto refresh setup');
    return;
}

// Disable real auth and use mock implementation
export function cleanupAuthAutoRefresh() {
    console.log('Mock auth auto refresh cleanup');
    return;
}
