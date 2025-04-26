import { IdeType } from '../ide';
import { type Project } from '../projects';

export interface UserSettings {
    id?: string;
    enableAnalytics?: boolean;
    signInMethod?: string;
    editor?: EditorSettings;
    chat?: ChatSettings;
    apiKeys?: ApiKeySettings;
}

export interface EditorSettings {
    shouldWarnDelete?: boolean;
    ideType?: IdeType;
    enableBunReplace?: boolean;
    buildFlags?: string;
    newProjectPath?: string;
}

export interface ChatSettings {
    showSuggestions: boolean;
    autoApplyCode: boolean;
    expandCodeBlocks: boolean;
    showMiniChat: boolean;
}

export interface ProjectsCache {
    projects: Project[];
}

export interface UserMetadata {
    id: string;
    name?: string;
    email?: string;
    avatarUrl?: string;
    plan?: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
    expiresIn: string;
    providerToken: string;
    tokenType: string;
}

export interface AppState {
    activeProjectId: string | null;
}

export interface ApiKeySettings {
    anthropic?: string;
    azureOpenAI?: {
        apiKey: string;
        targetUri: string;
    };
    openAI?: {
        apiKey: string;
        organization: string;
    };
}
