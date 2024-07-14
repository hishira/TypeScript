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
  text = input<string>('There are no data to show');
  isEmpty = input<boolean>(false);
  withRefreshButton = input<boolean>(false);
  refreshEmit = output<void>();

  refreshData() {
    this.refreshEmit.emit();
  }
}
