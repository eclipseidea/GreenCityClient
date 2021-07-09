export interface ChatMessageModel {
  id: number;
  chatId: number;
  content: string;
  date: Date;
  senderId: number;
  // status: string;
  // fileName: string;
  // fileType: string;
  // fileUrl: string;
  // likedUserId: number[];
}
