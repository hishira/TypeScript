import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({})
export class BaseComponent implements OnDestroy, Base {
  protected readonly subscription: Subscription = new Subscription();
  
  destroy?(): void;

  ngOnDestroy(): void {
    this?.destroy?.();
    this.subscription.unsubscribe();
  }
}
