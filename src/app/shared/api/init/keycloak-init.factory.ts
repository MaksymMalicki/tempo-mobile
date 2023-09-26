import {KeycloakService} from 'keycloak-angular';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function initializeKeycloak(keycloak: KeycloakService) {
    return (): Promise<boolean> =>
        keycloak.init({
            config: {
                url: 'http://130.61.252.200:8180/',
                realm: 'staffect',
                clientId: 'frontend',
            },
            initOptions: {
                onLoad: 'check-sso',
                silentCheckSsoRedirectUri:
                    `${window.location.origin}`,
                checkLoginIframe: false,
                checkLoginIframeInterval: 120,
            },
        });
}
