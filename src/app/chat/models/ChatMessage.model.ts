import { User } from '@global-models/user/user.model';

export interface ChatMessageModel {
  id: number;
  chatId: number;
  content: string;
  date: Date;
  sender: User;
  // status: string;
  // fileName: string;
  // fileType: string;
  // fileUrl: string;
  // likedUserId: number[];
}
