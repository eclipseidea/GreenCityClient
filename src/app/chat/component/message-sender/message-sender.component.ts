import { Component, Input, OnInit } from '@angular/core';
import { chatIcons } from '../../image-pathes/chatIcons';

@Component({
  selector: 'app-message-sender',
  templateUrl: './message-sender.component.html',
  styleUrls: ['./message-sender.component.scss']
})
export class MessageSenderComponent implements OnInit {
  @Input() inModal: boolean;
  public chatIcons = chatIcons;
  public messageInput = '';

  constructor() {}

  ngOnInit() {}
}
