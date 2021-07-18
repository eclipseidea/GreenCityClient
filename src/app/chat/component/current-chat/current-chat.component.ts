import { AfterViewChecked, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CurrentChatService } from '../../service/current-chat/current-chat.service';
import { ChatSubsService } from '../../service/chat-subs/chat-subs.service';
import { ChatRoomModel } from '../../models/ChatRoom.model';
import { chatIcons } from '../../image-pathes/chatIcons';
import { ChatMessagesService } from '../../service/chat-messages/chat-messages.service';
import { SocketService } from '../../service/socket/socket.service';
import { UsersMock } from '../../usersMock';

@Component({
  selector: 'app-current-chat',
  templateUrl: './current-chat.component.html',
  styleUrls: ['./current-chat.component.scss'],
  providers: [ChatSubsService]
})
export class CurrentChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChildren('chatElement') chatElement: QueryList<any>;
  public currentChat: ChatRoomModel;
  public chatIcons = chatIcons;

  constructor(
    public currentChatService: CurrentChatService,
    private chatSubsService: ChatSubsService,
    public chatMessagesService: ChatMessagesService,
    public socketService: SocketService
  ) {}

  ngOnInit() {
    const currentChatSub = this.currentChatService.currentChatStream$.subscribe((chat) => {
      this.currentChat = chat;
    });

    const currentChatMessagesSub = this.chatMessagesService.currentMessagesStream$.subscribe((messages) => {
      if (this.currentChat) {
        this.currentChat.messages = messages;
      }
    });

    // TODO: remove test
    // setTimeout(() => {
    //   this.socketService.onMessageReceived({
    //     body: JSON.stringify({
    //       id: 1,
    //       chatId: 1,
    //       date: new Date(),
    //       content: 'Hello, vitaliy',
    //       sender: UsersMock.self
    //     })
    //   });
    // }, 10000);

    this.chatSubsService.addNewSub(currentChatSub, currentChatMessagesSub);
  }

  ngAfterViewChecked() {
    if (this.currentChat && !this.chatMessagesService.messagesOnLoad) {
      this.chatElement.first.nativeElement.scrollTop = this.chatElement.first.nativeElement.scrollHeight;
    }
  }

  ngOnDestroy() {
    this.chatSubsService.deleteAllSubs();
  }
}
