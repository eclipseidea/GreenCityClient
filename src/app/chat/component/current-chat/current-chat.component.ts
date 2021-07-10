import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CurrentChatService } from '../../service/current-chat/current-chat.service';
import { ChatSubsService } from '../../service/chat-subs/chat-subs.service';
import { ChatRoomModel } from '../../models/ChatRoom.model';
import { chatIcons } from '../../image-pathes/chatIcons';
import { ChatMessagesService } from '../../service/chat-messages/chat-messages.service';
import { ChatMessageModel } from '../../models/ChatMessage.model';

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
  public allChatMessages: ChatMessageModel[] = [];

  constructor(
    public currentChatService: CurrentChatService,
    private chatSubsService: ChatSubsService,
    public chatMessagesService: ChatMessagesService
  ) {}

  ngOnInit() {
    const currentChatSub = this.currentChatService.currentChatStream$.subscribe((chat) => {
      this.currentChat = chat;
    });

    const currentChatMessagesSub = this.chatMessagesService.currentMessagesStream$.subscribe((messages) => {
      this.allChatMessages = messages;
    });

    this.chatSubsService.addNewSub(currentChatSub, currentChatMessagesSub);
  }

  ngAfterViewChecked() {
    if (this.currentChat) {
      this.chatElement.first.nativeElement.scrollTop = this.chatElement.first.nativeElement.scrollHeight;
    }
  }

  ngOnDestroy() {
    this.chatSubsService.deleteAllSubs();
  }
}
