const apiBaseUrl: string = 'localhost:8080';

export const requestsListUrl: string = `${apiBaseUrl}/requests`;
export const setRequestStateUrl = (requestId: string = ':id') => `${apiBaseUrl}/requests/${requestId}/set_state`;