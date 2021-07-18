import { ChatRoomModel } from './models/ChatRoom.model';
import { UsersMock } from './usersMock';

export const UserChatsMock: ChatRoomModel[] = [
  {
    id: 1,
    name: UsersMock.user1.firstName + ' ' + UsersMock.user1.lastName,
    lastMessage: {
      id: 4,
      chatId: 1,
      date: new Date('March 18, 2021 12:17:00'),
      content: 'Bye',
      sender: UsersMock.user1
    },
    participants: [UsersMock.self, UsersMock.user1],
    logo: 'assets/img/chat/avatar-mock.png',
    chatType: 'PRIVATE'
  } as ChatRoomModel,
  {
    id: 2,
    name: UsersMock.user2.firstName + ' ' + UsersMock.user2.lastName,
    lastMessage: {
      id: 4,
      chatId: 2,
      date: new Date('March 21, 2021 14:14:00'),
      content: 'Будешь хоть команды знаьь',
      sender: UsersMock.self
    },
    participants: [UsersMock.self, UsersMock.user2],
    chatType: 'PRIVATE'
  } as ChatRoomModel
];
