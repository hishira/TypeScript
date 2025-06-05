import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ButtonModule],
})
export class EmptyListComponent {
  readonly text = input<string>('There are no data to show');
  readonly isEmpty = input.required<boolean>();
  readonly withRefreshButton = input<boolean>(false);

  refreshEmit = output<void>();

  refreshData(): void {
    this.refreshEmit.emit();
  }
}
