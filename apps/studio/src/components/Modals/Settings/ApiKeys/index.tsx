import { useUserManager } from '@/components/Context';
import { Button } from '@onlook/ui/button';
import { Input } from '@onlook/ui/input';
import { Label } from '@onlook/ui/label';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

const ApiKeysTab = observer(() => {
    const userManager = useUserManager();
    const apiKeys = userManager.settings.settings?.apiKeys || {};

    const [anthropicKey, setAnthropicKey] = useState(apiKeys.anthropic || '');
    const [azureKey, setAzureKey] = useState(apiKeys.azureOpenAI?.apiKey || '');
    const [azureEndpoint, setAzureEndpoint] = useState(apiKeys.azureOpenAI?.endpoint || '');
    const [azureDeployment, setAzureDeployment] = useState(apiKeys.azureOpenAI?.deployment || '');
    const [openAIKey, setOpenAIKey] = useState(apiKeys.openAI?.apiKey || '');
    const [openAIOrg, setOpenAIOrg] = useState(apiKeys.openAI?.organization || '');

    const handleSave = () => {
        userManager.settings.update({
            apiKeys: {
                anthropic: anthropicKey,
                azureOpenAI: {
                    apiKey: azureKey,
                    endpoint: azureEndpoint,
                    deployment: azureDeployment,
                },
                openAI: {
                    apiKey: openAIKey,
                    organization: openAIOrg,
                },
            },
        });
    };

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">API Keys</h2>
                <p className="text-sm text-muted-foreground">
                    Configure your API keys for various AI services. These keys will be used for
                    AI-powered features.
                </p>
            </div>

            <div className="space-y-6">
                {/* Anthropic */}
                <div className="space-y-2">
                    <Label>Anthropic API Key</Label>
                    <Input
                        type="password"
                        value={anthropicKey}
                        onChange={(e) => setAnthropicKey(e.target.value)}
                        placeholder="sk-ant-..."
                    />
                </div>

                {/* Azure OpenAI */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium">Azure OpenAI</h3>
                    <div className="space-y-2">
                        <Label>API Key</Label>
                        <Input
                            type="password"
                            value={azureKey}
                            onChange={(e) => setAzureKey(e.target.value)}
                            placeholder="Your Azure OpenAI API key"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Endpoint</Label>
                        <Input
                            value={azureEndpoint}
                            onChange={(e) => setAzureEndpoint(e.target.value)}
                            placeholder="https://your-resource-name.openai.azure.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Deployment Name</Label>
                        <Input
                            value={azureDeployment}
                            onChange={(e) => setAzureDeployment(e.target.value)}
                            placeholder="Your deployment name"
                        />
                    </div>
                </div>

                {/* OpenAI */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium">OpenAI</h3>
                    <div className="space-y-2">
                        <Label>API Key</Label>
                        <Input
                            type="password"
                            value={openAIKey}
                            onChange={(e) => setOpenAIKey(e.target.value)}
                            placeholder="sk-..."
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Organization ID</Label>
                        <Input
                            value={openAIOrg}
                            onChange={(e) => setOpenAIOrg(e.target.value)}
                            placeholder="Your organization ID"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
            </div>
        </div>
    );
});

export default ApiKeysTab;
