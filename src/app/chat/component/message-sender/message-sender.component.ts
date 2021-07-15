import { Component, Input, OnInit } from '@angular/core';
import { chatIcons } from '../../image-pathes/chatIcons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { CommonChatService } from '../../service/common-chat/common-chat.service';

@Component({
  selector: 'app-message-sender',
  templateUrl: './message-sender.component.html',
  styleUrls: ['./message-sender.component.scss']
})
export class MessageSenderComponent implements OnInit {
  @Input() inModal: boolean;
  public chatIcons = chatIcons;
  public messageForm: FormGroup;

  public uploadedFiles: any[] = [];
  private maxFileSize = 16000;
  public filesStorageCapacity = 10;
  public messageInput = '';

  constructor(private dialog: MatDialog, private commonChatService: CommonChatService) {}

  ngOnInit() {
    this.messageForm = new FormGroup({
      message: new FormControl('', [Validators.required]),
      file: new FormControl()
    });
  }

  addFile($event) {
    // TODO: release file message logic
  }
}
