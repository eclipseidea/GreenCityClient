import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatRoomModel } from '../../models/ChatRoom.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentChatService {
  public currentChatStream$: BehaviorSubject<ChatRoomModel> = new BehaviorSubject<ChatRoomModel>(null);

  constructor() {}

  setCurrentChat(chat: ChatRoomModel) {
    this.currentChatStream$.next(chat);
  }
}
