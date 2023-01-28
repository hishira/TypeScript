import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { SponsorFormComponent } from "./sponsor-form.component";

@NgModule({
    declarations: [SponsorFormComponent],
    exports: [SponsorFormComponent],
    imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule],

})
export class SponsorModule{}