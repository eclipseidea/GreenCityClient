import { ChatMessageModel } from './ChatMessage.model';

export interface MessagesSortByDayModel {
  date: string;
  messages: ChatMessageModel[];
}
