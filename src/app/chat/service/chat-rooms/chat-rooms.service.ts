import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { ChatRoomModel } from '../../models/ChatRoom.model';
import { UserChatsMock } from '../../userChatsMock';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomsService implements OnDestroy {
  public userChatsStream$: BehaviorSubject<ChatRoomModel[]> = new BehaviorSubject<ChatRoomModel[]>([]);
  public userChats: ChatRoomModel[];

  constructor() {}

  getAllUsersChat(): void {
    of(UserChatsMock)
      .pipe(take(1))
      .subscribe((chats) => {
        this.userChats = chats;
        this.userChatsStream$.next(this.userChats);
      });
  }

  findChatById(id: number): ChatRoomModel {
    return this.userChats.find((chat) => chat.id === id);
  }

  ngOnDestroy(): void {
    this.userChatsStream$.complete();
  }
}
