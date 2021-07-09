import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrentChatService } from '../../service/current-chat/current-chat.service';
import { ChatSubsService } from '../../service/chat-subs/chat-subs.service';
import { CommonChatService } from '../../service/common-chat/common-chat.service';
import { ChatRoomsService } from '../../service/chat-rooms/chat-rooms.service';
import { chatIcons } from '../../image-pathes/chatIcons';
import { ChatRoomModel } from '../../models/ChatRoom.model';

@Component({
  selector: 'app-new-message-window',
  templateUrl: './new-message-window.component.html',
  styleUrls: ['./new-message-window.component.scss'],
  providers: [ChatSubsService]
})
export class NewMessageWindowComponent implements OnInit, OnDestroy {
  public chatIcons = chatIcons;
  public currentChat: ChatRoomModel;

  public chatSearchInput = '';
  public chats: ChatRoomModel[] = [];
  public isSearching = false;

  constructor(
    public currentChatService: CurrentChatService,
    private chatRoomsService: ChatRoomsService,
    private chatSubsService: ChatSubsService,
    private commonChatService: CommonChatService
  ) {}

  ngOnInit() {
    const currentChatSub = this.currentChatService.currentChatStream$.subscribe((currentChat) => {
      this.currentChat = currentChat;
    });

    const chatsSub = this.chatRoomsService.userChatsStream$.subscribe((chats) => {
      this.chats = chats;
    });

    this.chatSubsService.addNewSub(currentChatSub, chatsSub);
  }

  ngOnDestroy() {
    this.chatSubsService.deleteAllSubs();
  }

  newMessageClose() {
    this.currentChatService.setCurrentChat(null);
    this.commonChatService.changeNewMessageWindowStatus(false);
  }

  chatSearch() {
    if (this.chatSearchInput) {
      this.isSearching = true;
      return;
    }
    this.isSearching = false;
  }
}
