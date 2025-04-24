import { MainChannels } from '@onlook/models/constants';
import type { UserMetadata } from '@onlook/models/settings';
import supabase from '@onlook/supabase/clients';
import { makeAutoObservable } from 'mobx';
import { invokeMainChannel } from '../utils';

export class AuthManager {
    authenticated = true;
    userMetadata: UserMetadata | null = null;
    isAuthEnabled = false;

    constructor() {
        makeAutoObservable(this);
        this.fetchUserMetadata();
    }

    async fetchUserMetadata() {
        this.userMetadata = {
            id: 'local-user',
            email: 'local@example.com',
            name: 'Local User',
        };
        this.authenticated = true;
    }

    async signIn(provider: 'github' | 'google') {
        console.log('Auth is disabled');
    }

    async signOut() {
        console.log('Auth is disabled');
    }
}
