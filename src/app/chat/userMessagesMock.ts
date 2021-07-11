import { ChatMessageModel } from './models/ChatMessage.model';
import { User } from '@global-models/user/user.model';
import { UsersMock } from './usersMock';

export const UserMessagesMock: ChatMessageModel[] = [
  {
    id: 1,
    chatId: 1,
    date: new Date('December 17, 2021 03:24:00'),
    content: 'Hello, vitaliy',
    sender: UsersMock.self
  },
  {
    id: 2,
    chatId: 1,
    date: new Date('December 18, 2021 12:15:00'),
    content: 'Hello, what do you need?',
    sender: UsersMock.user1
  },
  {
    id: 3,
    chatId: 1,
    date: new Date('December 18, 2021 12:16:00'),
    content: 'Could you get me some money',
    sender: UsersMock.self
  },
  {
    id: 4,
    chatId: 1,
    date: new Date('December 18, 2021 12:17:00'),
    content: 'Bye',
    sender: UsersMock.user1
  },
  {
    id: 1,
    chatId: 2,
    date: new Date('December 21, 2021 14:11:00'),
    content: 'Идём на чёрную вдову?',
    sender: UsersMock.user2
  },
  {
    id: 2,
    chatId: 2,
    date: new Date('December 21, 2021 14:12:00'),
    content: 'И потом к малому на каль?',
    sender: UsersMock.user2
  },
  {
    id: 3,
    chatId: 2,
    date: new Date('December 21, 2021 14:13:00'),
    content: 'У меня сегодня дела',
    sender: UsersMock.self
  },
  {
    id: 4,
    chatId: 2,
    date: new Date('December 21, 2021 14:14:00'),
    content: 'Так я не на сейчас',
    sender: UsersMock.user2
  },
  {
    id: 4,
    chatId: 2,
    date: new Date('December 21, 2021 14:14:00'),
    content: 'А где-то к 6 стрелканутся',
    sender: UsersMock.user2
  },
  {
    id: 4,
    chatId: 2,
    date: new Date('December 21, 2021 14:14:00'),
    content: 'Ну впринципе хорошо что тренер прийдет',
    sender: UsersMock.user2
  },
  {
    id: 4,
    chatId: 2,
    date: new Date('December 21, 2021 14:14:00'),
    content: 'Будешь хоть команды знаьь',
    sender: UsersMock.user2
  }
];
