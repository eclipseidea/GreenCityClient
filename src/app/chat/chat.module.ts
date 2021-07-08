import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPopupComponent } from './component/chat-popup/chat-popup.component';
import { ChatModalComponent } from './component/chat-modal/chat-modal.component';
import { ChatRoomsComponent } from './component/chat-rooms/chat-rooms.component';
import { NewMessageWindowComponent } from './component/new-message-window/new-message-window.component';
import { NewMessageReferenceDirective } from './directive/new-message-reference/new-message-reference.directive';
import { ChatsSearchPipe } from './pipe/chats-search/chats-search.pipe';
import { ChatLastMsgPipe } from './pipe/chat-last-msg/chat-last-msg.pipe';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedMainModule } from '@shared/shared-main.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ChatPopupComponent,
    ChatModalComponent,
    ChatRoomsComponent,
    NewMessageWindowComponent,
    NewMessageReferenceDirective,
    ChatsSearchPipe,
    ChatLastMsgPipe
  ],
  exports: [ChatPopupComponent],
  imports: [
    CommonModule,
    SharedMainModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  entryComponents: [ChatModalComponent, NewMessageWindowComponent]
})
export class ChatModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
