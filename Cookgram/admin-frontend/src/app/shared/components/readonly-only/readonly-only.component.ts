import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';

@Component({
  selector: 'app-read-only',
  templateUrl: './readonly-only.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class ReadoOnlyComponent {
  readonly title: InputSignal<string | undefined> = input<string>();
}
