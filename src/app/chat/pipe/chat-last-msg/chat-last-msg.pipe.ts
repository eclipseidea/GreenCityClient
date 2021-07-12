import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatLastMsg'
})
export class ChatLastMsgPipe implements PipeTransform {
  transform(lastMessage: string): any {
    const result: string[] = [];
    for (const char of lastMessage) {
      if (result.length === 30) {
        break;
      }
      if (char.toUpperCase() === char) {
        result.push('');
      }
      result.push(char);
    }
    return `${result.join('')}...`;
  }
}
