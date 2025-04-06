import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ButtonModule],
})
export class EmptyListComponent implements OnInit {
   text = input<string>('There are no data to show');
   isEmpty = input.required<boolean>();
   withRefreshButton = input<boolean>(false);

  refreshEmit = output<void>();

  refreshData(): void {
    this.refreshEmit.emit();
  }

  ngOnInit(): void {
      console.log(this.isEmpty())
  }
}
