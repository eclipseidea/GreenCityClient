import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '@global-service/user/user.service';
import { ChatRoomModel } from '../../models/ChatRoom.model';

@Pipe({
  name: 'chatLastSenderMessage'
})
export class ChatLastMessageSenderPipe implements PipeTransform {
  constructor(private userService: UserService) {}

  transform(chat: ChatRoomModel): string {
    const userId = this.userService.userId;
    if (chat.lastMessage.sender.id === userId) {
      return 'You: ';
    }
    if (chat.chatType === 'GROUP') {
      return `${chat.lastMessage.sender.firstName}: `;
    }
  }
}
