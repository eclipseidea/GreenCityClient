import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ChatRoomsService } from '../../service/chat-rooms/chat-rooms.service';
import { ChatSubsService } from '../../service/chat-subs/chat-subs.service';
import { CurrentChatService } from '../../service/current-chat/current-chat.service';
import { CommonChatService } from '../../service/common-chat/common-chat.service';
import { MatDialog } from '@angular/material';
import { chatIcons } from '../../image-pathes/chatIcons';
import { ChatRoomModel } from '../../models/ChatRoom.model';
import { UsersMock } from '../../usersMock';
import { SocketService } from '../../service/socket/socket.service';

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.scss'],
  providers: [ChatSubsService]
})
export class ChatRoomsComponent implements OnInit, OnDestroy {
  public chatIcons = chatIcons;
  @ViewChild('chatsWrapper', { static: false }) chatsWrapper: ElementRef;
  @Output() msgWindowCreating = new EventEmitter();

  public chats: ChatRoomModel[];
  public chatRoomsSearchInput = '';

  constructor(
    public chatRoomsService: ChatRoomsService,
    private chatSubsService: ChatSubsService,
    public currentChatService: CurrentChatService,
    private commonChatService: CommonChatService,
    public dialog: MatDialog,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    const userChatSub = this.chatRoomsService.userChatsStream$.subscribe((chats) => {
      this.chats = chats;
    });

    const isOpenSub = this.commonChatService.popupIsOpenStream$.subscribe((isOpen) => {
      if (!isOpen) {
        this.chatRoomsSearchInput = '';
        if (this.chatsWrapper) {
          this.chatsWrapper.nativeElement.scrollTop = 0;
        }
      }
    });
    // TODO: remove this test
    // setTimeout(() => {
    //   this.socketService.onRoomReceived({
    //     body: JSON.stringify({
    //       id: 1,
    //       name: UsersMock.user1.firstName + ' ' + UsersMock.user1.lastName,
    //       lastMessage: {
    //         id: 4,
    //         chatId: 1,
    //         date: new Date(),
    //         content: 'Bye',
    //         sender: UsersMock.user1
    //       },
    //       participants: [UsersMock.self, UsersMock.user1],
    //       logo: 'assets/img/chat/avatar-mock.png',
    //       chatType: 'PRIVATE'
    //     } as ChatRoomModel)
    //   });
    // }, 5000);

    this.chatSubsService.addNewSub(userChatSub, isOpenSub);
  }

  ngOnDestroy() {
    this.chatSubsService.deleteAllSubs();
  }

  openNewMsgWindow(chat: ChatRoomModel) {
    this.currentChatService.setCurrentChat(chat);
    this.msgWindowCreating.emit();
  }
}
