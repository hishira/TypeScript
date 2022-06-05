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
import { SelectListItemComponent } from './select-list/select-list-item/select-list-item.component';
import { SelectItemDirective } from './directives/select-item.directive';
@NgModule({
  declarations: [
    SelectListComponent,
    SelectListModalComponent,
    ModalComponent,
    ChipComponent,
    SelectMultipleListComponent,
    SelectItemComponent,
    SelectListItemComponent,
    SelectItemDirective
  ],
  exports: [
    SelectListComponent,
    SelectListModalComponent,
    ModalComponent,
    ChipComponent,
    SelectMultipleListComponent,
    SelectItemComponent,
    SelectListItemComponent,
    SelectItemDirective
  ],
  imports: [CommonModule, BrowserModule, FormsModule],
})
export class SharedModule {}
