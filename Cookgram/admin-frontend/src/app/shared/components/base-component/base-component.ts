import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({})
export class BaseComponent implements OnDestroy, OnInit, Base {
  protected readonly subscription: Subscription = new Subscription();

  destroy?(): void;
  initialize?(): void;

  ngOnInit(): void {
    this?.initialize?.();
  }
  
  ngOnDestroy(): void {
    this?.destroy?.();
    this.subscription.unsubscribe();
  }
}
