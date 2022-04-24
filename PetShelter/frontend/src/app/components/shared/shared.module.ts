import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SelectListModalComponent } from './select-list/select-list-modal/select-list-modal.component';
import { SelectListComponent } from './select-list/select-list.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [CommonModule, BrowserModule],
  declarations: [SelectListComponent, SelectListModalComponent, ModalComponent],
  exports: [SelectListComponent, SelectListModalComponent, ModalComponent],
})
export class SharedModule {}
