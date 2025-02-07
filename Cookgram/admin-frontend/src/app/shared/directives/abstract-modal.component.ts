import { Directive, OnDestroy, inject } from '@angular/core';
import { BaseComponent } from '../components/base-component/base-component';
import { ModalService } from '../services/modal.service';

@Directive({ providers: [ModalService] })
export class AbstractModalComponent extends BaseComponent {
  activeIndex: number = 0;

  protected readonly max_step: number = -100;
  protected readonly min_step: number = 0;
  protected readonly modalService: ModalService = inject(ModalService);
  protected readonly MAXIMUX_STEP = 1;
  constructor(max_step: number) {
    super();
    this.max_step = max_step;
    if (this.max_step < this.min_step) {
      throw new Error('Step must be greater than 0');
    }
    this.handleNextStepChange();
    this.handleBackStepChange();
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
