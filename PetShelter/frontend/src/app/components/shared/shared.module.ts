import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SelectListModalComponent } from './select-list/select-list-modal/select-list-modal.component';
import { SelectListComponent } from './select-list/select-list.component';
import { ModalComponent } from './modal/modal.component';
import { ChipComponent } from './chip/chips.component';
@NgModule({
  imports: [CommonModule, BrowserModule],
  declarations: [
    SelectListComponent,
    SelectListModalComponent,
    ModalComponent,
    ChipComponent,
  ],
  exports: [
    SelectListComponent,
    SelectListModalComponent,
    ModalComponent,
    ChipComponent,
  ],
})
export class SharedModule {}
