import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatRoomModel } from '../../models/ChatRoom.model';
import { ChatMessagesService } from '../chat-messages/chat-messages.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentChatService {
  public currentChatStream$: BehaviorSubject<ChatRoomModel> = new BehaviorSubject<ChatRoomModel>(null);

  constructor(private chatMessagesService: ChatMessagesService) {}

  setCurrentChat(chat: ChatRoomModel) {
    this.currentChatStream$.next(chat);
    if (chat) {
      this.chatMessagesService.getAllMessageFromChat(chat.id);
    }
  }
}
