import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, ButtonModule],
})
export class EmptyListComponent {
  readonly refreshEmit = output<void>();

  readonly text = input<string>('There are no data to show');
  readonly isEmpty = input<boolean>(false);
  readonly withRefreshButton = input<boolean>(false);

  refreshData(): void {
    this.refreshEmit.emit();
  }
}
