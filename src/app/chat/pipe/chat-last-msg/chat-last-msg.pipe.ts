import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatLastMsg'
})
export class ChatLastMsgPipe implements PipeTransform {
  transform(lastMessage: string): any {
    return lastMessage.slice(0, 32) + (lastMessage.length > 32 ? '...' : '');
  }
}
