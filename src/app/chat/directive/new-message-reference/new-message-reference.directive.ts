import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDirReference]'
})
export class NewMessageReferenceDirective {
  constructor(public containerRef: ViewContainerRef) {}
}
