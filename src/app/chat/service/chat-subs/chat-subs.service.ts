import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class ChatSubsService {
  private subs: Subscription[] = [];

  public addNewSub(...sub: Subscription[]) {
    this.subs.push(...sub);
  }

  public deleteAllSubs() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }
}
