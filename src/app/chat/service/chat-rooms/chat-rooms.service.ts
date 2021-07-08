import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { ChatRoomModel } from '../../models/ChatRoom.model';
import { UserChatsMock } from '../../userChatsMock';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomsService {
  public userChatsStream$: BehaviorSubject<ChatRoomModel[]> = new BehaviorSubject<ChatRoomModel[]>([]);

  constructor() {}

  getAllUsersChat() {
    of(UserChatsMock)
      .pipe(take(1))
      .subscribe((chats) => {
        this.userChatsStream$.next(chats);
      });
  }
}
