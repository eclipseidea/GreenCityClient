import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonChatService } from '../../service/common-chat/common-chat.service';
import { ChatSubsService } from '../../service/chat-subs/chat-subs.service';
import { NewMessageWindowComponent } from '../new-message-window/new-message-window.component';
import { NewMessageReferenceDirective } from '../../directive/new-message-reference/new-message-reference.directive';
import { CurrentChatService } from '../../service/current-chat/current-chat.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';
import { chatIcons } from '../../image-pathes/chatIcons';

@Component({
  selector: 'app-chat-popup',
  templateUrl: './chat-popup.component.html',
  styleUrls: ['./chat-popup.component.scss'],
  providers: [ChatSubsService]
})
export class ChatPopupComponent implements OnInit, OnDestroy {
  @ViewChild(NewMessageReferenceDirective, { static: false }) refDir: NewMessageReferenceDirective;
  private dialogConfig = {
    hasBackdrop: true,
    closeOnNavigation: true,
    disableClose: true,
    panelClass: 'custom-dialog-container'
  };

  public chatIcons = chatIcons;
  public isOpen: boolean;
  private modalWindow: MatDialogRef<ChatModalComponent>;

  constructor(
    private componentFactory: ComponentFactoryResolver,
    public commonChatService: CommonChatService,
    private chatSubsService: ChatSubsService,
    private currentChatService: CurrentChatService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const isOpenSub = this.commonChatService.popupIsOpenStream$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });

    const newMessageIsOpenSub = this.commonChatService.newMessageIsOpenStream$.subscribe((isOpen) => {
      if (!isOpen && this.refDir) {
        this.refDir.containerRef.clear();
      }
    });

    this.chatSubsService.addNewSub(isOpenSub, newMessageIsOpenSub);
  }

  ngOnDestroy() {
    this.chatSubsService.deleteAllSubs();
  }

  openModal() {
    this.dialog.closeAll();
    this.modalWindow = this.dialog.open(ChatModalComponent, this.dialogConfig);
  }

  openOptions() {
    // TODO: define options logic
  }

  openNewMessageWindow(createEmpty: boolean) {
    this.commonChatService.changeNewMessageWindowStatus(true);
    if (createEmpty) {
      this.currentChatService.currentChatStream$.next(null);
    }
    const newMsgWindow = this.componentFactory.resolveComponentFactory(NewMessageWindowComponent);
    this.refDir.containerRef.clear();
    this.refDir.containerRef.createComponent(newMsgWindow);
  }
}
