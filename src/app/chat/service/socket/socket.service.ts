import { Injectable, OnDestroy } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { CurrentChatService } from '../current-chat/current-chat.service';
import { UserService } from '@global-service/user/user.service';
import { webSocketLink } from '../../links';
import { ChatRoomsService } from '../chat-rooms/chat-rooms.service';
import { ChatRoomModel } from '../../models/ChatRoom.model';
import { ChatMessageModel } from '../../models/ChatMessage.model';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ChatMessagesService } from '../chat-messages/chat-messages.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {
  private socket: WebSocket;
  private stompClient: CompatClient;

  private destroyed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private currentChatService: CurrentChatService,
    private userService: UserService,
    private chatRoomsService: ChatRoomsService,
    private chatMessageService: ChatMessagesService
  ) {}

  public connect(): void {
    this.socket = new SockJS(webSocketLink);
    this.stompClient = Stomp.over(() => this.socket);
    this.stompClient.connect(
      {},
      () => this.onConnected(),
      (error) => this.onError(error)
    );
  }

  public onConnected() {
    this.chatRoomsService.userChatsStream$.pipe(takeUntil(this.destroyed$)).subscribe((chatRooms) => {
      chatRooms.forEach((chatRoom) => {
        this.stompClient.subscribe(`/room/${chatRoom.id}/queue/messages`, (receivedMessage) => this.onMessageReceived(receivedMessage));
      });
    });

    this.stompClient.subscribe(`/rooms/user/${this.userService.userId}`, (receivedRoom) => this.onRoomReceived(receivedRoom));
  }

  private onError(error: Error) {
    console.log(error);
  }

  private onMessageReceived(receivedMessage): void {
    const newMessage: ChatMessageModel = JSON.parse(receivedMessage.body);
    const chatReceiver = this.chatRoomsService.findChatById(newMessage.chatId);
    chatReceiver.lastMessage = newMessage;
    if (this.currentChatService.currentChatStream$.value === chatReceiver) {
      this.chatMessageService.addMessage(newMessage);
      return;
    }
    if (chatReceiver.messages) {
      chatReceiver.messages.push(newMessage);
    }
    // TODO: implement notification on not current chat message income
  }

  private onRoomReceived(receivedRoom) {
    const newChatRoom: ChatRoomModel = JSON.parse(receivedRoom.body);
    this.chatRoomsService.addNewChatRoom(newChatRoom);
  }

  public createRoom(newChatRoom: ChatRoomModel): void {
    this.stompClient.subscribe(`/room/${newChatRoom.id}/queue/messages`, this.onMessageReceived);
    this.chatRoomsService.addNewChatRoom(newChatRoom);
  }

  public sendMessage(message: ChatMessageModel): void {
    this.stompClient.send('/app/chat', {}, JSON.stringify(message));
  }

  public _closeWebSocket(): void {
    this.socket.close();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
