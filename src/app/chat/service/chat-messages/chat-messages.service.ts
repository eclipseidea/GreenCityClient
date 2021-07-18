import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { UserMessagesMock } from '../../userMessagesMock';
import { delay, map, take } from 'rxjs/operators';
import { ChatMessageModel } from '../../models/ChatMessage.model';
import { UserService } from '@global-service/user/user.service';
import { ChatRoomModel } from '../../models/ChatRoom.model';
import { CommonChatService } from '../common-chat/common-chat.service';

@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService implements OnDestroy {
  public currentMessagesStream$: BehaviorSubject<ChatMessageModel[]> = new BehaviorSubject<ChatMessageModel[]>([]);
  public messagesOnLoad = false;

  constructor(private userService: UserService, private commonChatService: CommonChatService) {}

  getAllMessageFromChat(chat: ChatRoomModel) {
    this.messagesOnLoad = true;
    of(UserMessagesMock)
      .pipe(
        take(1),
        delay(1000),
        map((messages) => messages.filter((msg) => msg.chatId === chat.id))
      )
      .subscribe((messages) => {
        this.currentMessagesStream$.next(messages);
        this.messagesOnLoad = false;
      });
  }

  addMessage(message: ChatMessageModel) {
    const messages = this.currentMessagesStream$.value;
    messages.push(message);
    this.currentMessagesStream$.next(messages);
  }

  isOwnMessage(id: number) {
    return id === this.userService.userId;
  }

  ngOnDestroy(): void {
    this.currentMessagesStream$.complete();
  }
}
