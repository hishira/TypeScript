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
  private readonly infinitiLoopBorder: number = 1000;
  private deep: number = 0;
  
  check(ref: HTMLSpanElement): boolean {
    // Now only for text
    if(this.deep > this.infinitiLoopBorder) {
      console.warn('Infinite loop detected');
      return false;
    }
    if(ref.hasChildNodes()){
      this.deep++;
      return this.check(ref.firstChild as HTMLSpanElement);
    }
    return ref.textContent?.trim()?.length === 0;
  }
}
