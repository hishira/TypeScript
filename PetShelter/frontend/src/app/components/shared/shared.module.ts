import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectListComponent } from './select-list/select-list.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SelectListComponent, ModalComponent],
  exports: [SelectListComponent, ModalComponent],
})
export class SharedModule {}
