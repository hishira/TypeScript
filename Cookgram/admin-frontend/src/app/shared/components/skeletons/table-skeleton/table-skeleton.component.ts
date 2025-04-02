import { Component, computed, input, InputSignal } from '@angular/core';
import { BaseComponent } from '../../base-component/base-component';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { SkeletonRowInfo } from './types';

@Component({
  selector: 'app-table-skeleton',
  templateUrl: './table-skeleton.component.html',
  standalone: true,
  imports: [SkeletonModule, TableModule],
})
export class TableSkeletonComponent extends BaseComponent {
  skeletonRows: InputSignal<SkeletonRowInfo[]> = input.required();
  rowsCount = computed(() => this.skeletonRows().length);
  emptyValues = computed(() =>
    Array.from({ length: this.rowsCount() }).fill({})
  );
}
