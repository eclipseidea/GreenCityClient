import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { UserMessagesMock } from '../../userMessagesMock';
import { map, take } from 'rxjs/operators';
import { ChatMessageModel } from '../../models/ChatMessage.model';
import { UserService } from '@global-service/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService {
  public currentMessagesStream$: BehaviorSubject<ChatMessageModel[]> = new BehaviorSubject<ChatMessageModel[]>([]);

  constructor(private userService: UserService) {}

  getAllMessageFromChat(chatId: number) {
    of(UserMessagesMock)
      .pipe(
        take(1),
        map((messages) => messages.filter((msg) => msg.chatId === chatId))
      )
      .subscribe((messages) => {
        this.currentMessagesStream$.next(messages);
      });
  }

  isOwnMessage(id: number) {
    return id === this.userService.userId;
  }
}
