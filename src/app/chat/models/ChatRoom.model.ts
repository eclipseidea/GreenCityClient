import { ChatMessageModel } from './ChatMessage.model';
import { User } from '@global-models/user/user.model';

export interface ChatRoomModel {
  id: number;
  name: string;
  logo: string;
  lastMessage: ChatMessageModel;
  chatType: string;
  messages: ChatMessageModel[];
  participants: User[];
  ownerId: number;
  amountUnreadMessages: number;
}
