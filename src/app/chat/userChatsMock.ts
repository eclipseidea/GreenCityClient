import { ChatRoomModel } from './models/ChatRoom.model';
import { UsersMock } from './usersMock';

export const UserChatsMock: ChatRoomModel[] = [
  {
    id: 1,
    name: UsersMock.user1.firstName + ' ' + UsersMock.user1.lastName,
    lastMessage: {
      id: 4,
      chatId: 1,
      date: new Date('December 18, 2021 12:17:00'),
      content: 'Bye',
      sender: UsersMock.user1
    },
    participants: [UsersMock.self, UsersMock.user1]
  } as ChatRoomModel,
  {
    id: 2,
    name: UsersMock.user2.firstName + ' ' + UsersMock.user2.lastName,
    lastMessage: {
      id: 4,
      chatId: 2,
      date: new Date('December 21, 2021 14:14:00'),
      content: 'I knew:)',
      sender: UsersMock.user2
    },
    participants: [UsersMock.self, UsersMock.user2]
  } as ChatRoomModel
];
