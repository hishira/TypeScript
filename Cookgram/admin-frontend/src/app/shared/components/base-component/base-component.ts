import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({})
export class BaseComponent implements OnDestroy {
  protected readonly subscription: Subscription = new Subscription();

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
