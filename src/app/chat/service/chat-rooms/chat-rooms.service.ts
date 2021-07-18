import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { ChatRoomModel } from '../../models/ChatRoom.model';
import { UserChatsMock } from '../../userChatsMock';
import { delay, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomsService implements OnDestroy {
  public userChatsStream$: BehaviorSubject<ChatRoomModel[]> = new BehaviorSubject<ChatRoomModel[]>([]);
  public userChatsIsLoading = false;

  constructor() {}

  getAllUserChats(): void {
    this.userChatsIsLoading = true;
    of(UserChatsMock)
      .pipe(take(1), delay(1000))
      .subscribe((chats) => {
        this.userChatsStream$.next(chats);
        this.userChatsIsLoading = false;
      });
  }

  findChatById(id: number): ChatRoomModel {
    return this.userChatsStream$.value.find((chat) => chat.id === id);
  }

  addNewChatRoom(room: ChatRoomModel) {
    const rooms = this.userChatsStream$.value;
    rooms.push(room);
    this.userChatsStream$.next(rooms);
  }

  ngOnDestroy(): void {
    this.userChatsStream$.complete();
  }
}
