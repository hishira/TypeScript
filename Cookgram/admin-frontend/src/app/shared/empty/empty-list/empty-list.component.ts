import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf],
})
export class EmptyListComponent {
  text = input<string>('There are no data to show');
  isEmpty = input<boolean>(false);
}
