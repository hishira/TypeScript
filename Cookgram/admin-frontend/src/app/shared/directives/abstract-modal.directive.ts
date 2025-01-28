import { Directive, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../services/modal.service';

@Directive({ providers: [ModalService] })
export class AbstractModalDirective implements OnDestroy {
  activeIndex: number = 0;

  protected readonly max_step: number = -100;
  protected readonly min_step: number = 0;
  protected readonly modalService: ModalService = inject(ModalService);
  protected readonly subscription = new Subscription();
  protected readonly MAXIMUX_STEP = 1;
  constructor(max_step: number) {
    this.max_step = max_step;
    if (this.max_step < this.min_step) {
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
      this.activeIndex + this.MAXIMUX_STEP > this.max_step
        ? this.max_step
        : this.activeIndex + this.MAXIMUX_STEP;
  }

  private calculatePreviousStepNumber(): void {
    this.activeIndex =
      this.activeIndex - this.MAXIMUX_STEP <= this.min_step
        ? this.min_step
        : this.activeIndex - this.MAXIMUX_STEP;
  }
}
