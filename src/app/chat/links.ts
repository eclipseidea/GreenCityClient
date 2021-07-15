import { environment } from '@environment/environment.prod';

export const mainLink = environment.backendLink;
export const mainUserLink = environment.backendUserLink;

export const webSocketLink = environment.socket;
export const webSocketEndPointLink = '/ws';

export const backendChatLink = `${mainUserLink}/chat`;
