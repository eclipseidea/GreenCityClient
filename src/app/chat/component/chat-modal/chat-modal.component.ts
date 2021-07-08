import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { chatIcons } from '../../image-pathes/chatIcons';
import { CurrentChatService } from '../../service/current-chat/current-chat.service';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss']
})
export class ChatModalComponent implements OnInit {
  public chatIcons = chatIcons;

  constructor(public dialogRef: MatDialogRef<ChatModalComponent>, private currentChatService: CurrentChatService) {}

  ngOnInit() {}

  closeChatModal() {
    this.currentChatService.setCurrentChat(null);
    this.dialogRef.close();
  }
}
