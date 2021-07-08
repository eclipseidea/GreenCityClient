import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonChatService {
  public popupIsOpenStream$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private popupIsOpen = false;

  public newMessageIsOpenStream$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private newMessageIsOpen = false;

  constructor() {}

  changeNewMessageWindowStatus(isOpen: boolean) {
    this.newMessageIsOpen = isOpen;
    this.newMessageIsOpenStream$.next(this.newMessageIsOpen);
  }

  changePopupOpenStatus() {
    this.popupIsOpen = !this.popupIsOpen;
    this.popupIsOpenStream$.next(this.popupIsOpen);
  }
}
