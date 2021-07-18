import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatLastMessageDate'
})
export class ChatLastMessageDatePipe implements PipeTransform {
  transform(date: Date | string): string {
    const today = new Date().toLocaleDateString();
    const specifiedDay = new Date(date);
    const sentDate = specifiedDay.toLocaleDateString();
    const sentTime = specifiedDay.toLocaleTimeString();
    return (today === sentDate ? sentTime : sentDate).slice(0, 5);
  }
}
