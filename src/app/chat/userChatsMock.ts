import { ChatRoomModel } from './models/ChatRoom.model';
import { ChatMessageModel } from './models/ChatMessage.model';

export const UserChatsMock: ChatRoomModel[] = [
  {
    id: 1,
    name: 'Gena',
    lastMessage: {
      content: 'Hey buddy, how you doing?',
      date: new Date()
    } as ChatMessageModel
  } as ChatRoomModel,
  {
    id: 2,
    name: 'Serega',
    lastMessage: {
      content: 'Черный бумер, черные глаза, один я - нет.',
      date: new Date()
    } as ChatMessageModel
  } as ChatRoomModel,
  {
    id: 3,
    name: 'Evgen',
    lastMessage: {
      content: 'Го играть? Или ты как обычно',
      date: new Date()
    } as ChatMessageModel
  } as ChatRoomModel
];
