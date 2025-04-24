import type { AuthTokens } from '@onlook/models/settings';

// Mock auth tokens that will be used instead of real authentication
export const MOCK_AUTH_TOKENS: AuthTokens = {
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
    expiresIn: '3600',
    expiresAt: (Date.now() + 3600 * 1000).toString(),
    tokenType: 'bearer',
    providerToken: 'mock-provider-token',
};

// Mock function to get auth tokens
export async function getMockAuthTokens(): Promise<AuthTokens> {
    return MOCK_AUTH_TOKENS;
}
