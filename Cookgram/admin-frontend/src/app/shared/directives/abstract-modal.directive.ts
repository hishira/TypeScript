import { Directive, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../services/modal.service';

@Directive({ providers: [ModalService] })
export class AbstractModalDirective implements OnDestroy {
  activeIndex: number = 0;

  protected max_step: number = -100;
  protected min_step: number = 0;
  protected readonly modalService: ModalService = inject(ModalService);
  protected readonly subscription = new Subscription();

  constructor(max_step: number) {
    this.max_step = max_step;
    if (this.max_step < 0) {
      throw new Error('Step must be greater than 0');
    }
    this.handleNextStepChange();
    this.handleBackStepChange();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private handleNextStepChange(): void {
    this.subscription.add(
      this.modalService.nextStepChange.subscribe((_) =>
        this.calculateNextStepNumber()
      )
    );
  }

  private handleBackStepChange(): void {
    this.subscription.add(
      this.modalService.backStepChange.subscribe((_) =>
        this.calculatePreviousStepNumber()
      )
    );
  }

  private calculateNextStepNumber(): void {
    this.activeIndex =
      this.activeIndex + 1 > this.max_step
        ? this.max_step
        : this.activeIndex + 1;
  }

  private calculatePreviousStepNumber(): void {
    this.activeIndex =
      this.activeIndex - 1 <= this.min_step
        ? this.min_step
        : this.activeIndex - 1;
  }
}
