import { createAnthropic } from '@ai-sdk/anthropic';
import type { StreamRequestType } from '@onlook/models/chat';
import { BASE_PROXY_ROUTE, FUNCTIONS_ROUTE, ProxyRoutes } from '@onlook/models/constants';
import { CLAUDE_MODELS, LLMProvider } from '@onlook/models/llm';
import { type LanguageModelV1 } from 'ai';
import { getRefreshedAuthTokens } from '../auth';
export interface OnlookPayload {
    requestType: StreamRequestType;
}

export async function initModel(
    provider: LLMProvider,
    model: CLAUDE_MODELS,
    payload: OnlookPayload,
): Promise<LanguageModelV1> {
    switch (provider) {
        case LLMProvider.ANTHROPIC:
            return await getAnthropicProvider(model, payload);
        default:
            throw new Error(`Unsupported provider: ${provider}`);
    }
}

async function getAnthropicProvider(
    model: CLAUDE_MODELS,
    payload: OnlookPayload,
): Promise<LanguageModelV1> {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

    if (!apiKey) {
        throw new Error('No Anthropic API key found in environment variables');
    }

    const config = {
        apiKey: apiKey,
        headers: {
            'anthropic-beta': 'output-128k-2025-02-19',
        },
    };

    const anthropic = createAnthropic(config);
    return anthropic(model, {
        cacheControl: true,
    });
}
