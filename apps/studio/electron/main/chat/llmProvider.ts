import { createAnthropic } from '@ai-sdk/anthropic';
import { createAzure } from '@ai-sdk/azure';
import type { StreamRequestType } from '@onlook/models/chat';
import { BASE_PROXY_ROUTE, FUNCTIONS_ROUTE, ProxyRoutes } from '@onlook/models/constants';
import { AZURE_OPENAI_MODELS, CLAUDE_MODELS, LLMProvider } from '@onlook/models/llm';
import { type LanguageModelV1 } from 'ai';
import { getRefreshedAuthTokens } from '../auth';
import { PersistentStorage } from '../storage';

export interface OnlookPayload {
    requestType: StreamRequestType;
}

export async function initModel(
    provider: LLMProvider,
    model: CLAUDE_MODELS | AZURE_OPENAI_MODELS,
    payload: OnlookPayload,
): Promise<LanguageModelV1> {
    switch (provider) {
        case LLMProvider.AZURE_OPENAI:
            return await getAzureOpenAIProvider(model as AZURE_OPENAI_MODELS);
        case LLMProvider.ANTHROPIC:
            return await getAnthropicProvider(model as CLAUDE_MODELS, payload);
        default:
            throw new Error(`Unsupported provider: ${provider}`);
    }
}

async function getAzureOpenAIProvider(model: AZURE_OPENAI_MODELS): Promise<LanguageModelV1> {
    const userSettings = PersistentStorage.USER_SETTINGS.read() || {};
    const apiKey = userSettings.apiKeys?.azureOpenAI?.apiKey;
    const targetUri = userSettings.apiKeys?.azureOpenAI?.targetUri;

    if (!apiKey || !targetUri) {
        throw new Error('Azure OpenAI configuration missing from user settings');
    }

    const config = {
        apiKey,
        baseURL: targetUri,
        headers: {
            'api-key': apiKey,
        },
    };

    return createAzure(config)(model, {});
}

async function getAnthropicProvider(
    model: CLAUDE_MODELS,
    payload: OnlookPayload,
): Promise<LanguageModelV1> {
    const userSettings = PersistentStorage.USER_SETTINGS.read() || {};
    const apiKey = userSettings.apiKeys?.anthropic;

    if (!apiKey) {
        throw new Error('No Anthropic API key found in user settings');
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
