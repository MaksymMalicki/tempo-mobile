import { Injectable } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(
        private keycloakService: KeycloakService,
    ) { }

    public get isLoggedIn(): Promise<boolean> {
        return this.keycloakService.isLoggedIn();
    }

    public logout(): void {
        this.keycloakService.logout(window.location.origin).then();
    }

    public register(): void {
        this.keycloakService.register().then();
    }
}
