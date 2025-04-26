import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Key } from 'lucide-react';
import { Input } from '@onlook/ui/input';
import { useUserManager } from '@/components/Context';

const ApiKeysTab = observer(() => {
    const userManager = useUserManager();
    const [apiKeys, setApiKeys] = useState({
        anthropic: userManager.settings.settings?.apiKeys?.anthropic || '',
        azureOpenAI: {
            apiKey: userManager.settings.settings?.apiKeys?.azureOpenAI?.apiKey || '',
            targetUri: userManager.settings.settings?.apiKeys?.azureOpenAI?.targetUri || '',
        },
        openAI: {
            apiKey: userManager.settings.settings?.apiKeys?.openAI?.apiKey || '',
            organization: userManager.settings.settings?.apiKeys?.openAI?.organization || '',
        },
    });

    const handleSave = () => {
        userManager.settings.update({
            apiKeys: {
                anthropic: apiKeys.anthropic,
                azureOpenAI: apiKeys.azureOpenAI,
                openAI: apiKeys.openAI,
            },
        });
    };

    const handleAnthropicChange = (e: ChangeEvent<HTMLInputElement>) => {
        setApiKeys({
            ...apiKeys,
            anthropic: e.target.value,
        });
    };

    const handleAzureApiKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
        setApiKeys({
            ...apiKeys,
            azureOpenAI: {
                ...apiKeys.azureOpenAI,
                apiKey: e.target.value,
            },
        });
    };

    const handleAzureTargetUriChange = (e: ChangeEvent<HTMLInputElement>) => {
        setApiKeys({
            ...apiKeys,
            azureOpenAI: {
                ...apiKeys.azureOpenAI,
                targetUri: e.target.value,
            },
        });
    };

    const handleOpenAIApiKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
        setApiKeys({
            ...apiKeys,
            openAI: {
                ...apiKeys.openAI,
                apiKey: e.target.value,
            },
        });
    };

    const handleOpenAIOrgChange = (e: ChangeEvent<HTMLInputElement>) => {
        setApiKeys({
            ...apiKeys,
            openAI: {
                ...apiKeys.openAI,
                organization: e.target.value,
            },
        });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                {/* Anthropic */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Key className="h-4 w-4" />
                        <h3 className="text-sm font-medium">Anthropic</h3>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Input
                            type="password"
                            placeholder="API Key"
                            value={apiKeys.anthropic}
                            onChange={handleAnthropicChange}
                        />
                    </div>
                </div>

                {/* Azure OpenAI */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Key className="h-4 w-4" />
                        <h3 className="text-sm font-medium">Azure OpenAI</h3>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Input
                            type="password"
                            placeholder="API Key"
                            value={apiKeys.azureOpenAI.apiKey}
                            onChange={handleAzureApiKeyChange}
                        />
                        <Input
                            type="text"
                            placeholder="Target URI (e.g. azi-ai.gpt.azure.com/openai/deployments/gpt-40/chat/completions?api-version=version)"
                            value={apiKeys.azureOpenAI.targetUri}
                            onChange={handleAzureTargetUriChange}
                        />
                    </div>
                </div>

                {/* OpenAI */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Key className="h-4 w-4" />
                        <h3 className="text-sm font-medium">OpenAI</h3>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Input
                            type="password"
                            placeholder="API Key"
                            value={apiKeys.openAI.apiKey}
                            onChange={handleOpenAIApiKeyChange}
                        />
                        <Input
                            type="text"
                            placeholder="Organization ID"
                            value={apiKeys.openAI.organization}
                            onChange={handleOpenAIOrgChange}
                        />
                    </div>
                </div>
            </div>

            <button
                className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                onClick={handleSave}
            >
                Save API Keys
            </button>
        </div>
    );
});

export default ApiKeysTab;
