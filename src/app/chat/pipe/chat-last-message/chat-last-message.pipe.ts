import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatLastMessage'
})
export class ChatLastMessagePipe implements PipeTransform {
  transform(lastMessage: string): any {
    const result: string[] = [];
    for (const char of lastMessage) {
      if (result.length === 20) {
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
