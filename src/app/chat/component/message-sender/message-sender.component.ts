import { Component, Input, OnInit } from '@angular/core';
import { chatIcons } from '../../image-pathes/chatIcons';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-message-sender',
  templateUrl: './message-sender.component.html',
  styleUrls: ['./message-sender.component.scss']
})
export class MessageSenderComponent implements OnInit {
  @Input() inModal: boolean;
  public chatIcons = chatIcons;
  messageForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.messageForm = new FormGroup({
      message: new FormControl('', [Validators.required])
    });
  }

  sendMessage() {
    console.log(this.messageForm);
  }
}
