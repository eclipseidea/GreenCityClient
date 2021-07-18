import { Pipe, PipeTransform } from '@angular/core';
import { ChatMessageModel } from '../../models/ChatMessage.model';
import { MessagesSortByDayModel } from '../../models/MessagesSortByDay.model';

@Pipe({
  name: 'messagesSortByDay',
  pure: false
})
export class MessagesSortByDayPipe implements PipeTransform {
  transform(messages: ChatMessageModel[]): MessagesSortByDayModel[] {
    const dateMap: object = {};

    messages.forEach((msg) => {
      const mapDateKey = new Date(msg.date).toLocaleDateString();
      if (!dateMap[mapDateKey]) {
        dateMap[mapDateKey] = [];
      }
      dateMap[mapDateKey].push(msg);
    });

    return Object.entries(dateMap).map<MessagesSortByDayModel>(([date, dayMessages]) => {
      return {
        date,
        messages: dayMessages as ChatMessageModel[]
      };
    });
  }
}
