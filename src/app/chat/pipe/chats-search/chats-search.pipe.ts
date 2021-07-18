import { Pipe, PipeTransform } from '@angular/core';
import { ChatRoomModel } from '../../models/ChatRoom.model';

@Pipe({
  name: 'chatsSearch',
  pure: false
})
export class ChatsSearchPipe implements PipeTransform {
  transform(chats: ChatRoomModel[], searchInput: string): ChatRoomModel[] {
    return [...chats]
      .filter((chat) => {
        const formatedChat = chat.name.toLowerCase();
        const formatedInput = searchInput.toLowerCase();
        return formatedChat.includes(formatedInput);
      })
      .sort((firstChat, secondChat) => {
        const firstDate = new Date(firstChat.lastMessage.date);
        const secondDate = new Date(secondChat.lastMessage.date);
        if (firstDate > secondDate) {
          return -1;
        }
        if (firstDate < secondDate) {
          return 1;
        }

        return 0;
      });
  }
}
