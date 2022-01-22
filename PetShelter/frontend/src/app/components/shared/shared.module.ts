import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {SelectListComponent} from "./select-list/select-list.component";

@NgModule({
    imports: [CommonModule],
    declarations: [SelectListComponent],
    exports: [SelectListComponent]
})
export class SharedModule{}