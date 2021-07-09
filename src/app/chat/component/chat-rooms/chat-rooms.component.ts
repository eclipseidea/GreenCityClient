import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ChatRoomsService } from '../../service/chat-rooms/chat-rooms.service';
import { ChatSubsService } from '../../service/chat-subs/chat-subs.service';
import { CurrentChatService } from '../../service/current-chat/current-chat.service';
import { CommonChatService } from '../../service/common-chat/common-chat.service';
import { MatDialog } from '@angular/material';
import { chatIcons } from '../../image-pathes/chatIcons';
import { ChatRoomModel } from '../../models/ChatRoom.model';

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.scss'],
  providers: [ChatSubsService]
})
export class ChatRoomsComponent implements OnInit, OnDestroy {
  public chatIcons = chatIcons;
  @Output() msgWindowCreating = new EventEmitter();

  public chats: ChatRoomModel[];
  public chatRoomsSearchInput = '';

  constructor(
    private chatRoomsService: ChatRoomsService,
    private chatSubsService: ChatSubsService,
    public currentChatService: CurrentChatService,
    private commonChatService: CommonChatService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.chatRoomsService.getAllUsersChat();
    const userChatSub = this.chatRoomsService.userChatsStream$.subscribe((chats) => {
      this.chats = chats;
    });

    const isOpenSub = this.commonChatService.popupIsOpenStream$.subscribe((isOpen) => {
      if (!isOpen) {
        this.chatRoomsSearchInput = '';
      }
    });

    this.chatSubsService.addNewSub(userChatSub, isOpenSub);
  }

  ngOnDestroy() {
    this.chatSubsService.deleteAllSubs();
  }

  messageDateTreatment(date: Date): string {
    const today = new Date().toLocaleDateString();
    const sentDate = date.toLocaleDateString();
    const sentTime = date.toLocaleTimeString();
    return (today === sentDate ? sentTime : sentDate).slice(0, 5);
  }

  openNewMsgWindow(chat: ChatRoomModel) {
    this.currentChatService.setCurrentChat(chat);
    this.msgWindowCreating.emit();
  }
}
