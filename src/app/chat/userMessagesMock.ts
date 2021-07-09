import { ChatMessageModel } from './models/ChatMessage.model';

export const UserMessagesMock: ChatMessageModel[] = [
  {
    id: 1,
    chatId: 1,
    date: new Date('December 17, 2021 03:24:00'),
    content: 'Hello, vitaliy',
    senderId: 9251
  },
  {
    id: 2,
    chatId: 1,
    date: new Date('December 18, 2021 12:15:00'),
    content: 'Hello, what do you need?',
    senderId: 9252
  },
  {
    id: 3,
    chatId: 1,
    date: new Date('December 18, 2021 12:16:00'),
    content: 'Could you get me some money',
    senderId: 9251
  },
  {
    id: 4,
    chatId: 1,
    date: new Date('December 18, 2021 12:17:00'),
    content: 'Bye',
    senderId: 9252
  },
  {
    id: 1,
    chatId: 2,
    date: new Date('December 21, 2021 14:11:00'),
    content: "What's up bb?",
    senderId: 9255
  },
  {
    id: 2,
    chatId: 2,
    date: new Date('December 21, 2021 14:12:00'),
    content: 'push off',
    senderId: 9251
  },
  {
    id: 3,
    chatId: 2,
    date: new Date('December 21, 2021 14:13:00'),
    content: 'hmm, wait',
    senderId: 9251
  },
  {
    id: 4,
    chatId: 2,
    date: new Date('December 21, 2021 14:14:00'),
    content: 'I knew:)',
    senderId: 9255
  }
];
