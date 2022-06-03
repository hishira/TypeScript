import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SelectListModalComponent } from './select-list/select-list-modal/select-list-modal.component';
import { SelectListComponent } from './select-list/select-list.component';
import { ModalComponent } from './modal/modal.component';
import { ChipComponent } from './chip/chips.component';
import { SelectMultipleListComponent } from './select-multiple-list/select-multiple-list.component';
import { FormsModule } from '@angular/forms';
import { SelectItemComponent } from './select-multiple-list/select-item/select-item.component';
@NgModule({
  declarations: [
    SelectListComponent,
    SelectListModalComponent,
    ModalComponent,
    ChipComponent,
    SelectMultipleListComponent,
    SelectItemComponent
  ],
  exports: [
    SelectListComponent,
    SelectListModalComponent,
    ModalComponent,
    ChipComponent,
    SelectMultipleListComponent,
    SelectItemComponent
  ],
  imports: [CommonModule, BrowserModule, FormsModule],
})
export class SharedModule {}
