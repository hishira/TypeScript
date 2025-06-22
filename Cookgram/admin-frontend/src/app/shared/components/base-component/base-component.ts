import {
  Directive,
  inject,
  Injector,
  OnDestroy,
  OnInit,
  runInInjectionContext,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Base } from './base';

@Directive({})
export class BaseComponent implements OnDestroy, OnInit, Base {
  protected readonly subscription: Subscription = new Subscription();
  protected injector: Injector = inject(Injector);

  destroy?(): void;

  initialize?(): void;

  ngOnInit(): void {
    runInInjectionContext(this.injector, () => {
      this?.initialize?.();
    });
  }

  ngOnDestroy(): void {
    this?.destroy?.();
    this.subscription.unsubscribe();
  }
}
