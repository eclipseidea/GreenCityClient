import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatRoomModel } from '../../models/ChatRoom.model';
import { ChatMessagesService } from '../chat-messages/chat-messages.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentChatService implements OnDestroy {
  public currentChatStream$: BehaviorSubject<ChatRoomModel> = new BehaviorSubject<ChatRoomModel>(null);

  constructor(private chatMessagesService: ChatMessagesService) {}

  setCurrentChat(chat: ChatRoomModel) {
    if (chat === this.currentChatStream$.value) {
      return;
    }
    this.currentChatStream$.next(chat);
    if (chat && !chat.messages) {
      this.chatMessagesService.getAllMessageFromChat(chat);
    }
  }

  ngOnDestroy(): void {
    this.currentChatStream$.complete();
  }
}
